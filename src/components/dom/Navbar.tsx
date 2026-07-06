"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview",      id: "overview"   },
  { name: "Features",      id: "features"   },
  { name: "Tech Specs",    id: "tech-specs" },
  { name: "Experience",    id: "experience" },
  { name: "Comfort",       id: "comfort"    },
  { name: "Spatial Audio", id: "audio"      },
];

import { useLenis } from "lenis/react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy — check each section top against scroll position
      const sectionIds = ["overview", "features", "tech-specs", "experience", "comfort", "audio", "pre-order"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.5 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-12 py-4 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("overview")}
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-white/80 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
          <span className="tracking-[0.25em] font-medium text-[10px] uppercase text-white/90 group-hover:text-white transition-colors">
            Aether One
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium text-white/50">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1 transition-colors duration-300 focus:outline-none ${
                  isActive ? "text-white" : "hover:text-white/90"
                }`}
              >
                {item.name}
                {/* Active Indicator Line */}
                <div
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full transition-all duration-300 ease-out ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("pre-order")}
            className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white text-[11px] font-medium px-5 py-2 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            Pre-order
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle Navigation Menu"
          >
            <span className="text-[11px] font-medium">Menu</span>
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left text-sm py-2 transition-colors ${
                activeSection === item.id ? "text-white font-medium pl-2 border-l-2 border-white" : "text-white/60 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("pre-order")}
            className="mt-2 w-full bg-white text-black text-center text-xs font-medium py-3 rounded-full"
          >
            Pre-order Aether One
          </button>
        </div>
      )}
    </header>
  );
}
