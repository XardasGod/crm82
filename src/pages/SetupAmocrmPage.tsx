import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Settings, Users, BarChart3,
  Workflow, ShieldCheck, Layers, FileText, Target, Gauge,
} from "lucide-react";

const steps = [
  { icon: FileText, title: "Аудит процессов", description: "Анализируем текущие бизнес-процессы, воронки продаж и точки потери клиентов" },
  { icon: Layers, title: "Проектирование воронок", description: "Создаём структуру воронок, этапов и полей под вашу специфику" },
  { icon: Settings, title: "Настройка amoCRM", description: "Настраиваем воронки, поля, теги, права доступа и интерфейс" },
  { icon: Workflow, title: "Автоматизация", description: "Настраиваем автодействия, триггеры и шаблоны сообщений" },
  { icon: Users, title: "Обучение команды", description: "Проводим обучение сотрудников работе в CRM с записью" },
  { icon: ShieldCheck, title: "Поддержка", description: "Сопровождаем после запуска, корректируем настройки по результатам" },
];

const benefits = [
  { icon: Target, title: "Ни один лид не потеряется", description: "Все заявки автоматически фиксируются в CRM из всех источников" },
  { icon: BarChart3, title: "Прозрачная аналитика", description: "Видите конверсию на каждом этапе воронки в реальном времени" },
  { icon: Gauge, title: "Рост продаж от 30%", description: "Системный подход к продажам увеличивает конверсию и средний чек" },
];

const SetupAmocrmPage = () => {
  useEffect(() => {
    document.title = "Настройка amoCRM под ключ — внедрение CRM для бизнеса | CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Профессиональная настройка amoCRM под ключ: аудит процессов, проектирование воронок, автоматизация, обучение команды. Увеличение продаж от 30%.");
    setMeta("property", "og:title", "Настройка amoCRM под ключ — CRM82");
    setMeta("property", "og:description", "Внедряем amoCRM для бизнеса: воронки продаж, автоматизация, обучение. Рост конверсии от 30%.");
    setMeta("property", "og:type", "website");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.id = id; s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    };

    addJsonLd("ld-breadcrumb-setup", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Настройка amoCRM", item: "https://crm82.tech/setup-amocrm" },
      ],
    });

    addJsonLd("ld-service-setup", {
      "@context": "https://schema.org", "@type": "Service",
      name: "Настройка amoCRM под ключ",
      description: "Профессиональная настройка amoCRM: аудит процессов, проектирование воронок, автоматизация, обучение команды.",
      provider: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
      areaServed: "RU",
      serviceType: "CRM Implementation",
    });

    return () => {
      document.getElementById("ld-breadcrumb-setup")?.remove();
      document.getElementById("ld-service-setup")?.remove();
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
              Ключевая услуга
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Настройка <span className="text-gradient">amoCRM</span> под ключ
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Внедряем CRM-систему, которая реально работает: от аудита процессов до обучения команды и поддержки после запуска.
            </p>
            <a href="#setup-form" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Как мы настраиваем amoCRM</h2>
            <p className="text-muted-foreground text-lg">6 этапов внедрения для максимального результата</p>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <InView key={s.title} animation="anim-hidden" className={`bg-card rounded-xl p-5 card-shadow anim-delay-${i + 1}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.description}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section id="setup-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">Готовы настроить amoCRM?</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — проведём бесплатный аудит ваших процессов</p>
          </InView>
          <LeadForm title="Нужна настройка amoCRM?" subtitle="Оставьте заявку — проведём бесплатный аудит" source="setup-amocrm" buttonText="Оставить заявку" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SetupAmocrmPage;
