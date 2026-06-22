import { Logo } from "./Logo";
import * as Icons from "lucide-react";
import { Linkedin, Instagram, Phone, Mail, MapPin, Lock } from "lucide-react";
import { type SiteContent } from "@/lib/api";

export function Footer({ content }: { content: SiteContent }) {
  const { footer, branding } = content;
  
  return (
    <footer className="bg-navy-deep text-navy-foreground mt-10">
      <div className="mx-auto max-w-[1280px] px-6 py-14 grid lg:grid-cols-[1.2fr_3fr_1.4fr] gap-10">
        <div>
          <Logo src={branding.logoUrl} />
          <p className="text-xs text-navy-foreground/70 mt-5 leading-relaxed max-w-[260px]">
            {footer.text}
          </p>
          <div className="flex gap-3 mt-5 text-navy-foreground/80">
            {footer.social.linkedin && (
              <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {footer.social.instagram && (
              <a href={footer.social.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-[12px]">
          {footer.columns.map((col, idx) => (
            <div key={idx}>
              <div className="font-semibold mb-3 text-navy-foreground">{col.title}</div>
              <ul className="space-y-2 text-navy-foreground/70">
                {col.items.map((item, iIdx) => (
                  <li key={iIdx}>
                    <a href={item.href} className="hover:text-navy-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <div className="font-semibold mb-3 text-[12px]">Contato</div>
          <div className="space-y-3 text-[12px] text-navy-foreground/80">
            {footer.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {footer.contact.phone}
              </div>
            )}
            {footer.contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {footer.contact.email}
              </div>
            )}
            {footer.contact.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="whitespace-pre-line">{footer.contact.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {footer.intranet?.enabled && (
        <div className="border-t border-navy-foreground/10">
          <div className="mx-auto max-w-[1280px] px-6 py-4 flex justify-center">
            <a
              href={footer.intranet.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] text-navy-foreground/80 hover:text-navy-foreground transition-colors"
            >
              {(() => {
                const name = (footer.intranet?.icon || "Lock");
                const pascal = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                const Ico = (Icons as any)[pascal] || Lock;
                return <Ico className="h-4 w-4" />;
              })()}
              <span className="uppercase tracking-wider">{footer.intranet.label || "Intranet"}</span>
            </a>
          </div>
        </div>
      )}
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto max-w-[1280px] px-6 py-5 flex flex-wrap justify-between items-center text-[11px] text-navy-foreground/60">
          <div>{footer.copyright}</div>
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
