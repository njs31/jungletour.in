const stats = [
  { value: "50K+", label: "Happy Trekkers" },
  { value: "4.9★", label: "Google Rating" },
  { value: "50+", label: "Adventures" },
  { value: "7 yrs", label: "Since 2017" },
];

export default function Stats() {
  return (
    <section className="bg-orange-500 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium text-orange-100 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
