
import RegistrationStepper from "./join-form/RegistrationStepper";

const JoinForm = () => (
  <section className="py-16 bg-gradient-to-tl from-brand-50 via-white to-brand-100 relative" id="join">
    <svg className="absolute left-0 top-0 w-80 h-24 opacity-10 -z-10" aria-hidden="true" viewBox="0 0 320 80" fill="none">
      <defs>
        <pattern id="join-pat" width="64" height="32" patternUnits="userSpaceOnUse">
          <rect x="12" y="4" width="40" height="24" rx="8" stroke="#a3def0" strokeWidth="1.2" fill="none"/>
        </pattern>
      </defs>
      <rect width="320" height="80" fill="url(#join-pat)" />
    </svg>
    <div className="container max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-black mb-6 text-brand-900 animate-fade-in tracking-tight drop-shadow-sm">
        سجّل اهتمامك
      </h2>
      <p className="mb-6 text-brand-700 text-lg font-medium bg-white/60 backdrop-blur rounded-lg inline-block px-3 py-1 shadow">
        انضم كباحث عن توجيه او كموجّه لبدء رحلتك معنا!
      </p>
      <div className="flex justify-center">
        <RegistrationStepper />
      </div>
    </div>
  </section>
);

export default JoinForm;
