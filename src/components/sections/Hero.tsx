export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/1765892138399_1723637842674_2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-4">
          Expert-led adventures since 2017
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Where Will the Mountains{" "}
          <span className="text-orange-400">Take You?</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Expert-led treks and tours from Bangalore. From misty Western Ghats
          ridgelines to sun-soaked coastal trails — curated for every kind of
          adventurer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#packages"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base"
          >
            Explore Packages
          </a>
          <a
            href="#tours"
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base"
          >
            Browse Tours
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs">
        <span>Scroll to explore</span>
        <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
