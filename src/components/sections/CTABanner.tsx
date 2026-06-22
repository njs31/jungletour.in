export default function CTABanner() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://bpu-images-v1.s3.eu-north-1.amazonaws.com/uploads/coverimage--Optimized-sreehari-devadas-wzdhKTE34mk-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-orange-600/85" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Your Next Adventure is One Click Away
        </h2>
        <p className="text-lg text-orange-100 mb-8 max-w-xl mx-auto">
          Join 50,000+ trekkers who chose the Western Ghats this season.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+918310822183"
            className="bg-white text-orange-600 font-semibold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors"
          >
            Talk to an Expert
          </a>
          <a
            href="https://wa.me/918310822183"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/15 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
