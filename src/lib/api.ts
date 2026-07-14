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
    institucional: boolean;
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
    videoUrl?: string;
    content?: string;
    publishDate?: string;
    expiryDate?: string;
    category?: string;
    segment?: string;
    tags?: string[];
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
    href?: string;
  }[];
  stats: { value: string; label: string }[];
  garantias: { 
    id: string;
    title: string; 
    description?: string; 
    content?: string;
    image?: string;
    link?: string; 
    icon: string;
    columns?: number;
    scrollStep?: number;
    layout?: "card" | "minimal";
    headerAlign?: "left" | "center" | "right" | "justify";
    cardAlign?: "left" | "center" | "right" | "justify";
    detailTitleAlign?: "left" | "center" | "right" | "justify";
    detailDescriptionAlign?: "left" | "center" | "right" | "justify";
    detailContentAlign?: "left" | "center" | "right" | "justify";
    detailTitleSize?: number;
    detailDescriptionSize?: number;
    detailContentSize?: number;
  }[];
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
  governancaPage: {
    hero: {
      title: string; subtitle: string; image: string;
      titleSize?: number; titleAlign?: "left" | "center" | "right" | "justify";
      subtitleSize?: number; subtitleAlign?: "left" | "center" | "right" | "justify";
    };
    intro: {
      badge: string; title: string; text: string; image: string;
      titleSize?: number; titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number; textAlign?: "left" | "center" | "right" | "justify";
    };
    processo: {
      badge: string;
      steps: { number: string; title: string; description: string }[];
      titleSize?: number; descriptionSize?: number;
      itemAlign?: "left" | "center" | "right" | "justify";
    };
    riscos: {
      badge: string; title: string; text: string; image: string;
      titleSize?: number; titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number; textAlign?: "left" | "center" | "right" | "justify";
    };
    principios: {
      badge: string; title: string; text: string; items: string[];
      titleSize?: number; titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number; textAlign?: "left" | "center" | "right" | "justify";
    };
    ctaFinal: {
      title: string; text: string; ctaLabel: string; ctaHref: string; image: string;
      titleSize?: number; titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number; textAlign?: "left" | "center" | "right" | "justify";
    };
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
    intranet?: {
      enabled: boolean;
      label: string;
      url: string;
      icon: string;
    };
  };
  seo: {
    globalTitle: string;
    globalDescription: string;
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    facebookPixelId?: string;
    metaTags: { name: string; content: string }[];
    canonicalUrl?: string;
    scripts?: { placement: "head" | "body"; content: string }[];
  };
  institucional: {
    hero: {
      banners: {
        id: string;
        title: string;
        subtitle: string;
        ctaLabel: string;
        image: string;
        imageDesktop?: string;
        imageTablet?: string;
        imageMobile?: string;
      }[];
      animation: "fade" | "slide" | "zoom";
      interval: number;
    };
    historia: {
      title: string;
      text: string;
      image: string;
    };
    hoje: {
      title: string;
      text: string;
      image: string;
    };
    orientacao: {
      title: string;
      proposito: { title: string; text: string };
      visao: { title: string; text: string };
      principios: { title: string; items: string[] };
    };
    pensamento: {
      title: string;
      text: string;
      image: string;
    };
    organizacional: {
      text: string;
      items: { label: string; children?: { label: string }[] }[];
    };
    lideranca: {
      name: string;
      role: string;
      bio: string;
      photo: string;
      positions: string[];
    };
    diferenciais: string[];
    manifesto: {
      text: string;
    };
    ctaFinal: {
      title: string;
      text: string;
      ctaLabel: string;
      image: string;
    };
    typography?: Record<string, {
      titleSize?: number;
      titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number;
      textAlign?: "left" | "center" | "right" | "justify";
    }>;
  };
  premiattoZeepo: {
    header: {
      logoPremiatto: string;
      logoZeepo: string;
      menu: { label: string; href: string }[];
      ctaLabel: string;
      ctaHref: string;
    };
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      text: string;
      ctaPrimary: string;
      ctaPrimaryHref: string;
      ctaSecondary: string;
      ctaSecondaryHref: string;
      slides: { id: string; image: string; alt: string }[];
      interval: number;
      titleSize?: number;
      titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number;
      textAlign?: "left" | "center" | "right" | "justify";
    };
    parceria: {
      badge: string;
      title: string;
      text: string;
      image: string;
      titleSize?: number;
      titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number;
      textAlign?: "left" | "center" | "right" | "justify";
    };
    beneficios: { items: { icon: string; label: string }[] };
    solucoes: {
      title: string;
      titleSize?: number;
      titleAlign?: "left" | "center" | "right" | "justify";
      items: {
        id: string;
        image: string;
        name: string;
        resumo: string;
        ctaLabel: string;
        ctaHref: string;
        galeria?: string[];
      }[];
    };
    cta: {
      title: string;
      text: string;
      ctaLabel: string;
      ctaHref: string;
      titleSize?: number;
      titleAlign?: "left" | "center" | "right" | "justify";
      textSize?: number;
      textAlign?: "left" | "center" | "right" | "justify";
    };
    form: {
      title: string;
      subtitle: string;
      ctaLabel: string;
      lgpdLabel: string;
      successMessage: string;
      webhookUrl?: string;
    };
    footer: {
      text: string;
      linksTitle: string;
      quickLinks: { label: string; href: string }[];
      contactTitle: string;
      phone: string;
      email: string;
      address: string;
      social: { linkedin?: string; instagram?: string };
      copyright: string;
    };
  };
};


export const defaultContent: SiteContent = {
  institucional: {
    hero: {
      banners: [
        {
          id: "inst-1",
          title: "Uma instituição construída sobre governança, responsabilidade e visão de longo prazo.",
          subtitle: "O Premiatto nasceu com o propósito de estruturar operações sustentáveis, apoiadas por critérios técnicos, análise rigorosa e compromisso com relações empresariais duradouras.",
          ctaLabel: "Conheça nossa trajetória",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
        },
      ],
      animation: "fade",
      interval: 5000,
    },
    historia: {
      title: "Nossa História",
      text: "Fundado em 2021, o Premiatto surgiu a partir da experiência acumulada ao longo de décadas nos mercados financeiro, segurador e tributário.\\n\\nDesde sua criação, a instituição tem como objetivo construir estruturas sólidas sustentadas por governança, segurança jurídica e responsabilidade técnica.\\n\\nMais do que acompanhar operações, buscamos participar da construção de relações empresariais sustentáveis e de longo prazo.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    },
    hoje: {
      title: "Uma estrutura construída para gerar confiança.",
      text: "Nossa atuação é baseada em processos estruturados, análise criteriosa e acompanhamento contínuo. Contamos com uma equipe de especialistas dedicados a entender a complexidade de cada negócio.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
    },
    orientacao: {
      title: "O que nos orienta",
      proposito: {
        title: "Nosso Propósito",
        text: "Estruturar operações com responsabilidade, segurança e rigor técnico.",
      },
      visao: {
        title: "Nossa Visão",
        text: "Ser reconhecida como uma instituição de referência pela qualidade de suas análises e pela confiança construída ao longo do tempo.",
      },
      principios: {
        title: "Nossos Princípios",
        items: [
          "Governança",
          "Responsabilidade",
          "Transparência",
          "Compromisso",
          "Continuidade",
          "Relacionamentos de longo prazo",
        ],
      },
    },
    pensamento: {
      title: "Cada operação é tratada como um projeto individual.",
      text: "Não acreditamos em soluções genéricas. Acreditamos que cada empresa possui uma realidade própria e exige uma análise compatível com seus objetivos, riscos e necessidades.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    },
    organizacional: {
      text: "A integração entre áreas especializadas permite decisões mais consistentes e alinhadas aos critérios institucionais do Premiatto.",
      items: [
        {
          label: "Presidência",
          children: [
            { label: "Comercial" },
            { label: "Compliance" },
            { label: "Jurídico" },
            { label: "Financeiro" },
            { label: "Gestão" },
          ],
        },
      ],
    },
    lideranca: {
      name: "Rogério Melo",
      role: "Presidente e CEO",
      bio: "Profissional com mais de 30 anos de atuação nos mercados financeiro, segurador, tributário e de estruturação empresarial. Atuação baseada em governança, responsabilidade técnica e visão estratégica de longo prazo.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
      positions: [
        "Vice-Presidente da COFIN",
        "Conselheiro da UBOTS",
        "Atuação junto ao mercado bancário nacional",
        "Participação em projetos para entidades financeiras e bancárias",
      ],
    },
    diferenciais: [
      "Governança",
      "Compliance",
      "Análise Técnica",
      "Segurança Jurídica",
      "Transparência",
      "Acompanhamento Contínuo",
    ],
    manifesto: {
      text: "Não acreditamos em decisões apressadas. Acreditamos em análise. Acreditamos em responsabilidade. Acreditamos que relações empresariais sólidas são construídas sobre confiança, governança e compromisso. Estruturas sustentáveis não surgem por acaso. Elas são construídas.",
    },
    ctaFinal: {
      title: "Vamos conversar.",
      text: "Conheça a estrutura institucional do Premiatto e descubra como podemos apoiar sua empresa.",
      ctaLabel: "Solicitar análise",
      image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1600&q=80",
    },
    typography: {},
  },

  branding: {
    primaryColor: "#001B3D", // Navy
    secondaryColor: "#C5A059", // Gold/Tan
    logoHeight: 40,
  },
  navigation: {
    links: [
      { label: "Institucional", href: "/institucional" },
      { label: "Garantias", href: "/garantias" },
      { label: "Premiatto Capital", href: "#" },
      { label: "Governança", href: "/governanca" },
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
    institucional: true,
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
    { id: "1", title: "Garantia Judicial", description: "Substituição de depósitos judiciais e garantia de execuções fiscais.", link: "/garantias/1", icon: "scale", columns: 5 },
    { id: "2", title: "Garantia Contratual", description: "Assegura o cumprimento de obrigações em contratos públicos ou privados.", link: "/garantias/2", icon: "file" },
    { id: "3", title: "Garantia para Licitações", description: "Garante a assinatura do contrato e a manutenção da proposta no certame.", link: "/garantias/3", icon: "gavel" },
    { id: "4", title: "Garantia Aduaneira", description: "Garante o pagamento de tributos em operações de importação e exportação.", link: "/garantias/4", icon: "globe" },
    { id: "5", title: "Garantia Imobiliária", description: "Proteção para empreendimentos, permutas e contratos de construção.", link: "/garantias/5", icon: "building" },
    { id: "6", title: "Garantia de Parcelamento Fiscal", description: "Garante o pagamento de débitos fiscais parcelados junto à União.", link: "/garantias/6", icon: "file-check" },
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
  governancaPage: {
    hero: {
      title: "Governança que sustenta decisões consistentes.",
      subtitle: "A atuação do Premiatto é fundamentada em critérios técnicos, processos estruturados e mecanismos de controle que contribuem para a segurança e sustentabilidade das operações.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
      titleSize: 56, titleAlign: "left",
      subtitleSize: 14, subtitleAlign: "left",
    },
    intro: {
      badge: "O QUE ENTENDEMOS POR GOVERNANÇA",
      title: "Decisões responsáveis exigem estrutura, clareza e responsabilidade.",
      text: "Governança não se resume a processos internos. Representa a capacidade de tomar decisões responsáveis, equilibrando análise, transparência e gestão de riscos em cada etapa da operação.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
      titleSize: 32, titleAlign: "left",
      textSize: 14, textAlign: "left",
    },
    processo: {
      badge: "COMO TOMAMOS DECISÕES",
      steps: [
        { number: "01", title: "Diagnóstico", description: "Compreensão profunda da realidade, objetivos e riscos envolvidos." },
        { number: "02", title: "Análise", description: "Avaliação técnica, econômica, jurídica e de riscos da operação." },
        { number: "03", title: "Validação", description: "Confronto de informações e validação dos critérios adotados." },
        { number: "04", title: "Estruturação", description: "Desenho da solução mais adequada e alinhada aos objetivos da operação." },
        { number: "05", title: "Acompanhamento", description: "Monitoramento contínuo e revisão de hipóteses e condições." },
      ],
      titleSize: 16, descriptionSize: 13, itemAlign: "center",
    },
    riscos: {
      badge: "GESTÃO DE RISCOS",
      title: "Riscos existem. Gestão reduz incertezas.",
      text: "A gestão de riscos é parte integrante da cultura do Premiatto. Buscamos identificar, avaliar e monitorar fatores que possam impactar a segurança, a continuidade e a entrega de valor em cada operação.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
      titleSize: 36, titleAlign: "left",
      textSize: 14, textAlign: "left",
    },
    principios: {
      badge: "PRINCÍPIOS QUE NORTEIAM NOSSAS DECISÕES",
      title: "",
      text: "Nossos princípios orientam comportamentos, decisões e relações. São a base da confiança que construímos todos os dias.",
      items: ["Governança", "Responsabilidade", "Transparência", "Ética", "Conformidade", "Sustentabilidade"],
      titleSize: 28, titleAlign: "left",
      textSize: 13, textAlign: "left",
    },
    ctaFinal: {
      title: "Estruturas sólidas exigem governança sólida.",
      text: "Conte com uma instituição comprometida com decisões responsáveis e relações duradouras.",
      ctaLabel: "SOLICITAR ANÁLISE",
      ctaHref: "#",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=80",
      titleSize: 36, titleAlign: "left",
      textSize: 14, textAlign: "left",
    },
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
    intranet: {
      enabled: true,
      label: "Intranet",
      url: "#",
      icon: "lock",
    },
  },
  seo: {
    globalTitle: "Garantidora Premiatto – Garantias e Soluções Financeiras",
    globalDescription: "Estrutura, capital e segurança para operações que exigem critério e continuidade. Especialistas em garantias e soluções de capital.",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    metaTags: [],
    canonicalUrl: "https://garantidorapremiatto.com.br",
    scripts: []
  },
  premiattoZeepo: {
    header: {
      logoPremiatto: "",
      logoZeepo: "",
      menu: [
        { label: "Sobre a parceria", href: "#parceria" },
        { label: "Soluções", href: "#solucoes" },
        { label: "Contato", href: "#contato" },
      ],
      ctaLabel: "SOLICITAR CONTATO",
      ctaHref: "#contato",
    },
    hero: {
      badge: "PREMIATTO LOCADORA + ZEEPO",
      title: "Tecnologia, inovação e energia para transformar o",
      titleHighlight: "agronegócio.",
      text: "A Premiatto Locadora, em parceria com a Zeepo, oferece soluções completas para empresas e produtores que desejam investir em mobilidade elétrica, eficiência operacional e sustentabilidade.",
      ctaPrimary: "Quero falar com um especialista",
      ctaPrimaryHref: "#contato",
      ctaSecondary: "Conheça a parceria",
      ctaSecondaryHref: "#parceria",
      slides: [
        { id: "s1", image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1600&q=80&auto=format&fit=crop", alt: "Trator elétrico Zeepo em lavoura moderna" },
        { id: "s2", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop", alt: "Equipamentos agrícolas elétricos" },
        { id: "s3", image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1600&q=80&auto=format&fit=crop", alt: "Carregadores industriais" },
        { id: "s4", image: "https://images.unsplash.com/photo-1581092919535-6c3f6e0f3d7f?w=1600&q=80&auto=format&fit=crop", alt: "Equipe técnica realizando entrega" },
        { id: "s5", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop", alt: "Máquinas elétricas em operação" },
      ],
      interval: 5000,
      titleSize: 56, titleAlign: "left",
      textSize: 15, textAlign: "left",
    },
    parceria: {
      badge: "SOBRE A PARCERIA",
      title: "Uma parceria construída para o futuro.",
      text: "A união entre a solidez financeira da Premiatto Locadora e a tecnologia da Zeepo cria novas possibilidades para aquisição, locação e implantação de soluções elétricas para o agronegócio e empresas.",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80&auto=format&fit=crop",
      titleSize: 40, titleAlign: "left",
      textSize: 15, textAlign: "left",
    },
    beneficios: {
      items: [
        { icon: "cpu", label: "Tecnologia nacional" },
        { icon: "trending-down", label: "Baixo custo operacional" },
        { icon: "zap", label: "Alta eficiência" },
        { icon: "wrench", label: "Baixa manutenção" },
        { icon: "settings", label: "Soluções personalizadas" },
        { icon: "headphones", label: "Atendimento consultivo" },
      ],
    },
    solucoes: {
      title: "Conheça algumas soluções Zeepo",
      titleSize: 36, titleAlign: "center",
      items: [
        { id: "sol1", image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80&auto=format&fit=crop", name: "Trator Elétrico TR25-E", resumo: "Alta performance com zero emissão para lavouras modernas.", ctaLabel: "Saiba mais", ctaHref: "#contato" },
        { id: "sol2", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80&auto=format&fit=crop", name: "Equipamentos Agrícolas", resumo: "Linha completa de implementos elétricos.", ctaLabel: "Saiba mais", ctaHref: "#contato" },
        { id: "sol3", image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&q=80&auto=format&fit=crop", name: "Estações de Carregamento", resumo: "Infraestrutura industrial para operação contínua.", ctaLabel: "Saiba mais", ctaHref: "#contato" },
      ],
    },
    cta: {
      title: "Quer levar inovação para sua empresa?",
      text: "Nossa equipe está preparada para apresentar a melhor solução para sua necessidade.",
      ctaLabel: "Solicitar atendimento",
      ctaHref: "#contato",
      titleSize: 40, titleAlign: "center",
      textSize: 16, textAlign: "center",
    },
    form: {
      title: "Fale com um especialista",
      subtitle: "Preencha o formulário e nossa equipe entrará em contato com as melhores condições para você.",
      ctaLabel: "QUERO RECEBER UMA PROPOSTA",
      lgpdLabel: "Li e concordo com a Política de Privacidade.",
      successMessage: "Recebemos seu contato! Em breve nossa equipe entrará em contato.",
      webhookUrl: "",
    },
    footer: {
      text: "Soluções financeiras inteligentes para aquisição de equipamentos e impulsionamento do agro.",
      linksTitle: "Links rápidos",
      quickLinks: [
        { label: "Sobre a parceria", href: "#parceria" },
        { label: "Soluções", href: "#solucoes" },
        { label: "Contato", href: "#contato" },
      ],
      contactTitle: "Contato",
      phone: "+55 11 3030-6200",
      email: "contato@premiattolocadora.com.br",
      address: "São Paulo – SP",
      social: { linkedin: "#", instagram: "#" },
      copyright: "© 2026 Premiatto Locadora. Todos os direitos reservados.",
    },
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
      modules: { ...defaultContent.modules, ...data.modules },
      seo: { ...defaultContent.seo, ...data.seo },
      footer: { ...defaultContent.footer, ...data.footer, intranet: { ...defaultContent.footer.intranet!, ...(data.footer?.intranet || {}) } },
      governancaPage: data.governancaPage ? {
        ...defaultContent.governancaPage,
        ...data.governancaPage,
        hero: { ...defaultContent.governancaPage.hero, ...(data.governancaPage.hero || {}) },
        intro: { ...defaultContent.governancaPage.intro, ...(data.governancaPage.intro || {}) },
        processo: { ...defaultContent.governancaPage.processo, ...(data.governancaPage.processo || {}) },
        riscos: { ...defaultContent.governancaPage.riscos, ...(data.governancaPage.riscos || {}) },
        principios: { ...defaultContent.governancaPage.principios, ...(data.governancaPage.principios || {}) },
        ctaFinal: { ...defaultContent.governancaPage.ctaFinal, ...(data.governancaPage.ctaFinal || {}) },
      } : defaultContent.governancaPage,
      premiattoZeepo: data.premiattoZeepo ? {
        ...defaultContent.premiattoZeepo,
        ...data.premiattoZeepo,
        header: { ...defaultContent.premiattoZeepo.header, ...(data.premiattoZeepo.header || {}) },
        hero: { ...defaultContent.premiattoZeepo.hero, ...(data.premiattoZeepo.hero || {}) },
        parceria: { ...defaultContent.premiattoZeepo.parceria, ...(data.premiattoZeepo.parceria || {}) },
        beneficios: { ...defaultContent.premiattoZeepo.beneficios, ...(data.premiattoZeepo.beneficios || {}) },
        solucoes: { ...defaultContent.premiattoZeepo.solucoes, ...(data.premiattoZeepo.solucoes || {}) },
        cta: { ...defaultContent.premiattoZeepo.cta, ...(data.premiattoZeepo.cta || {}) },
        form: { ...defaultContent.premiattoZeepo.form, ...(data.premiattoZeepo.form || {}) },
        footer: { ...defaultContent.premiattoZeepo.footer, ...(data.premiattoZeepo.footer || {}) },
      } : defaultContent.premiattoZeepo,
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

