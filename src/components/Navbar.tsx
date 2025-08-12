import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = () => {
    setOpen(false);
    navigate('/contact');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-100 transition-all duration-300 ${
        scrolled ? "py-3 shadow-lg" : "py-4 shadow-sm"
      }`}
    >
      <nav className="container max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="text-brand-900 font-black text-xl md:text-2xl hover:text-brand-700 transition-colors duration-200 flex items-center gap-2"
        >
          {/* <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            ر
          </div> */}
          روّاد التوجيه
        </a>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleContactClick}
            className="text-brand-700 hover:text-brand-600 font-medium px-4 py-2 rounded-lg hover:bg-brand-50 transition-all duration-200"
          >
            تواصل معنا
          </button>

          <a
            href="#join"
            onClick={(e) => handleNavClick(e, "#join")}
            className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-2.5 rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            سجل اهتمامك
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-brand-50 transition-colors duration-200"
          aria-label="فتح القائمة"
        >
          {open ? (
            <X className="w-6 h-6 text-brand-700" />
          ) : (
            <Menu className="w-6 h-6 text-brand-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-brand-100 shadow-lg animate-fade-in">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {/* No navLinks here */}

              <div className="border-t border-brand-100 pt-4 mt-2 flex flex-col gap-3">
                <button
                  onClick={handleContactClick}
                  className="text-brand-700 hover:text-brand-600 font-medium py-2 px-3 rounded-lg hover:bg-brand-50 transition-all duration-200 text-right"
                >
                  تواصل معنا
                </button>

                <a
                  href="#join"
                  onClick={(e) => handleNavClick(e, "#join")}
                  className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-200 font-medium text-center shadow-sm"
                >
                  سجل اهتمامك
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
