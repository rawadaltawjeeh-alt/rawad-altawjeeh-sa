import { CheckCircle, Search, UserCheck } from "lucide-react";

const steps = [
  {
    icon: <Search size={32} className="text-brand-500" />,
    label: "ابحث واختر موجهك",
    description: "استعرض ملفات الموجهين المهنيين واطلع على تخصصاتهم وخبراتهم.",
  },
  {
    icon: <UserCheck size={32} className="text-brand-500" />,
    label: "احجز جلسة توجيه",
    description: "حدد موعد يناسبك لجلسة تفاعلية عبر المنصة.",
  },
  {
    icon: <CheckCircle size={32} className="text-brand-500" />,
    label: "احصل على التوصيات و الإرشاد المهني",
    description: "تلقى نصائح مهنية أو فرصة توصية على وظيفة تلائمك.",
  },
];

const HowItWorks = () => (
  <section className="py-16 relative bg-gradient-to-tr from-brand-50 via-white to-brand-100" id="how">
    {/* خلفية زخرفية */}
    <svg className="absolute left-0 bottom-0 w-64 h-36 opacity-10 -z-10" aria-hidden="true" viewBox="0 0 256 128" fill="none">
      <defs>
        <pattern id="hiw-pat" width="64" height="64" patternUnits="userSpaceOnUse">
          <rect x="8" y="8" width="48" height="48" rx="16" stroke="#a3def0" strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>
      <rect width="256" height="128" fill="url(#hiw-pat)" />
    </svg>

    <div className="container max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center text-brand-900 tracking-tight drop-shadow-sm">
        كيف تعمل المنصة؟
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center text-center px-6 py-10 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 animate-fade-in"
          >
            <div className="mb-4 flex justify-center items-center">
              {step.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-brand-800 mb-3">{step.label}</h3>
            <p className="text-sm md:text-base text-brand-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
