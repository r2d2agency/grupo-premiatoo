import { Logo } from "./Logo";
import { ChevronDown } from "lucide-react";

const nav = [
  { label: "Institucional" },
  { label: "Garantias", hasChevron: true },
  { label: "Premiatto Capital" },
  { label: "Governança" },
  { label: "Conteúdos" },
  { label: "Parceiros" },
  { label: "Contato" },
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 text-navy-foreground">
      <div className="mx-auto max-w-[1280px] px-6 py-5 flex items-center justify-between gap-6">
        <Logo />
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
          className="text-[12px] font-semibold tracking-wider bg-brand-blue text-brand-blue-foreground px-5 py-3 rounded-sm hover:opacity-90"
        >
          SOLICITAR ANÁLISE
        </a>
      </div>
    </header>
  );
}
