import { Logo } from "./Logo";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SiteContent } from "@/lib/api";

export function Header({ content, sticky = true }: { content: SiteContent; sticky?: boolean }) {
  const logoUrl = content.branding.logoUrl;
  const navLinks = content.navigation.links;
  const cta = content.navigation.cta;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!sticky) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-navy shadow-lg py-3" : "bg-transparent py-5"
  }`;

  return (
    <header className={`${headerClass} text-navy-foreground`}>
      <div className="mx-auto max-w-[1280px] px-6 flex items-center justify-between gap-6">
        <Logo src={logoUrl} height={content.branding.logoHeight} />
        <nav className="hidden lg:flex items-center gap-7 text-[13px]">
          {navLinks.map((n) => (
            <Link 
              key={n.label} 
              to={n.label === "Notícias" || n.label === "Conteúdos" ? "/news" : (n.href.startsWith("#") ? "/" : n.href)} 
              hash={n.href.startsWith("#") ? n.href.replace("#", "") : undefined}
              className="hover:opacity-80 flex items-center gap-1 cursor-pointer"
            >
              {n.label}
              {n.label === "Garantias" && <ChevronDown className="h-3.5 w-3.5" />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {cta.visible && (
            <a
              href={cta.href}
              target={cta.target}
              className="hidden md:block text-[12px] font-semibold tracking-wider bg-brand-blue text-brand-blue-foreground px-5 py-3 rounded-sm hover:opacity-90 transition-all"
            >
              {cta.label}
            </a>
          )}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-navy border-t border-white/10 p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((n) => (
            <a 
              key={n.label} 
              href={n.href} 
              target={n.target}
              className="text-white hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
          {cta.visible && (
            <a
              href={cta.href}
              target={cta.target}
              className="text-center text-[12px] font-semibold tracking-wider bg-gold text-white px-5 py-4 rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cta.label}
            </a>
          )}
        </div>
      )}
    </header>
  );
}
