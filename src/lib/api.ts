// Lightweight client for the CMS backend.
// Set VITE_API_URL to your EasyPanel backend URL, e.g. https://api.yourdomain.com
export const API_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:4000"
).replace(/\/$/, "");

export type SiteContent = {
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
    logoHeight?: number;
  };
  navigation: {
    links: {
      label: string;
      href: string;
      target?: "_self" | "_blank";
    }[];
    cta: {
      label: string;
      href: string;
      target?: "_self" | "_blank";
      visible: boolean;
    };
  };
  modules: {
    header: boolean;
    headerSticky: boolean;
    hero: boolean;
    stats: boolean;
    garantias: boolean;
    capital: boolean;
    governanca: boolean;
    brandCards: boolean;
    news: boolean;
    parceiros: boolean;
    footer: boolean;
  };
  parceiros: {
    tag: string;
    title: string;
    cta: string;
    image: string;
    link: string;
  }[];
  news: {
    id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
    publishDate?: string;
    expiryDate?: string;
    active: boolean;
  }[];
  hero: {
    banners: {
      id: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaPrimaryLink?: string;
      ctaPrimaryTarget?: "_self" | "_blank";
      ctaSecondary: string;
      ctaSecondaryLink?: string;
      ctaSecondaryTarget?: "_self" | "_blank";
      image: string; // fallback
      imageDesktop?: string;
      imageTablet?: string;
      imageMobile?: string;
    }[];
    animation: "fade" | "slide" | "zoom";
    interval: number;
  };
  brandCards: {
    title: string;
    description: string;
    cta: string;
    variant: "light" | "dark";
    image: string;
    logoUrl?: string;
  }[];
  stats: { value: string; label: string }[];
  garantias: { title: string; description?: string; link?: string; icon: string }[];
  capital: {
    title: string;
    items: { title: string; description: string; icon: string }[];
  };
  governanca: {
    badge: string;
    title: string;
    titleSize?: number;
    description: string;
    descriptionSize?: number;
    image: string;
    items: string[];
  };
  footer: {
    text: string;
    columns: {
      title: string;
      items: { label: string; href: string }[];
    }[];
    social: {
      linkedin?: string;
      instagram?: string;
    };
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    copyright: string;
  };
};


export const defaultContent: SiteContent = {
  branding: {
    primaryColor: "#001B3D", // Navy
    secondaryColor: "#C5A059", // Gold/Tan
    logoHeight: 40,
  },
  navigation: {
    links: [
      { label: "Institucional", href: "#" },
      { label: "Garantias", href: "#" },
      { label: "Premiatto Capital", href: "#" },
      { label: "Governança", href: "#" },
      { label: "Conteúdos", href: "#" },
      { label: "Parceiros", href: "#" },
      { label: "Contato", href: "#" },
    ],
    cta: {
      label: "SOLICITAR ANÁLISE",
      href: "#",
      target: "_self",
      visible: true,
    },
  },
  modules: {
    header: true,
    headerSticky: true,
    hero: true,
    stats: true,
    garantias: true,
    capital: true,
    governanca: true,
    brandCards: true,
    news: true,
    parceiros: true,
    footer: true,
  },
  news: [
    {
      id: "1",
      title: "Premiatto Capital expande operações de antecipação de recebíveis",
      description: "Novas estruturas permitem maior agilidade e taxas competitivas para empresas do setor industrial e de serviços.",
      image: "https://images.unsplash.com/photo-1454165833767-027ffea70288?w=800&q=80",
      link: "#",
      publishDate: new Date().toISOString(),
      active: true
    },
    {
      id: "2",
      title: "A importância da governança em operações estruturadas",
      description: "Como a transparência e o compliance garantem a sustentabilidade de negócios complexos no mercado brasileiro.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      link: "#",
      publishDate: new Date().toISOString(),
      active: true
    }
  ],
  parceiros: [
    {
      tag: "PARCEIROS E AGENTES",
      title: "Atue com uma estrutura sólida e conquiste novas oportunidades.",
      cta: "QUERO SER PARCEIRO",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80&auto=format&fit=crop",
      link: "#",
    },
    {
      tag: "PREMIATTO CAPITAL",
      title: "Soluções de capital para empresas que não podem parar.",
      cta: "CONHECER PREMIATTO CAPITAL",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80&auto=format&fit=crop",
      link: "#",
    },
  ],
  hero: {
    banners: [
      {
        id: "1",
        title: "Estrutura, capital e segurança para operações que exigem critério e continuidade.",
        subtitle: "Atuamos na estruturação de garantias e soluções financeiras para empresas que precisam proteger contratos, fortalecer seu caixa e seguir em frente com segurança.",
        ctaPrimary: "SOLICITAR ANÁLISE",
        ctaPrimaryLink: "#",
        ctaPrimaryTarget: "_self",
        ctaSecondary: "FALAR COM ESPECIALISTA",
        ctaSecondaryLink: "#",
        ctaSecondaryTarget: "_self",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
      }
    ],
    animation: "fade",
    interval: 5000,
  },
  brandCards: [
    {
      title: "Garantias estruturadas para proteger o que sustenta o seu negócio.",
      description: "",
      cta: "CONHECER GARANTIAS",
      variant: "light",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
      logoUrl: "",
    },
    {
      title: "Soluções financeiras para gerar fluxo, crédito e novas oportunidades de crescimento.",
      description: "",
      cta: "CONHECER SOLUÇÕES DE CAPITAL",
      variant: "dark",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
      logoUrl: "",
    },
    {
      title: "Nova Solução de Negócios Premiatto.",
      description: "",
      cta: "SAIBA MAIS",
      variant: "light",
      image: "https://images.unsplash.com/photo-1454165833767-027ffea70288?w=1200&q=80&auto=format&fit=crop",
      logoUrl: "",
    },
  ],
  stats: [
    { value: "15+", label: "anos de atuação no mercado" },
    { value: "2.500+", label: "operações estruturadas" },
    { value: "1.000+", label: "empresas atendidas" },
    { value: "Atuação", label: "em todo o território nacional" },
  ],
  garantias: [
    { title: "Garantia Judicial", description: "Substituição de depósitos judiciais e garantia de execuções fiscais.", link: "#", icon: "scale" },
    { title: "Garantia Contratual", description: "Assegura o cumprimento de obrigações em contratos públicos ou privados.", link: "#", icon: "file" },
    { title: "Garantia para Licitações", description: "Garante a assinatura do contrato e a manutenção da proposta no certame.", link: "#", icon: "gavel" },
    { title: "Garantia Aduaneira", description: "Garante o pagamento de tributos em operações de importação e exportação.", link: "#", icon: "globe" },
    { title: "Garantia Imobiliária", description: "Proteção para empreendimentos, permutas e contratos de construção.", link: "#", icon: "building" },
    { title: "Garantia de Parcelamento Fiscal", description: "Garante o pagamento de débitos fiscais parcelados junto à União.", link: "#", icon: "file-check" },
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
  governanca: {
    badge: "NOSSO COMPROMISSO",
    title: "Governança, análise e responsabilidade em cada operação.",
    titleSize: 30,
    description: "Cada operação passa por um rigoroso processo de análise técnica, governança e gestão de risco para garantir segurança, transparência e continuidade.",
    descriptionSize: 14,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop",
    items: [
      "Análise técnica criteriosa",
      "Governança e compliance",
      "Gestão de risco",
      "Acompanhamento especializado",
    ],
  },
  footer: {
    text: "Estrutura, segurança e experiência para operações que exigem confiança e resultados sustentáveis.",
    columns: [
      {
        title: "Institucional",
        items: [
          { label: "Sobre a Garantidora", href: "#" },
          { label: "Governança", href: "#" },
          { label: "Políticas", href: "#" },
          { label: "Trabalhe Conosco", href: "#" },
        ],
      },
      {
        title: "Garantias",
        items: [
          { label: "Garantia Judicial", href: "#" },
          { label: "Garantia Contratual", href: "#" },
          { label: "Garantia para Licitações", href: "#" },
          { label: "Todas as Garantias", href: "#" },
        ],
      },
      {
        title: "Premiatto Capital",
        items: [
          { label: "Soluções de Capital", href: "#" },
          { label: "Antecipação de Recebíveis", href: "#" },
          { label: "Capital de Giro", href: "#" },
          { label: "Todas as Soluções", href: "#" },
        ],
      },
      {
        title: "Conteúdos",
        items: [
          { label: "Blog", href: "#" },
          { label: "Materiais", href: "#" },
          { label: "Notícias", href: "#" },
        ],
      },
      {
        title: "Parceiros",
        items: [
          { label: "Seja um Parceiro", href: "#" },
          { label: "Área do Parceiro", href: "#" },
        ],
      },
    ],
    social: {
      linkedin: "#",
      instagram: "#",
    },
    contact: {
      phone: "+55 11 3030-6200",
      email: "contato@garantidorapremiatto.com.br",
      address: "Av. Brigadeiro Faria Lima, 3477 – 18º andar\nItaim Bibi, São Paulo – SP 04538-133",
    },
    copyright: "© 2024 Garantidora Premiatto. Todos os direitos reservados.",
  },
};

export async function fetchContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { credentials: "omit" });
    if (!res.ok) throw new Error("bad status");
    const data = await res.json();
    const content = { ...defaultContent, ...data, 
      branding: { ...defaultContent.branding, ...data.branding },
      navigation: { ...defaultContent.navigation, ...data.navigation },
      modules: { ...defaultContent.modules, ...data.modules }
    };

    // Migration for Hero
    if (data.hero && !data.hero.banners) {
      content.hero = {
        banners: [{
          id: "migrated-1",
          title: data.hero.title || defaultContent.hero.banners[0].title,
          subtitle: data.hero.subtitle || defaultContent.hero.banners[0].subtitle,
          ctaPrimary: data.hero.ctaPrimary || defaultContent.hero.banners[0].ctaPrimary,
          ctaSecondary: data.hero.ctaSecondary || defaultContent.hero.banners[0].ctaSecondary,
          image: data.hero.image || defaultContent.hero.banners[0].image,
          imageDesktop: data.hero.image || defaultContent.hero.banners[0].image,
        }],
        animation: "fade",
        interval: 5000
      };
    } else if (data.hero) {
      content.hero = { ...defaultContent.hero, ...data.hero };
    }

    return content;

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
      credentials: "omit",
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
      throw new Error("O servidor (backend) não está respondendo. O erro de 'CORS' no navegador geralmente acontece porque o servidor está fora do ar (Erro 502 no EasyPanel).");
    }
    throw error;
  }
}

export async function register(email: string, password: string, name?: string) {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao criar conta");
    }
    
    const data = await res.json();
    setToken(data.token);
    return data;
  } catch (error: any) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error("Erro de conexão: o backend não respondeu.");
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

export async function getUsers() {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Falha ao buscar usuários");
  return res.json();
}

export async function createUser(userData: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Falha ao criar usuário");
  }
  return res.json();
}

export async function deleteUser(id: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Falha ao excluir usuário");
  return res.json();
}

export async function updateUser(id: string, userData: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Falha ao atualizar usuário");
  return res.json();
}

export async function updatePassword(id: string, password: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/users/${id}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Falha ao atualizar senha");
  return res.json();
}

