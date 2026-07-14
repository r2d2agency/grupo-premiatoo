import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, ChevronLeft, ChevronRight, User, Phone, Mail, MapPin, Linkedin, Instagram, Check } from "lucide-react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/premiatto-zeepo")({
  head: () => ({
    meta: [
      { title: "Premiatto Locadora + Zeepo — Inovação que move o agro" },
      { name: "description", content: "Parceria entre Premiatto Locadora e Zeepo: soluções de mobilidade elétrica, eficiência operacional e sustentabilidade para o agronegócio." },
      { property: "og:title", content: "Premiatto Locadora + Zeepo" },
      { property: "og:description", content: "Tecnologia, inovação e energia para transformar o agronegócio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PremiattoZeepoPage,
});

const NAVY = "#041A3B";
const CYAN = "#5DE0C6";

function PremiattoZeepoPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => { fetchContent().then(setContent); }, []);
  const pz = content.premiattoZeepo;

  return (
    <div className="min-h-screen font-sans" style={{ background: NAVY, color: "#fff" }}>
      <Header pz={pz} />
      <Hero pz={pz} />
      <Parceria pz={pz} />
      <Beneficios pz={pz} />
      <Solucoes pz={pz} />
      <CTABand pz={pz} />
      <ContactForm pz={pz} />
      <Footer pz={pz} />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Header({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{ background: scrolled ? "rgba(4,26,59,0.85)" : "transparent" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {pz.header.logoPremiatto ? (
            <img src={pz.header.logoPremiatto} alt="Premiatto Locadora" className="h-8 lg:h-9 w-auto" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border border-white/60 rounded" />
              <div className="text-white font-light tracking-[0.2em] text-sm">premiatto <span className="text-[10px] block opacity-70">LOCADORA</span></div>
            </div>
          )}
          <div className="hidden md:flex items-center gap-4 pl-6 border-l border-white/20">
            <span className="text-[10px] tracking-[0.25em] text-white/60">PARCEIRO OFICIAL</span>
            {pz.header.logoZeepo ? (
              <img src={pz.header.logoZeepo} alt="Zeepo" className="h-7 w-auto" />
            ) : (
              <span className="text-lg font-bold tracking-widest" style={{ color: CYAN }}>ZEEPO</span>
            )}
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {pz.header.menu.map((m, i) => (
            <a key={i} href={m.href} className="text-sm text-white/80 hover:text-white transition-colors">
              {m.label}
            </a>
          ))}
        </nav>
        <a
          href={pz.header.ctaHref}
          className="px-5 py-2.5 rounded-md text-xs font-semibold tracking-widest transition-all hover:opacity-90"
          style={{ background: CYAN, color: NAVY }}
        >
          {pz.header.ctaLabel}
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  const [idx, setIdx] = useState(0);
  const slides = pz.hero.slides;
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), pz.hero.interval || 5000);
    return () => clearInterval(t);
  }, [slides.length, pz.hero.interval]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs tracking-[0.3em] mb-6" style={{ color: CYAN }}>{pz.hero.badge}</div>
          <h1
            className="font-display leading-[1.05]"
            style={{
              fontSize: `${pz.hero.titleSize || 56}px`,
              textAlign: pz.hero.titleAlign || "left",
            }}
          >
            {pz.hero.title}{" "}
            <span style={{ color: CYAN, fontStyle: "italic" }}>{pz.hero.titleHighlight}</span>
          </h1>
          <div className="w-16 h-[2px] my-6" style={{ background: CYAN }} />
          <p
            className="text-white/70 max-w-lg leading-relaxed"
            style={{
              fontSize: `${pz.hero.textSize || 15}px`,
              textAlign: pz.hero.textAlign || "left",
            }}
          >
            {pz.hero.text}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={pz.hero.ctaPrimaryHref}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-md text-sm font-semibold tracking-wide transition-all hover:opacity-90"
              style={{ background: CYAN, color: NAVY }}
            >
              {pz.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={pz.hero.ctaSecondaryHref}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-md text-sm font-semibold tracking-wide border border-white/30 text-white hover:bg-white/5 transition-all"
            >
              {pz.hero.ctaSecondary}
            </a>
          </div>
        </motion.div>

        {/* Right: Carousel */}
        <div className="relative h-[420px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[idx]?.id || idx}
              src={slides[idx]?.image}
              alt={slides[idx]?.alt || ""}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#041A3B]/60 via-transparent to-transparent" />
          {slides.length > 1 && (
            <>
              <button
                aria-label="anterior"
                onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 text-white backdrop-blur transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="próximo"
                onClick={() => setIdx((i) => (i + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 text-white backdrop-blur transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`slide ${i + 1}`}
                    className="h-[3px] rounded-full transition-all"
                    style={{
                      width: i === idx ? 32 : 16,
                      background: i === idx ? CYAN : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PARCERIA ---------------- */
function Parceria({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  return (
    <section id="parceria" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs tracking-[0.3em] mb-4" style={{ color: CYAN }}>{pz.parceria.badge}</div>
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: `${pz.parceria.titleSize || 40}px`,
              textAlign: pz.parceria.titleAlign || "left",
            }}
          >
            {pz.parceria.title}
          </h2>
          <div className="w-16 h-[2px] my-6" style={{ background: CYAN }} />
          <p
            className="text-white/70 leading-relaxed"
            style={{
              fontSize: `${pz.parceria.textSize || 15}px`,
              textAlign: pz.parceria.textAlign || "left",
            }}
          >
            {pz.parceria.text}
          </p>
        </div>
        <div className="relative h-[380px] lg:h-[480px] rounded-2xl overflow-hidden">
          <img src={pz.parceria.image} alt="Parceria" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041A3B]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFICIOS ---------------- */
function Beneficios({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {pz.beneficios.items.map((b, i) => {
            const pascal = b.icon.charAt(0).toUpperCase() + b.icon.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            const Ico = (Icons as any)[pascal] || Icons.Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center"
              >
                <Ico className="w-7 h-7 mb-3" strokeWidth={1.2} style={{ color: CYAN }} />
                <div className="text-xs text-white/80 leading-tight max-w-[130px]">{b.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SOLUÇÕES ---------------- */
function Solucoes({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  const items = pz.solucoes.items;
  const [page, setPage] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / perView));
  const currentPage = Math.min(page, totalPages - 1);

  const openItem = (i: number) => { setOpenIdx(i); setPhotoIdx(0); };
  const closeItem = () => setOpenIdx(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeItem();
      if (e.key === "ArrowRight") setPhotoIdx((p) => p + 1);
      if (e.key === "ArrowLeft") setPhotoIdx((p) => p - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [openIdx]);

  const activeItem = openIdx !== null ? items[openIdx] : null;
  const gallery = activeItem ? [activeItem.image, ...(activeItem.galeria || [])].filter(Boolean) : [];
  const safePhoto = gallery.length ? ((photoIdx % gallery.length) + gallery.length) % gallery.length : 0;

  return (
    <section id="solucoes" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <h2
            className="font-display"
            style={{
              fontSize: `${pz.solucoes.titleSize || 36}px`,
              textAlign: pz.solucoes.titleAlign || "center",
            }}
          >
            {pz.solucoes.title}
          </h2>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center disabled:opacity-30 hover:border-[color:var(--cy)] transition"
                style={{ ["--cy" as any]: CYAN }}
                aria-label="anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center disabled:opacity-30 hover:border-[color:var(--cy)] transition"
                style={{ ["--cy" as any]: CYAN }}
                aria-label="próximo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {items.map((s, i) => (
              <div
                key={s.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / perView}%` }}
              >
                <button
                  onClick={() => openItem(i)}
                  className="group text-left w-full rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[color:var(--cy)] transition-all"
                  style={{ ["--cy" as any]: CYAN }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {(s.galeria?.length ?? 0) > 0 && (
                      <div className="absolute top-3 right-3 text-[10px] tracking-widest px-2 py-1 rounded" style={{ background: "rgba(4,26,59,0.75)", color: CYAN }}>
                        +{(s.galeria?.length ?? 0) + 1} FOTOS
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">{s.resumo}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider" style={{ color: CYAN }}>
                      Ver galeria <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`página ${i + 1}`}
                className="h-[3px] rounded-full transition-all"
                style={{
                  width: i === currentPage ? 32 : 16,
                  background: i === currentPage ? CYAN : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(2,12,26,0.92)" }}
            onClick={closeItem}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[1100px] rounded-2xl overflow-hidden border border-white/10"
              style={{ background: NAVY }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeItem}
                aria-label="fechar"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/80 text-white backdrop-blur transition"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-black/60">
                {gallery.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={safePhoto}
                      src={gallery[safePhoto]}
                      alt={activeItem.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                )}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setPhotoIdx((p) => p - 1)}
                      aria-label="foto anterior"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/70 text-white backdrop-blur transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPhotoIdx((p) => p + 1)}
                      aria-label="próxima foto"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/70 text-white backdrop-blur transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full bg-black/50 text-white/90 backdrop-blur">
                      {safePhoto + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl mb-2">{activeItem.name}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">{activeItem.resumo}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={activeItem.ctaHref}
                    onClick={closeItem}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold tracking-wider transition hover:opacity-90"
                    style={{ background: CYAN, color: NAVY }}
                  >
                    {activeItem.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={closeItem}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-xs font-semibold tracking-wider border border-white/20 hover:bg-white/5 transition"
                  >
                    Continuar navegando
                  </button>
                </div>

                {gallery.length > 1 && (
                  <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                    {gallery.map((g, gi) => (
                      <button
                        key={gi}
                        onClick={() => setPhotoIdx(gi)}
                        className={`shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition ${gi === safePhoto ? "" : "opacity-60 hover:opacity-100"}`}
                        style={{ borderColor: gi === safePhoto ? CYAN : "transparent" }}
                      >
                        <img src={g} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- CTA BAND ---------------- */
function CTABand({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, #062554 0%, #041A3B 100%)" }}>
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
        <h2
          className="font-display leading-tight"
          style={{ fontSize: `${pz.cta.titleSize || 40}px`, textAlign: pz.cta.titleAlign || "center" }}
        >
          {pz.cta.title}
        </h2>
        <p
          className="mt-4 text-white/70 max-w-2xl mx-auto"
          style={{ fontSize: `${pz.cta.textSize || 16}px`, textAlign: pz.cta.textAlign || "center" }}
        >
          {pz.cta.text}
        </p>
        <a
          href={pz.cta.ctaHref}
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-md text-sm font-semibold tracking-wider transition-all hover:opacity-90"
          style={{ background: CYAN, color: NAVY }}
        >
          {pz.cta.ctaLabel} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- FORM ---------------- */
function ContactForm({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  const [form, setForm] = useState({
    nome: "", empresa: "", whatsapp: "", email: "", cidade: "", estado: "", mensagem: "",
  });
  const [lgpd, setLgpd] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lgpd) { toast.error("Você precisa concordar com a política de privacidade."); return; }
    if (!form.nome || !form.email || !form.whatsapp) { toast.error("Preencha nome, WhatsApp e e-mail."); return; }
    try {
      const { submitLead } = await import("@/lib/api");
      await submitLead({ ...form, source: "premiatto-zeepo" });
    } catch (err: any) {
      toast.error(err?.message || "Falha ao enviar. Tente novamente.");
      return;
    }
    if (pz.form.webhookUrl) {
      try {
        await fetch(pz.form.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } catch { /* ignore */ }
    }
    setSent(true);
    toast.success(pz.form.successMessage);
  }


  return (
    <section id="contato" className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div>
          <div className="text-xs tracking-[0.3em] mb-4" style={{ color: CYAN }}>QUERO SABER MAIS</div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">{pz.form.title}</h2>
          <div className="w-16 h-[2px] my-6" style={{ background: CYAN }} />
          <p className="text-white/70 max-w-md leading-relaxed">{pz.form.subtitle}</p>
        </div>

        <div className="rounded-2xl p-8 lg:p-10 border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: CYAN }}>
                <Check className="w-8 h-8" style={{ color: NAVY }} />
              </div>
              <h3 className="text-2xl font-display mb-3">Obrigado!</h3>
              <p className="text-white/70">{pz.form.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <FormInput icon={<User className="w-4 h-4" />} placeholder="Nome completo" value={form.nome} onChange={(v: string) => setForm({ ...form, nome: v })} />
              <FormInput placeholder="Empresa" value={form.empresa} onChange={(v: string) => setForm({ ...form, empresa: v })} />
              <FormInput icon={<Phone className="w-4 h-4" />} placeholder="WhatsApp" value={form.whatsapp} onChange={(v: string) => setForm({ ...form, whatsapp: v })} />
              <FormInput icon={<Mail className="w-4 h-4" />} placeholder="E-mail" type="email" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} />
              <div className="grid grid-cols-2 gap-4">
                <FormInput icon={<MapPin className="w-4 h-4" />} placeholder="Cidade" value={form.cidade} onChange={(v: string) => setForm({ ...form, cidade: v })} />
                <FormInput placeholder="Estado" value={form.estado} onChange={(v: string) => setForm({ ...form, estado: v })} />
              </div>
              <textarea
                placeholder="Mensagem"
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--cy)]"
                style={{ ["--cy" as any]: CYAN }}
              />
              <label className="flex items-start gap-3 text-xs text-white/70 cursor-pointer">
                <input type="checkbox" checked={lgpd} onChange={(e) => setLgpd(e.target.checked)} className="mt-0.5 accent-[color:var(--cy)]" style={{ ["--cy" as any]: CYAN }} />
                <span>{pz.form.lgpdLabel}</span>
              </label>
              <button
                type="submit"
                className="w-full py-4 rounded-md text-sm font-bold tracking-wider transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: CYAN, color: NAVY }}
              >
                {pz.form.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormInput({ icon, ...props }: any) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">{icon}</div>}
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 rounded-md py-3.5 ${icon ? "pl-12" : "px-4"} pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[color:var(--cy)]`}
        style={{ ["--cy" as any]: CYAN }}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ pz }: { pz: SiteContent["premiattoZeepo"] }) {
  return (
    <footer className="border-t border-white/10 py-14 text-sm">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {pz.header.logoPremiatto ? (
              <img src={pz.header.logoPremiatto} alt="Premiatto" className="h-8 w-auto" />
            ) : (
              <div className="text-white font-light tracking-widest text-sm">premiatto</div>
            )}
            {pz.header.logoZeepo ? (
              <img src={pz.header.logoZeepo} alt="Zeepo" className="h-6 w-auto" />
            ) : (
              <span className="text-sm font-bold tracking-widest" style={{ color: CYAN }}>ZEEPO</span>
            )}
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-[240px]">{pz.footer.text}</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{pz.footer.linksTitle}</div>
          <ul className="space-y-2 text-white/60 text-xs">
            {pz.footer.quickLinks.map((l, i) => (
              <li key={i}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">{pz.footer.contactTitle}</div>
          <ul className="space-y-2 text-white/60 text-xs">
            {pz.footer.phone && <li className="flex items-center gap-2"><Phone className="w-3 h-3" />{pz.footer.phone}</li>}
            {pz.footer.email && <li className="flex items-center gap-2"><Mail className="w-3 h-3" />{pz.footer.email}</li>}
            {pz.footer.address && <li className="flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5" />{pz.footer.address}</li>}
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Redes sociais</div>
          <div className="flex gap-3 text-white/60">
            {pz.footer.social.linkedin && <a href={pz.footer.social.linkedin} className="hover:text-white"><Linkedin className="w-4 h-4" /></a>}
            {pz.footer.social.instagram && <a href={pz.footer.social.instagram} className="hover:text-white"><Instagram className="w-4 h-4" /></a>}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mt-10 pt-6 border-t border-white/10 text-white/40 text-xs">
        {pz.footer.copyright}
      </div>
    </footer>
  );
}
