// Lightweight client for the CMS backend.
// Set VITE_API_URL to your EasyPanel backend URL, e.g. https://api.yourdomain.com
export const API_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:4000"
).replace(/\/$/, "");

export type SiteContent = {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  brandCards: {
    title: string;
    description: string;
    cta: string;
    variant: "light" | "dark";
    image: string;
  }[];
  stats: { value: string; label: string }[];
  garantias: { title: string; icon: string }[];
  capital: {
    title: string;
    items: { title: string; description: string; icon: string }[];
  };
};

export const defaultContent: SiteContent = {
  hero: {
    title: "Estrutura, capital e segurança para operações que exigem critério e continuidade.",
    subtitle:
      "Atuamos na estruturação de garantias e soluções financeiras para empresas que precisam proteger contratos, fortalecer seu caixa e seguir em frente com segurança.",
    ctaPrimary: "SOLICITAR ANÁLISE",
    ctaSecondary: "FALAR COM ESPECIALISTA",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
  },
  brandCards: [
    {
      title: "Garantias estruturadas para proteger o que sustenta o seu negócio.",
      description: "",
      cta: "CONHECER GARANTIAS",
      variant: "light",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    },
    {
      title: "Soluções financeiras para gerar fluxo, crédito e novas oportunidades de crescimento.",
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
      {
        title: "Antecipação de Recebíveis",
        description: "Transforme seus recebíveis em fluxo de caixa imediato.",
        icon: "dollar",
      },
      {
        title: "Capital de Giro Estruturado",
        description: "Recursos para apoiar o crescimento com segurança.",
        icon: "chart",
      },
      {
        title: "Crédito com Garantia",
        description: "Soluções de crédito com estrutura e flexibilidade.",
        icon: "shield",
      },
      {
        title: "Operações Estruturadas",
        description: "Soluções personalizadas para momentos decisivos.",
        icon: "network",
      },
      {
        title: "Soluções Financeiras Personalizadas",
        description: "Estratégia financeira de acordo com sua realidade.",
        icon: "users",
      },
    ],
  },
};

export async function fetchContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { credentials: "omit" });
    if (!res.ok) throw new Error("bad status");
    const data = await res.json();
    return { ...defaultContent, ...data };
  } catch {
    return defaultContent;
  }
}

// ---------- Admin auth ----------
const TOKEN_KEY = "gp_admin_token";
export const getToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function login(email: string, password: string) {
  console.log(`Attempting login to: ${API_URL}/api/auth/login`);
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "omit", // Since we use Bearer token, we don't need cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Login failed response:", errorData);
      throw new Error(errorData.error || "Credenciais inválidas");
    }
    
    const data = await res.json();
    setToken(data.token);
    return data;
  } catch (error: any) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error("Erro de conexão (CORS/Network). Verifique se o backend está acessível e configurado.");
    }
    throw error;
  }
}

export async function saveContent(content: SiteContent) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
  if (!res.ok) throw new Error("Falha ao salvar");
  return res.json();
}
