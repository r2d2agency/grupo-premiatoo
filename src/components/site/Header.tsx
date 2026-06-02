import { Logo } from "./Logo";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteContent } from "@/lib/api";

const nav = [
  { label: "Institucional" },
  { label: "Garantias", hasChevron: true },
  { label: "Premiatto Capital" },
  { label: "Governança" },
  { label: "Conteúdos" },
  { label: "Parceiros" },
  { label: "Contato" },
];

export function Header({ logoUrl, sticky = true }: { logoUrl?: string; sticky?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const headerClass = sticky
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy shadow-lg py-3" : "bg-transparent py-5"
      }`
    : "absolute top-0 left-0 right-0 z-20 py-5";

  return (
    <header className={`${headerClass} text-navy-foreground`}>
      <div className="mx-auto max-w-[1280px] px-6 flex items-center justify-between gap-6">
        <Logo src={logoUrl} />
        <nav className="hidden lg:flex items-center gap-7 text-[13px]">
          {nav.map((n) => (
            <a key={n.label} href="#" className="hover:opacity-80 flex items-center gap-1">
              {n.label}
              {n.hasChevron && <ChevronDown className="h-3.5 w-3.5" />}
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="text-[12px] font-semibold tracking-wider bg-brand-blue text-brand-blue-foreground px-5 py-3 rounded-sm hover:opacity-90 transition-all"
        >
          SOLICITAR ANÁLISE
        </a>
      </div>
    </header>
  );
}
