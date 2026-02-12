import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Phone, Headphones, PhoneCall,
  BarChart3, Globe, Voicemail, Shield, Zap,
} from "lucide-react";

const providers = [
  { name: "Sipuni", icon: Phone, description: "Облачная АТС с глубокой интеграцией в amoCRM — звонки, запись, аналитика прямо в CRM.", features: ["Интеграция с amoCRM", "Запись звонков", "Аналитика"] },
  { name: "UIS / CoMagic", icon: Globe, description: "Коллтрекинг и виртуальная АТС для анализа эффективности рекламных каналов.", features: ["Коллтрекинг", "Виртуальная АТС", "Аналитика рекламы"] },
  { name: "Mango Office", icon: Headphones, description: "Корпоративная телефония с мощной АТС, IVR и маршрутизацией вызовов.", features: ["IVR-меню", "Маршрутизация", "Запись разговоров"] },
  { name: "Билайн Бизнес", icon: PhoneCall, description: "Телефония от Билайн с интеграцией в CRM и мобильными решениями.", features: ["Мобильная связь", "Виртуальная АТС", "CRM-интеграция"] },
  { name: "МТС Exolve", icon: Voicemail, description: "Платформа коммуникаций от МТС с API для голоса, SMS и мессенджеров.", features: ["API-платформа", "SMS", "Голос"] },
  { name: "Другие АТС", icon: Shield, description: "Интегрируем любую IP-телефонию с поддержкой SIP-протокола.", features: ["SIP-протокол", "Любой провайдер", "Кастомная настройка"] },
];

const benefits = [
  { icon: Phone, title: "Звонки из CRM", description: "Менеджеры звонят в один клик прямо из карточки сделки" },
  { icon: BarChart3, title: "Аналитика звонков", description: "Видите кто звонил, сколько длился разговор, слушаете записи" },
  { icon: Zap, title: "Автоматическое создание", description: "Входящий звонок автоматически создаёт контакт и сделку в amoCRM" },
];

const TelephonyPage = () => {
  useEffect(() => {
    document.title = "Интеграция телефонии с amoCRM — подключение IP-АТС | CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Интеграция телефонии с amoCRM: Sipuni, UIS, Mango Office, Билайн, МТС. Звонки из CRM, запись разговоров, автосоздание сделок.");
    setMeta("property", "og:title", "Интеграция телефонии с amoCRM — CRM82");
    setMeta("property", "og:description", "Подключаем IP-телефонию к amoCRM. Звонки из CRM, запись, аналитика, автосоздание сделок.");
    setMeta("property", "og:type", "website");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.id = id; s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    };

    addJsonLd("ld-breadcrumb-telephony", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Интеграция телефонии", item: "https://crm82.tech/telephony" },
      ],
    });

    addJsonLd("ld-service-telephony", {
      "@context": "https://schema.org", "@type": "Service",
      name: "Интеграция телефонии с amoCRM",
      description: "Подключение IP-телефонии к amoCRM: звонки из CRM, запись разговоров, аналитика, автосоздание сделок.",
      provider: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
      areaServed: "RU",
      serviceType: "Telephony Integration",
    });

    return () => {
      document.getElementById("ld-breadcrumb-telephony")?.remove();
      document.getElementById("ld-service-telephony")?.remove();
    };
  }, []);

  return (
    <main>
      <Header />

      <section className="hero-gradient relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl anim-hero-enter">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground/90 text-sm font-medium transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Назад на главную
            </Link>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-foreground/80 text-sm font-medium mb-6 border border-primary/20">
              Телефония для amoCRM
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Интеграция <span className="text-gradient">телефонии</span> с amoCRM
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Подключаем IP-телефонию к вашей CRM — звонки в один клик, запись разговоров и автоматическое создание сделок.
            </p>
            <a href="#telephony-form" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
              Оставить заявку <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <InView key={b.title} animation="anim-hidden" className={`bg-card rounded-xl p-6 card-shadow anim-delay-${i + 1}`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Какую телефонию интегрируем</h2>
            <p className="text-muted-foreground text-lg">Работаем со всеми популярными провайдерами IP-телефонии</p>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((p, i) => (
              <InView key={p.name} animation="anim-hidden" className={`bg-card rounded-xl p-5 card-shadow hover:shadow-lg transition-shadow anim-delay-${Math.min(i + 1, 6)}`}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {f}
                    </span>
                  ))}
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section id="telephony-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">Подключить телефонию</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — подберём оптимальное решение для вашей телефонии</p>
          </InView>
          <LeadForm title="Нужна интеграция телефонии?" subtitle="Оставьте заявку — подберём провайдера и настроим" source="telephony" buttonText="Оставить заявку" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TelephonyPage;
