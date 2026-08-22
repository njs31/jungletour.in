import { SITE_IMAGE_DEFAULTS } from "@/lib/images/catalog";

interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({
  backgroundImage = SITE_IMAGE_DEFAULTS.hero,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-end overflow-hidden scroll-mt-16 md:min-h-screen md:items-center bg-navy"
    >
      <img
        src={backgroundImage}
        alt="Western Ghats trail background"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,124,44,0.25),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-cta sm:text-sm">
          Jungle Tours & Treks · Bangalore
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Trails that feel wild.
          <span className="block text-cta">Trips that feel easy.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Guided treks, weekend getaways, and sunrise climbs from Bangalore —
          planned end to end so you can just show up and walk.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#packages"
            className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover sm:text-base shadow-lg"
          >
            Explore Treks
          </a>
          <a
            href="#tours"
            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-base shadow-lg"
          >
            Explore Tours
          </a>
        </div>
      </div>
    </section>
  );
}
