import { Mail, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-brand-900 text-white py-8 mt-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6 md:gap-0">
        
        {/* حقوق النشر */}
        <div className="text-sm md:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">روّاد التوجيه</span>. جميع الحقوق محفوظة.
        </div>

        {/* فاصل على الشاشات الصغيرة */}
        <div className="w-full border-t border-brand-700 md:hidden" />

        {/* البريد الإلكتروني */}
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Mail size={18} className="text-brand-200" aria-hidden="true" />
          <a
            href="mailto:rawadaltawjeeh@gmail.com"
            className="underline hover:text-brand-300 transition-colors duration-200"
            aria-label="البريد الإلكتروني"
          >
            rawadaltawjeeh@gmail.com
          </a>
        </div>

        {/* فاصل على الشاشات الصغيرة */}
        <div className="w-full border-t border-brand-700 md:hidden" />

        {/* معلومات المطور - تظهر فقط في بيئة التطوير */}
        {process.env.NODE_ENV === "development" && (
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Linkedin size={18} className="text-brand-200" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/mohamed-kandil-97k/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-300 transition-colors duration-200"
              aria-label="ملف LinkedIn لمحمد قنديل"
            >
              تم التطوير بواسطة محمد قنديل
            </a>
          </div>
        )}
      </div>
    </div>
  </footer>
);

export default Footer;
