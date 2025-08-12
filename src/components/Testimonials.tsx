import { User, UserCheck, Crown } from 'lucide-react';

const testimonials = [
  {
    name: "عبدالعزيز",
    role: "باحث عن عمل",
    quote: "كنت ضايع بعد التخرج و أقدم عشوائي وما تجيني ردود، الموجه ساعدني أضبط سيرتي، وجهني على جهات تناسبني، وخلال فترة قصيره حصلت على فرص مقابلات",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScemRBUicYOECCpXDiJTuv99LIQmzcB0RVyg6144KKY-L9SZhG"

  },
  {
    name: "سارة",
    role: "موظفة قطاع خاص",
    quote: "كنت مترددة أطلب ترقية من مديري لأني ما كنت واثقة من جاهزيتي. الموجه ساعدني أرتب أفكاري وخطتي بشكل احترافي وقدرت أقدم نفسي بطريقة أقوى بكثير",
    img:"https://cdn-icons-png.freepik.com/512/4273/4273167.png?ga=GA1.1.670271846.1751191686"
    // img:"https://cdn-icons-png.flaticon.com/128/7264/7264191.png"
//img:"https://cdn-icons-png.flaticon.com/128/4358/4358646.png"
     //img: "https://cdn-icons-png.flaticon.com/128/9700/9700856.png"


  },
  {
    name: "م. سالم ",
    role: "موجّه متخصص",
    quote: "أعتز بدوري كموجّه على هذه المنصة. منصة احترافية وتواصلها مع المستفيدين سهل وواضح.",

      img: "https://cdn-icons-png.flaticon.com/128/2349/2349090.png"


  }
];

const Testimonials = () => (
  <section className="py-16 relative bg-white">
    <svg
      className="absolute right-0 top-0 w-60 h-40 opacity-10 -z-10"
      aria-hidden="true"
      viewBox="0 0 220 120"
      fill="none"
    >
      <defs>
        <pattern id="test-pat" width="44" height="44" patternUnits="userSpaceOnUse">
          <line x1="0" y1="44" x2="44" y2="0" stroke="#26b6da" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="220" height="120" fill="url(#test-pat)" />
    </svg>

    <div className="container max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black mb-7 text-center text-brand-900 animate-fade-in tracking-tight drop-shadow-sm">
        آراء المستخدمين
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex-1 bg-white rounded-xl shadow-lg p-7 flex flex-col items-center animate-fade-in hover:scale-105 hover:shadow-xl transition-transform duration-150 text-center"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full border-4 border-brand-200 mb-3"
              loading="lazy"
            />
            <p className="text-brand-700 italic mb-4">"{t.quote}"</p>
            <div className="mt-auto">
              <div className="font-bold text-brand-900">{t.name}</div>
              <div className="text-brand-500 text-sm">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
