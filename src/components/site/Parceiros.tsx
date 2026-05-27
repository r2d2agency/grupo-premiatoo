import { ArrowRight } from "lucide-react";

const blocks = [
  {
    tag: "PARCEIROS E AGENTES",
    title: "Atue com uma estrutura sólida e conquiste novas oportunidades.",
    cta: "QUERO SER PARCEIRO",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80&auto=format&fit=crop",
    variant: "light" as const,
  },
  {
    tag: "PREMIATTO CAPITAL",
    title: "Soluções de capital para empresas que não podem parar.",
    cta: "CONHECER PREMIATTO CAPITAL",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80&auto=format&fit=crop",
    variant: "light" as const,
  },
];

export function Parceiros() {
  return (
    <section className="bg-background py-6">
      <div className="mx-auto max-w-[1280px] px-6 grid md:grid-cols-2 gap-6">
        {blocks.map((b, i) => (
          <div key={i} className="relative overflow-hidden rounded-sm bg-surface min-h-[200px]">
            <div className="grid grid-cols-2">
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
                    {b.tag}
                  </div>
                  <p className="font-display text-xl text-navy leading-snug">{b.title}</p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-brand-blue mt-4"
                >
                  {b.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div>
                <img src={b.image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
