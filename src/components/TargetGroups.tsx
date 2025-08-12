
const groups = [
  {
    title: "الراغبون بتوجيه مهني",
    desc: "اذا كنت ما تعرف من وين تبدأ او تفكر تغيّر مسارك المهني، موجّهينا مستعدين يرسمون معك خارطة  الطريق لمستقبل مهني أوضح بدون ما تضيع وقتك في تجارب عشوائية. "
  },
  // {
  //   title: "الموظفون الراغبون بالتطوير",
  //   desc: "تخطيط لمسار وظيفي فعّال واستشارات حول الترقية أو التغيير."
  // },
  {
    title: "الباحثون عن عمل",
    desc: "بدال ما تدور لحالك، خّل موجه يوقف معك ، يقيم سيرتك، يساعدك تتدرّب علي المقابلة، ويرشح وظيفة تناسبك"
  },
  {
    title: "المتقاعدون الخبراء",
    desc: "خبرتك ما انتهت بالتقاعد رّواد التوجيه يساعدك تبدأ فصل جديد كمستشار مؤثّر"
  },
];

const TargetGroups = () => (
  <section className="py-16 bg-brand-50 relative" id="groups">
    <svg className="absolute left-0 top-0 w-56 h-36 opacity-10 -z-10" aria-hidden="true" viewBox="0 0 220 100" fill="none">
      <defs>
        <pattern id="groups-pat" width="55" height="50" patternUnits="userSpaceOnUse">
          <ellipse cx="27.5" cy="25" rx="20" ry="15" stroke="#d1eef6" strokeWidth="1.2" fill="none"/>
        </pattern>
      </defs>
      <rect width="220" height="100" fill="url(#groups-pat)" />
    </svg>
    <div className="container max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black mb-7 text-center text-brand-900 animate-fade-in tracking-tight drop-shadow-sm">الفئات المستفيدة</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {groups.map((grp, i) => (
          <div key={i} className="p-7 rounded-xl bg-white shadow-lg text-center hover:scale-105 hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-xl font-bold mb-4 text-brand-800">{grp.title}</h3>
              <p className="text-brand-600 leading-relaxed">{grp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TargetGroups;

