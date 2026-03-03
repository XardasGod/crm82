import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { InView } from "@/components/InView";
import { articles } from "@/data/articles";
import { ArrowRight, MessageSquare, Phone, BarChart3, Globe, Bot, Plug } from "lucide-react";

const integrationCategories = [
  {
    title: "Мессенджеры",
    description: "Подключите популярные мессенджеры к amoCRM — переписка с клиентами прямо из CRM",
    icon: MessageSquare,
    slugs: [
      "integratsiya-amocrm-whatsapp",
      "integratsiya-amocrm-telegram",
      "integratsiya-amocrm-max",
      "integratsiya-amocrm-instagram",
      "integratsiya-amocrm-wazzup",
    ],
  },
  {
    title: "Телефония",
    description: "IP-телефония для amoCRM — запись звонков, маршрутизация, аналитика",
    icon: Phone,
    slugs: ["integratsiya-amocrm-sipuni"],
    serviceLink: { href: "/telephony", label: "Подробнее об услуге телефонии" },
  },
  {
    title: "Маркетплейсы и лидогенерация",
    description: "Автоматический захват заявок с площадок и сайтов",
    icon: Globe,
    slugs: [
      "integratsiya-amocrm-avito",
      "integratsiya-amocrm-sajt",
    ],
  },
  {
    title: "Аналитика и маркетинг",
    description: "Сквозная аналитика и ROI каждого рекламного канала",
    icon: BarChart3,
    slugs: [
      "integratsiya-amocrm-yandex-metrika",
      "integratsiya-amocrm-roistat",
    ],
  },
  {
    title: "Обучение и вебинары",
    description: "Автоматизация работы с участниками вебинаров и учениками онлайн-курсов",
    icon: Plug,
    slugs: [
      "integratsiya-amocrm-bizon365",
      "integratsiya-amocrm-getcourse",
    ],
  },
  {
    title: "Автоматизация",
    description: "Чат-боты и автоматические сценарии внутри amoCRM",
    icon: Bot,
    slugs: ["nastrojka-chat-bota-amocrm"],
    serviceLink: { href: "/automation", label: "Подробнее об автоматизации" },
  },
];

const articlesBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
    { "@type": "ListItem", position: 2, name: "Интеграции amoCRM", item: "https://crm82.tech/integrations" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Интеграции amoCRM",
  provider: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
  description: "Подключаем amoCRM к мессенджерам, телефонии, маркетплейсам, аналитике и другим сервисам. Более 13 готовых интеграций для автоматизации продаж.",
  areaServed: { "@type": "Country", name: "Россия" },
  url: "https://crm82.tech/integrations",
};

const IntegrationsPage = () => {
  useEffect(() => {
    document.title = "Интеграции amoCRM — подключение мессенджеров, телефонии, аналитики | CRM82";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Подключаем amoCRM к WhatsApp, Telegram, Avito, Sipuni, Яндекс.Метрике и 10+ сервисам. Полный список интеграций с описанием и стоимостью настройки.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://crm82.tech/integrations");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };
    addJsonLd("ld-breadcrumb-integrations", breadcrumbSchema);
    addJsonLd("ld-service-integrations", serviceSchema);

    return () => {
      document.getElementById("ld-breadcrumb-integrations")?.remove();
      document.getElementById("ld-service-integrations")?.remove();
    };
  }, []);

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 hero-gradient">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground/90">Интеграции amoCRM</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground font-display mb-4">
            Интеграции amoCRM
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl">
            Подключаем amoCRM к мессенджерам, телефонии, маркетплейсам и аналитике. Более 13 готовых интеграций для автоматизации ваших продаж.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "13+", label: "интеграций" },
              { value: "1–2 дня", label: "средний срок подключения" },
              { value: "300+", label: "внедрений" },
              { value: "0 ₽", label: "за консультацию" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-16">
          {integrationCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const catArticles = cat.slugs.map((s) => articlesBySlug[s]).filter(Boolean);
            return (
              <InView key={idx} animation="anim-hidden-up">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display">{cat.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 ml-[52px]">{cat.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catArticles.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/blog/${article.slug}`}
                        className="group block bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <h3 className="text-base font-bold text-foreground font-display mb-2 group-hover:text-primary transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Подробнее <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    ))}
                  </div>

                  {cat.serviceLink && (
                    <div className="mt-4 ml-[52px]">
                      <Link
                        to={cat.serviceLink.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        {cat.serviceLink.label} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </InView>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30" id="integrations-form">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Нужна интеграция?
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку — подберём оптимальный набор интеграций под ваш бизнес и подключим за 1–2 дня.
            </p>
          </div>
          <LeadForm source="integrations" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IntegrationsPage;
