import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import { getOgImageUrl } from "@/lib/og-image";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Bot, MessageSquare, Mail,
  Workflow, Repeat, Clock, TrendingUp, Zap, BellRing,
} from "lucide-react";

const automations = [
  { name: "Автозадачи", icon: Clock, description: "Автоматическое создание задач менеджерам при переходе сделки на новый этап.", features: ["По этапам воронки", "С дедлайнами", "С ответственными"] },
  { name: "Авторассылки", icon: Mail, description: "Автоматическая отправка email и SMS клиентам на определённых этапах.", features: ["Email", "SMS", "По триггерам"] },
  { name: "Чат-боты", icon: Bot, description: "Автоответчики в мессенджерах и на сайте для квалификации лидов 24/7.", features: ["WhatsApp", "Telegram", "Виджет на сайте"] },
  { name: "Digital Pipeline", icon: Workflow, description: "Автоматическое продвижение сделок по воронке на основе действий клиента.", features: ["Автопродвижение", "Условия", "Мульти-воронки"] },
  { name: "Уведомления", icon: BellRing, description: "Мгновенные оповещения руководителю о просроченных задачах и зависших сделках.", features: ["Telegram-бот", "Email", "В amoCRM"] },
  { name: "Интеграции", icon: Repeat, description: "Связываем amoCRM с 1С, сайтом, мессенджерами, рекламой и другими сервисами.", features: ["1С", "Сайт", "Мессенджеры"] },
];

const benefits = [
  { icon: Zap, title: "Экономия 2+ часа в день", description: "Автоматизация рутины освобождает время менеджеров для продаж" },
  { icon: TrendingUp, title: "Рост конверсии до 40%", description: "Автоматические касания не дают клиентам «остыть»" },
  { icon: MessageSquare, title: "Ответ за 30 секунд", description: "Чат-боты мгновенно отвечают клиентам в нерабочее время" },
];

const AutomationPage = () => {
  useEffect(() => {
    document.title = "Автоматизация продаж в amoCRM — настройка автоворонок | CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Автоматизация продаж в amoCRM: автозадачи, авторассылки, чат-боты, Digital Pipeline. Экономия 2+ часов в день, рост конверсии до 40%.");
    setMeta("property", "og:title", "Автоматизация продаж в amoCRM — CRM82");
    setMeta("property", "og:description", "Настраиваем автоворонки, чат-боты и автозадачи в amoCRM. Экономия времени и рост продаж.");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", getOgImageUrl("Автоматизация продаж в amoCRM", "Автоворонки, чат-боты, автозадачи", "Автоматизация"));

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.id = id; s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    };

    addJsonLd("ld-breadcrumb-automation", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Автоматизация продаж", item: "https://crm82.tech/automation" },
      ],
    });

    addJsonLd("ld-service-automation", {
      "@context": "https://schema.org", "@type": "Service",
      name: "Автоматизация продаж в amoCRM",
      description: "Настройка автоворонок, чат-ботов, автозадач и авторассылок в amoCRM для увеличения продаж.",
      provider: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
      areaServed: "RU",
      serviceType: "Sales Automation",
    });

    addJsonLd("ld-faq-automation", {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Что можно автоматизировать в amoCRM?", acceptedAnswer: { "@type": "Answer", text: "Автозадачи, авторассылки (email, SMS), чат-боты в мессенджерах, Digital Pipeline, уведомления руководителю, интеграции с 1С, сайтом и другими сервисами." } },
        { "@type": "Question", name: "Насколько автоматизация увеличивает продажи?", acceptedAnswer: { "@type": "Answer", text: "По нашему опыту, автоматизация процессов в amoCRM увеличивает конверсию до 40% и экономит менеджерам более 2 часов в день за счёт устранения рутинных операций." } },
        { "@type": "Question", name: "Можно ли подключить чат-бота к WhatsApp и Telegram?", acceptedAnswer: { "@type": "Answer", text: "Да, мы настраиваем чат-ботов для WhatsApp, Telegram и виджета на сайте. Боты квалифицируют лидов, отвечают на частые вопросы и передают горячих клиентов менеджерам." } },
        { "@type": "Question", name: "Как быстро окупается автоматизация?", acceptedAnswer: { "@type": "Answer", text: "Обычно автоматизация окупается в первый месяц за счёт сокращения потерь лидов и увеличения скорости обработки заявок." } },
      ],
    });

    return () => {
      document.getElementById("ld-breadcrumb-automation")?.remove();
      document.getElementById("ld-service-automation")?.remove();
      document.getElementById("ld-faq-automation")?.remove();
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
              Автоматизация
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Автоматизация <span className="text-gradient">продаж</span> в amoCRM
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Настраиваем автоворонки, чат-боты и автозадачи — менеджеры занимаются продажами, а не рутиной.
            </p>
            <a href="#automation-form" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Что автоматизируем</h2>
            <p className="text-muted-foreground text-lg">Полный спектр автоматизации продаж в amoCRM</p>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automations.map((a, i) => (
              <InView key={a.name} animation="anim-hidden" className={`bg-card rounded-xl p-5 card-shadow hover:shadow-lg transition-shadow anim-delay-${Math.min(i + 1, 6)}`}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <a.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{a.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3">{a.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.features.map((f) => (
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

      <section id="automation-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">Автоматизировать продажи</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — покажем, что можно автоматизировать в вашем бизнесе</p>
          </InView>
          <LeadForm title="Нужна автоматизация продаж?" subtitle="Оставьте заявку — разберём ваши процессы и предложим решение" source="automation" buttonText="Оставить заявку" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AutomationPage;
