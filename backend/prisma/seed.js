import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const defaultContent = {
  hero: {
    title:
      "Estrutura, capital e segurança para operações que exigem critério e continuidade.",
    subtitle:
      "Atuamos na estruturação de garantias e soluções financeiras para empresas que precisam proteger contratos, fortalecer seu caixa e seguir em frente com segurança.",
    ctaPrimary: "SOLICITAR ANÁLISE",
    ctaSecondary: "FALAR COM ESPECIALISTA",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
  },
  brandCards: [
    {
      title:
        "Garantias estruturadas para proteger o que sustenta o seu negócio.",
      description: "",
      cta: "CONHECER GARANTIAS",
      variant: "light",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title:
        "Soluções financeiras para gerar fluxo, crédito e novas oportunidades de crescimento.",
      description: "",
      cta: "CONHECER SOLUÇÕES DE CAPITAL",
      variant: "dark",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
    },
  ],
  stats: [
    { value: "15+", label: "anos de atuação no mercado" },
    { value: "2.500+", label: "operações estruturadas" },
    { value: "1.000+", label: "empresas atendidas" },
    { value: "Atuação", label: "em todo o território nacional" },
  ],
  garantias: [
    { title: "Garantia Judicial", icon: "scale" },
    { title: "Garantia Contratual", icon: "file" },
    { title: "Garantia para Licitações", icon: "gavel" },
    { title: "Garantia Aduaneira", icon: "globe" },
    { title: "Garantia Imobiliária", icon: "building" },
    { title: "Garantia de Parcelamento Fiscal", icon: "file-check" },
  ],
  capital: {
    title: "Soluções financeiras sob medida para impulsionar seu negócio.",
    items: [
      { title: "Antecipação de Recebíveis", description: "Transforme seus recebíveis em fluxo de caixa imediato.", icon: "dollar" },
      { title: "Capital de Giro Estruturado", description: "Recursos para apoiar o crescimento com segurança.", icon: "chart" },
      { title: "Crédito com Garantia", description: "Soluções de crédito com estrutura e flexibilidade.", icon: "shield" },
      { title: "Operações Estruturadas", description: "Soluções personalizadas para momentos decisivos.", icon: "network" },
      { title: "Soluções Financeiras Personalizadas", description: "Estratégia financeira de acordo com sua realidade.", icon: "users" },
    ],
  },
};

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@premiatto.com";
  const password = process.env.ADMIN_PASSWORD || "premiatto123";
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name: "Admin", role: "admin" },
  });

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, data: defaultContent },
  });

  console.log("Seed concluído. Login:", email, "/ Senha:", password);
}

main().finally(() => prisma.$disconnect());
