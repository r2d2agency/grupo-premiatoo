import { Logo } from "./Logo";
import { Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";

const cols = [
  {
    title: "Institucional",
    items: ["Sobre a Garantidora", "Governança", "Políticas", "Trabalhe Conosco"],
  },
  {
    title: "Garantias",
    items: ["Garantia Judicial", "Garantia Contratual", "Garantia para Licitações", "Todas as Garantias"],
  },
  {
    title: "Premiatto Capital",
    items: ["Soluções de Capital", "Antecipação de Recebíveis", "Capital de Giro", "Todas as Soluções"],
  },
  { title: "Conteúdos", items: ["Blog", "Materiais", "Notícias"] },
  { title: "Parceiros", items: ["Seja um Parceiro", "Área do Parceiro"] },
];

export function Footer({ logoUrl }: { logoUrl?: string }) {
  return (
    <footer className="bg-navy-deep text-navy-foreground mt-10">
      <div className="mx-auto max-w-[1280px] px-6 py-14 grid lg:grid-cols-[1.2fr_3fr_1.4fr] gap-10">
        <div>
          <Logo src={logoUrl} />
          <p className="text-xs text-navy-foreground/70 mt-5 leading-relaxed max-w-[260px]">
            Estrutura, segurança e experiência para operações que exigem confiança e resultados
            sustentáveis.
          </p>
          <div className="flex gap-3 mt-5 text-navy-foreground/80">
            <a href="#"><Linkedin className="h-4 w-4" /></a>
            <a href="#"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-[12px]">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-semibold mb-3 text-navy-foreground">{c.title}</div>
              <ul className="space-y-2 text-navy-foreground/70">
                {c.items.map((i) => (
                  <li key={i}><a href="#" className="hover:text-navy-foreground">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <div className="font-semibold mb-3 text-[12px]">Contato</div>
          <div className="space-y-3 text-[12px] text-navy-foreground/80">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +55 11 3030-6200</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> contato@garantidorapremiatto.com.br</div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>Av. Brigadeiro Faria Lima, 3477 – 18º andar<br />Itaim Bibi, São Paulo – SP 04538-133</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto max-w-[1280px] px-6 py-5 flex flex-wrap justify-between items-center text-[11px] text-navy-foreground/60">
          <div>© 2024 Garantidora Premiatto. Todos os direitos reservados.</div>
          <div className="flex gap-5">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <span className="opacity-40">TNS R2D2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
