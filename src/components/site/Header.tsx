import { Logo } from "./Logo";
import { ChevronDown, Menu, X, ArrowRight, Scale, FileText, Gavel, Globe, Building, FileCheck2, Shield, Briefcase, Landmark, Handshake } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { SiteContent } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  file: FileText,
  gavel: Gavel,
  globe: Globe,
  building: Building,
  "file-check": FileCheck2,
  shield: Shield,
  briefcase: Briefcase,
  landmark: Landmark,
  handshake: Handshake,
};

export function Header({ content, sticky = true }: { content: SiteContent; sticky?: boolean }) {
  const logoUrl = content.branding.logoUrl;
  const navLinks = content.navigation.links;
  const cta = content.navigation.cta;
  const garantias = content.garantias || [];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();
  const isInstitucional = location.pathname === "/institucional";

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
    isScrolled || activeMegaMenu ? "bg-navy shadow-lg py-3" : isInstitucional ? "bg-[#041A3B]/40 backdrop-blur-md py-4" : "bg-transparent py-5"
  }`;

  return (
    <header className={`${headerClass} text-navy-foreground`}>
      <div className="mx-auto max-w-[1280px] px-6 flex items-center justify-between gap-6">
        <Logo src={logoUrl} height={content.branding.logoHeight} />
        <nav className="hidden lg:flex items-center gap-7 text-[13px]">
          {navLinks.map((n) => (
            <div 
              key={n.label}
              className="relative group py-2"
              onMouseEnter={() => n.label === "Garantias" && setActiveMegaMenu("Garantias")}
              onMouseLeave={() => n.label === "Garantias" && setActiveMegaMenu(null)}
            >
              <Link 
                to={n.label === "Notícias" || n.label === "Conteúdos" ? "/news" : n.label === "Garantias" ? "/garantias" : n.label === "Governança" ? "/governanca" : (n.href === "/institucional" || n.label === "Institucional" ? "/institucional" : (n.href.startsWith("#") ? "/" : n.href))} 
                hash={n.href.startsWith("#") && n.label !== "Institucional" ? n.href.replace("#", "") : undefined}
                className="hover:opacity-80 flex items-center gap-1 cursor-pointer transition-opacity text-white"
              >
                {n.label}
                {n.label === "Garantias" && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMegaMenu === "Garantias" ? "rotate-180" : ""}`} />}
              </Link>
              
              {n.label === "Garantias" && activeMegaMenu === "Garantias" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-white rounded-lg shadow-2xl border border-navy/5 overflow-hidden">
                    <div className="p-6 grid grid-cols-2 gap-4 bg-white">
                      {garantias.map((g) => {
                        const Icon = iconMap[g.icon] || FileText;
                        return (
                          <Link
                            key={g.id}
                            to="/garantias/$garantiaId"
                            params={{ garantiaId: g.id || g.title.toLowerCase().replace(/\s+/g, '-') }}
                            className="flex items-start gap-3 p-3 rounded-md hover:bg-surface transition-colors group/item"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <div className="mt-0.5 w-8 h-8 rounded bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover/item:bg-brand-blue group-hover/item:text-white transition-colors">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-navy group-hover/item:text-brand-blue transition-colors">
                                {g.title}
                              </div>
                              <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                {g.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="bg-surface p-4 border-t border-navy/5 flex justify-center">
                      <Link
                        to="/garantias"
                        className="text-[11px] font-bold tracking-widest text-brand-blue uppercase flex items-center gap-2 hover:opacity-80 transition-opacity"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        VER TODAS AS GARANTIAS <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
            <Link 
              key={n.label} 
              to={n.label === "Notícias" || n.label === "Conteúdos" ? "/news" : n.label === "Garantias" ? "/garantias" : (n.href === "/institucional" || n.label === "Institucional" ? "/institucional" : (n.href.startsWith("#") ? "/" : n.href))} 
              hash={n.href.startsWith("#") && n.label !== "Institucional" ? n.href.replace("#", "") : undefined}
              className="text-white hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {n.label}
            </Link>
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