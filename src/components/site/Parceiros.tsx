import { ArrowRight } from "lucide-react";

export function Parceiros({ items }: { items: { tag: string; title: string; cta: string; image: string; link: string }[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-background py-6">
      <div className="mx-auto max-w-[1280px] px-6 grid md:grid-cols-2 gap-6">
        {items.map((b, i) => (
          <div key={i} className="relative overflow-hidden rounded-sm bg-surface min-h-[300px] md:min-h-[200px]">
            <div className="flex flex-col md:grid md:grid-cols-2 h-full">
              <div className="h-[200px] md:h-full order-first md:order-last">
                <img src={b.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
                    {b.tag}
                  </div>
                  <p className="font-display text-xl text-navy leading-snug">{b.title}</p>
                </div>
                <a
                  href={b.link}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-brand-blue mt-4"
                >
                  {b.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
