import AnimatedBackground from "./AnimatedBackground";

const Hero = () => (
  <section className="w-full py-20 md:py-39 relative overflow-visible shadow-lg bg-transparent">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-700 via-brand-500 to-brand-200 bg-clip-text text-transparent"></div>

    {/* Animated rich background */}
    <AnimatedBackground />

    <div className="container max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 px-5">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-brand-800 drop-shadow-lg leading-snug pt-4 animate-fade-in bg-gradient-to-br from-brand-700 via-brand-500 to-brand-200 bg-clip-text text-transparent overflow-visible">
        شخص يعرفك، يفهمك، ويرشدك لوظيفة تستحقها
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-brand-800 mb-10 max-w-2xl font-medium bg-white/60 backdrop-blur rounded-lg inline-block px-4 py-2 shadow">
        منصة رقمية تربطك بمرشدين محترفين في سوق العمل السعودي يقدمون لك التوجيه الأمثل لمسارك المهني وتسهيل وصولك لفرص وظيفية تناسبك
      </p>

      {/* 
      <div className="flex flex-col md:flex-row gap-5 mt-3 font-bold">
        <a href="#join" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-10 py-4 rounded-xl shadow-2xl transition-all text-lg ring-2 ring-brand-200 hover-scale">
          سجّل الآن
        </a>
        <a href="#join" className="bg-white border border-brand-500 text-brand-700 font-bold px-10 py-4 rounded-xl shadow-md hover:bg-brand-50 transition-all text-lg hover-scale">
          انضم كموجّه
        </a>
      </div> 
      */}
    </div>
  </section>
);

export default Hero;
