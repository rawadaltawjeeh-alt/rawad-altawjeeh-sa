
import { Users, Briefcase, Stars } from "lucide-react";

const features = [
  {
    icon: <Users size={38} className="text-brand-500"/>,
    label: "شبكة موجّهين سعوديين مؤهلين",
    description: "موجّهين تم اختيارهم بعناية ليمنحوك أفضل الارشاد والدعم الوظيفي",
  },

  {
    icon: <Briefcase size={38} className="text-brand-500"/>,
    label: "استثمر خبرتك في فرص جديدة",

    description: "رواد التوجيه تمكنك من تحويل سنوات الخبرة إلى فرص مهنية جديدة تليق بخبراتك",
  },
  
  {
    icon: <Stars size={38} className="text-brand-500"/>,
    label: "دعم وتوجيه مهني مخصص",
    description: "جلسات فردية وتوصيات احترافية تساعدك على اتخاذ قرارات تطويرية وفعالة.",
  },
];

const About = () => (
  <section className="py-16 bg-gradient-to-tl from-white via-brand-50 to-white relative" id="about">
    {/* Optional decorative SVG */}
    <svg className="absolute top-0 right-0 w-60 h-36 opacity-10 -z-10" aria-hidden="true" viewBox="0 0 200 120" fill="none">
      <defs>
        <pattern id="about-pat" width="58" height="58" patternUnits="userSpaceOnUse">
          <circle cx="29" cy="29" r="22" stroke="#6ecce5" strokeWidth="1.5" fill="none"/>
        </pattern>
      </defs>
      <rect width="200" height="120" fill="url(#about-pat)" />
    </svg>
    <div className="container max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-black mb-5 text-brand-900 animate-fade-in tracking-tight drop-shadow-sm">
        ما هي منصّة روّاد التوجيه؟
      </h2>
      {/* <p className="mb-10 max-w-xl mx-auto text-brand-700 text-lg font-medium bg-white/60 backdrop-blur rounded-lg inline-block px-3 py-1 shadow">
        منصة رقمية تربطك بمرشدين محترفين في سوق العمل السعودي يقدمون لك التوجيه الأمثل لمسارك المهني وتسهيل وصولك لفرص وظيفية تناسبك.
      </p> */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {features.map((feat, i) => (
          <div key={i} className="bg-brand-50 rounded-xl shadow-md p-6 flex-1 hover:scale-105 hover:shadow-xl transition-transform duration-150">
            <div className="mb-3 flex justify-center">{feat.icon}</div>
            <h3 className="text-lg font-extrabold text-brand-800 mb-2">{feat.label}</h3>
            <p className="text-brand-700">{feat.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default About;
