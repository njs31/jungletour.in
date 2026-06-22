import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "src/data/treks/scraped");

const TREK_SOURCES = {
  kudremukh: "kudremukh-trek",
  netravati: "nethravathi-trek",
  "kumara-parvatha": "kumara-parvatha-trek",
  kodachadri: "kodachadri-trek",
  "gokarna-beach": "gokarna-beach-trek",
  tadiandamol: "tadiandamol-trek",
  "bandaje-falls": "bandaje-falls-trek",
  kurinjal: "kurinjal-trek",
  skandagiri: "skandagiri-trek",
  "uttari-betta": "uttari-betta-trek",
  "nishani-motte": "nishani-motte-trek",
  "narasimha-parvatha": "narasimha-parvatha-trek",
};

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractMeta(html) {
  const title =
    html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ??
    html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ??
    "";
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1] ??
    "";
  const ogImages = [
    ...html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi),
    ...html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/gi),
  ].map((m) => m[1]);
  return { title, description, ogImages };
}

function sectionBetween(text, startLabel, endLabels) {
  const start = text.indexOf(startLabel);
  if (start === -1) return "";
  let end = text.length;
  for (const label of endLabels) {
    const idx = text.indexOf(label, start + startLabel.length);
    if (idx !== -1 && idx < end) end = idx;
  }
  return text.slice(start + startLabel.length, end).trim();
}

function extractBullets(block) {
  return block
    .split("\n")
    .map((l) => l.replace(/^[\s*•\-]+/, "").trim())
    .filter((l) => l.length > 10 && !l.startsWith("##"));
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function parseFaqs(faqBlock) {
  const faqs = [];
  const chunks = faqBlock.split(/\n(?=0\d\s*\n)/);
  for (const chunk of chunks) {
    const lines = chunk
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && l !== "questions" && !/^Frequently Asked/i.test(l));
    if (lines.length < 2) continue;
    let start = /^0\d$/.test(lines[0]) ? 1 : 0;
    const question = lines[start];
    const answer = lines.slice(start + 1).join(" ").trim();
    if (question && answer.length > 20) {
      faqs.push({ question: decodeEntities(question), answer: decodeEntities(answer) });
    }
  }
  if (faqs.length === 0) {
    const matches = [
      ...faqBlock.matchAll(/###\s+(.+?)\n+([\s\S]*?)(?=\n###|\n0\d\n|$)/g),
    ];
    for (const m of matches) {
      faqs.push({
        question: decodeEntities(m[1].trim()),
        answer: decodeEntities(m[2].replace(/\n+/g, " ").trim()),
      });
    }
  }
  return faqs;
}

function parseItinerary(itineraryBlock) {
  const itinerary = [];
  const normalized = itineraryBlock.replace(/\s+/g, " ").trim();
  const start = normalized.search(
    /Day\s*0\s*(Departure|Overnight|Pickup|Travel)/i
  );
  const body = start >= 0 ? normalized.slice(start) : normalized;

  const regex =
    /Day\s*(\d+)\s*((?:Departure|Kudremukh|Sightseeing|Trek|Return|Netravati|Gokarna|Bandaje|Skandagiri|Uttari|Nishani|Narasimha|Kumara|Kodachadri|Tadiandamol|Kurinjal|Night|Sunrise|Beach|Falls)[^]*?)(?=Day\s*\d+\s*(?:Departure|Kudremukh|Trek|Sightseeing|Return|Netravati|Gokarna|Bandaje|Skandagiri|Uttari|Nishani|Narasimha|Kumara|Kodachadri|Tadiandamol|Kurinjal|Night|Sunrise|Beach|Falls)|When to Go|$)/gi;

  const byDay = new Map();
  for (const m of body.matchAll(regex)) {
    const chunk = decodeEntities(m[2].trim());
    const splitAt = chunk.search(
      /(?<=[a-z])(?=[A-Z][a-z]{3,})|(?<=\.)\s+(?=[A-Z][a-z])/
    );
    const title =
      splitAt > 20 && splitAt < 160
        ? chunk.slice(0, splitAt).trim()
        : chunk.slice(0, Math.min(120, chunk.length)).trim();
    const description = chunk.slice(title.length).trim() || chunk;
    const day = `Day ${m[1]}`;
    const entry = { day, title, description };
    const existing = byDay.get(day);
    if (!existing || description.length > existing.description.length) {
      byDay.set(day, entry);
    }
  }

  return [...byDay.values()].sort(
    (a, b) =>
      Number(a.day.replace(/\D/g, "")) - Number(b.day.replace(/\D/g, ""))
  );
}

function cleanHighlights(items) {
  return items
    .map((item) => decodeEntities(item))
    .filter(
      (item) =>
        item.length > 20 &&
        !/highlights$/i.test(item) &&
        !item.startsWith("–") &&
        !item.endsWith("–")
    )
    .map((item) => item.replace(/\s*–\s*/g, " — "))
    .slice(0, 8);
}

function extractField(block, label) {
  const re = new RegExp(`${label}\\s*\\n+([^\\n]+)`, "i");
  return block.match(re)?.[1]?.trim() ?? "";
}

function parseTrekPage(id, html) {
  const text = stripHtml(html);
  const meta = extractMeta(html);

  const quickFactsBlock = sectionBetween(text, "Trek at a Glance", [
    "Trip Highlights",
    "## Trip Highlights",
  ]);
  const highlightsBlock = sectionBetween(text, "Trip Highlights", [
    "Overview",
    "## Kudremukh",
    "## ",
  ]);
  const overviewBlock = sectionBetween(text, "Overview", [
    "Day by Day",
    "Itinerary",
    "## Itinerary",
  ]);
  let itineraryBlock = sectionBetween(text, "Day by Day", [
    "When to Go",
    "Best Time to Visit",
    "## Best Time",
  ]);
  if (!itineraryBlock || itineraryBlock.length < 200) {
    itineraryBlock = sectionBetween(text, "The following itinerary", [
      "When to Go",
      "Best Time to Visit",
    ]);
  }
  const bestTimeBlock = sectionBetween(text, "Best Time to Visit", [
    "Trail Guide",
    "Trek Route",
    "## Trek Route",
  ]);
  const routeBlock = sectionBetween(text, "Trek Route Breakdown", [
    "What's Covered",
    "Inclusions",
    "## Inclusions",
  ]);
  const inclusionsBlock = sectionBetween(text, "What's Included", [
    "What's Excluded",
    "Live Availability",
  ]);
  const exclusionsBlock = sectionBetween(text, "What's Excluded", [
    "Live Availability",
    "Upcoming Departures",
    "Trekker Reviews",
  ]);
  const departuresBlock = sectionBetween(text, "Upcoming Departures", [
    "Trekker Reviews",
    "What Trekkers Say",
  ]);
  const expectBlock = sectionBetween(text, "What to Expect", ["Pack List", "Things to Carry"]);
  const packBlock = sectionBetween(text, "Things to Carry", [
    "What NOT to carry",
    "Starting from",
    "FAQ",
  ]);
  const packAvoidBlock = sectionBetween(text, "What NOT to carry", [
    "Starting from",
    "FAQ",
    "Frequently Asked",
  ]);
  const faqBlock = sectionBetween(text, "Frequently Asked Questions", [
    "Cancellation",
    "Transparent cancellation",
  ]);
  const policyBlock = sectionBetween(text, "Transparent cancellation policy", [
    "Similar Treks",
    "More Treks",
  ]);
  const reviewsBlock = sectionBetween(text, "What Trekkers Say", [
    "What to Expect",
    "Experience",
  ]);

  const priceMatch =
    text.match(/₹([\d,]+)\s*\n+₹([\d,]+)\/ person/) ??
    text.match(/₹([\d,]+)\/ person/);
  const originalPrice = priceMatch?.[2]
    ? `₹${priceMatch[1]}`
    : priceMatch?.[1]
      ? undefined
      : undefined;
  const price = priceMatch?.[2]
    ? `₹${priceMatch[2]}`
    : priceMatch?.[1]
      ? `₹${priceMatch[1]}`
      : "₹3,999";

  const highlights = cleanHighlights(extractBullets(highlightsBlock));
  const inclusions = extractBullets(inclusionsBlock).slice(0, 12);
  const exclusions = extractBullets(exclusionsBlock)
    .filter((item) => !/what to expect|backpackers united team|permits/i.test(item))
    .slice(0, 10);

  const faqs = parseFaqs(faqBlock).slice(0, 15);

  const itinerary = parseItinerary(itineraryBlock);

  const routeSegments = [];
  const routeMatches = [...routeBlock.matchAll(/###\s+(.+?)\n+([\d.]+\s*Kms?[^\n]*)\n+([\s\S]*?)(?=###|$)/gi)];
  for (const m of routeMatches.slice(0, 5)) {
    const parts = m[2].trim().split(/\s+/);
    routeSegments.push({
      title: m[1].trim(),
      distance: parts.slice(0, 2).join(" "),
      duration: m[2].replace(/^[\d.]+\s*Kms?\s*/i, "").trim() || "—",
      description: m[3].replace(/\n+/g, " ").trim(),
    });
  }

  const departures = [];
  const depMatches = [...departuresBlock.matchAll(/(Fri, [^\n]+)\n+([\d Days/]+\s*\/\s*[\d Nights]+)\n+(\w+)\n+₹([\d,]+) \/ person/g)];
  for (const m of depMatches.slice(0, 6)) {
    departures.push({
      date: m[1],
      status: m[3],
      price: `₹${m[4]} / person`,
    });
  }

  const seasons = [];
  const seasonMatches = [...bestTimeBlock.matchAll(/###\s+(.+?)\n+([\s\S]*?)(?=###|August and|$)/g)];
  for (const m of seasonMatches.slice(0, 3)) {
    const lines = m[2].trim().split("\n").filter(Boolean);
    seasons.push({
      period: m[1].trim(),
      label: lines[0] ?? m[1].trim(),
      description: lines.slice(1).join(" ").trim() || lines[0] || "",
      variant: m[1].toLowerCase().includes("jan") ? "off" : m[1].toLowerCase().includes("oct") ? "scenic" : "best",
    });
  }

  const packList = [];
  const packMatches = [...packBlock.matchAll(/\*\*(.+?)\*\*\s+([\s\S]*?)(?=\*\*|What NOT|$)/g)];
  for (const m of packMatches.slice(0, 8)) {
    packList.push({
      title: m[1].trim(),
      description: m[2].replace(/\n+/g, " ").trim(),
    });
  }

  const packListAvoid = extractBullets(packAvoidBlock).slice(0, 8);

  const reviews = [];
  const reviewMatches = [...reviewsBlock.matchAll(/"?\n+([A-Z]{1,3})\n+([^\n]+)\n+(\d{2} [A-Za-z]+ \d{4})\n+([\d.]+) \/ 5\n+([\s\S]*?)(?=\nRead more|\n"|\nShowing)/g)];
  for (const m of reviewMatches.slice(0, 2)) {
    reviews.push({
      id: `${id}-${m[2].toLowerCase().replace(/\s+/g, "-")}`,
      initials: m[1],
      name: m[2].trim(),
      date: m[3],
      rating: parseFloat(m[4]),
      quote: m[5].replace(/\n+/g, " ").trim().slice(0, 500),
    });
  }

  const overviewIntro =
    overviewBlock
      .split("\n")
      .find((l) => l.length > 80 && !l.startsWith("#") && !l.startsWith("###")) ?? "";

  const cancellationTable = [];
  const tableMatches = [...policyBlock.matchAll(/\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|/g)];
  for (const m of tableMatches) {
    if (m[1].includes("Days before") || m[1].includes("---")) continue;
    cancellationTable.push({
      daysBefore: m[1].trim(),
      charge: m[2].trim(),
      refund: m[3].trim(),
    });
  }

  const cancellationNotes = extractBullets(
    sectionBetween(policyBlock, "Good to know", ["Days before", "|"])
  ).slice(0, 5);

  const images = [...new Set(meta.ogImages)].slice(0, 4).map((src, i) => ({
    src,
    alt: `${meta.title} image ${i + 1}`,
  }));

  return {
    id,
    slug: `${id}-trek`,
    title: decodeEntities(meta.title.replace(/\s*\|\s*Backpackers United.*$/i, "").trim()),
    metaDescription: decodeEntities(meta.description),
    duration: extractField(quickFactsBlock, "Duration"),
    altitude: extractField(quickFactsBlock, "Max Altitude"),
    distance: extractField(quickFactsBlock, "Distance"),
    difficulty: extractField(quickFactsBlock, "Difficulty"),
    pickupDrop: extractField(quickFactsBlock, "Pickup → Drop") || "Bangalore → Bangalore",
    category: extractField(quickFactsBlock, "Category") || "Western Ghats Trek",
    price,
    originalPrice,
    discountLabel: originalPrice ? "20% OFF" : undefined,
    rating: 5.0,
    reviewCount: parseInt(text.match(/(\d+)\s+verified reviews/)?.[1] ?? "10", 10),
    images,
    highlights,
    overview: {
      intro: overviewIntro,
      sections: [],
    },
    itinerary,
    seasons,
    seasonNote: bestTimeBlock.split("\n").filter((l) => l.length > 60).pop() ?? "",
    routeSegments,
    inclusions,
    exclusions,
    departures,
    whatToExpect: extractBullets(expectBlock).slice(0, 4),
    accommodations:
      expectBlock.match(/Accommodations[\s\S]*?(?=###|Backpackers|Jungle|$)/i)?.[0]?.replace(/Accommodations/i, "").trim() ??
      "Comfortable homestay accommodation on sharing basis.",
    teamNote:
      "Our experienced trek leaders and local guides accompany you throughout the trek to ensure safety and a smooth experience.",
    packList,
    packListAvoid,
    faqs: faqs.slice(0, 12),
    cancellationNotes:
      cancellationNotes.length > 0
        ? cancellationNotes
        : [
            "Minimum 8 trekkers required for group departures.",
            "5% GST + 3% booking fee is non-refundable on all bookings.",
          ],
    cancellationTable:
      cancellationTable.length > 0
        ? cancellationTable
        : [
            { daysBefore: "15–30 days", charge: "25%", refund: "75% refunded" },
            { daysBefore: "7–15 days", charge: "50%", refund: "50% refunded" },
            { daysBefore: "3–7 days", charge: "75%", refund: "25% refunded" },
            { daysBefore: "0–3 days", charge: "100%", refund: "No refund" },
          ],
    reviews,
    totalReviews: parseInt(text.match(/(\d+)\s+reviews/)?.[1] ?? "10", 10),
    scrapedTextLength: text.length,
  };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const results = {};

  for (const [id, sourceSlug] of Object.entries(TREK_SOURCES)) {
    const url = `https://backpackersunited.in/trek/${sourceSlug}`;
    process.stdout.write(`Fetching ${id}... `);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`FAILED ${res.status}`);
      continue;
    }
    const html = await res.text();
    const parsed = parseTrekPage(id, html);
    fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(parsed, null, 2));
    results[id] = { ok: true, highlights: parsed.highlights.length, faqs: parsed.faqs.length };
    console.log(`ok (${parsed.highlights.length} highlights, ${parsed.faqs.length} faqs)`);
  }

  fs.writeFileSync(path.join(outDir, "_summary.json"), JSON.stringify(results, null, 2));
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
