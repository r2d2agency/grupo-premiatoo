import { CheckCircle2 } from "lucide-react";

const items = [
  "Análise técnica criteriosa",
  "Governança e compliance",
  "Gestão de risco",
  "Acompanhamento especializado",
];

export function Governanca() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-3">
        <div className="min-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-surface p-10 lg:p-14">
          <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
            NOSSO COMPROMISSO
          </div>
          <h3 className="font-display text-3xl text-navy leading-tight">
            Governança, análise e responsabilidade em cada operação.
          </h3>
          <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
            Cada operação passa por um rigoroso processo de análise técnica, governança e gestão de
            risco para garantir segurança, transparência e continuidade.
          </p>
        </div>
        <div className="bg-surface p-10 lg:p-14 space-y-5">
          {items.map((i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <span className="text-sm text-navy">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
