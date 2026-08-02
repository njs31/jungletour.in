const stats = [
  { value: "5000+", label: "Happy Travelers" },
  { value: "4.8★", label: "Google Rating" },
  { value: "50+", label: "Treks & Getaways" },
  { value: "Since 2023", label: "Creating Memories" },
];

export default function Stats() {
  return (
    <section className="border-y border-brand-border bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="font-display text-3xl font-semibold text-navy sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
