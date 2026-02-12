import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Brain, Mic, BarChart3,
  ShieldCheck, Users, MessageSquareWarning, Target, TrendingUp,
  Search, Megaphone, HeadphonesIcon,
} from "lucide-react";

const features = [
  { icon: Mic, title: "Расшифровка звонков", description: "Мгновенная транскрибация звонков в текст прямо в карточке сделки amoCRM" },
  { icon: MessageSquareWarning, title: "Выявление проблем", description: "ИИ автоматически находит конфликты, негатив и ошибки менеджеров без прослушивания" },
  { icon: Brain, title: "Рекомендации ИИ", description: "Автоматические рекомендации для менеджеров по улучшению качества коммуникации" },
  { icon: BarChart3, title: "Извлечение данных", description: "Извлечение ключевых данных из разговора и запись в поля amoCRM" },
];

const useCases = [
  {
    icon: ShieldCheck,
    title: "Отдел контроля качества на ИИ",
    description: "Замените ручное прослушивание звонков автоматическим анализом. ИИ проверяет каждый звонок на соответствие скриптам, выявляет грубость, конфликты и отклонения от стандартов обслуживания. Руководитель получает отчёт, а не тратит часы на прослушку.",
    points: [
      "Автоматическая проверка 100% звонков, а не выборочных",
      "Уведомления руководителю о критичных разговорах",
      "Оценка каждого менеджера по качеству коммуникации",
      "Контроль следования скриптам продаж",
    ],
  },
  {
    icon: Search,
    title: "Автоанализ звонков и выявление «косяков»",
    description: "ИИ анализирует эмоциональную окраску, находит проблемные паттерны в общении менеджеров: перебивание клиента, агрессивный тон, незнание продукта, пропуск ключевых этапов продажи.",
    points: [
      "Детекция конфликтных ситуаций в реальном времени",
      "Выявление слабых мест в навыках каждого менеджера",
      "Анализ причин потерянных сделок",
      "Автоматические рекомендации по улучшению",
    ],
  },
  {
    icon: Target,
    title: "Анализ целевой аудитории и сбор частых вопросов",
    description: "Используйте данные из реальных разговоров для глубокого понимания вашей ЦА. ИИ собирает частые вопросы, боли и потребности клиентов — готовая база для маркетинга.",
    points: [
      "Сбор и систематизация частых вопросов клиентов",
      "Выявление болей и потребностей ЦА из живых диалогов",
      "Готовые инсайты для контента в социальных сетях",
      "Данные для улучшения рекламных кампаний и офферов",
    ],
  },
  {
    icon: Megaphone,
    title: "Данные для маркетинга и рекламы",
    description: "На основе анализа звонков формируйте контент-стратегию: какие боли озвучивают клиенты, какие возражения возникают, какие формулировки используют — всё это ложится в основу рекламных креативов и постов.",
    points: [
      "Реальные формулировки клиентов для рекламных текстов",
      "Частые возражения → темы для контент-маркетинга",
      "Понимание языка клиента для точного таргетинга",
      "Инсайты для доработки продукта и офферов",
    ],
  },
];

const steps = [
  { num: "01", title: "Аудит процессов", description: "Изучаем текущие процессы продаж, скрипты и задачи контроля качества" },
  { num: "02", title: "Настройка Voice AI", description: "Устанавливаем виджет, настраиваем промпты и критерии анализа под ваш бизнес" },
  { num: "03", title: "Тестирование", description: "Запускаем на реальных звонках, калибруем точность анализа и уведомления" },
  { num: "04", title: "Обучение команды", description: "Показываем руководителям и менеджерам, как работать с аналитикой" },
];

const SpeechAnalyticsPage = () => {
  useEffect(() => {
    document.title = "Внедрение речевой аналитики в amoCRM — Voice AI | CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Внедрение речевой аналитики Voice AI в amoCRM: автоанализ звонков, контроль качества на ИИ, сбор инсайтов для маркетинга. От 50 000 ₽.");
    setMeta("property", "og:title", "Речевая аналитика в amoCRM — Voice AI | CRM82");
    setMeta("property", "og:description", "ИИ-анализ звонков: выявление ошибок менеджеров, контроль качества, сбор данных о ЦА для маркетинга.");
    setMeta("property", "og:type", "website");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.id = id; s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    };

    addJsonLd("ld-breadcrumb-speech", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Речевая аналитика", item: "https://crm82.tech/speech-analytics" },
      ],
    });

    addJsonLd("ld-service-speech", {
      "@context": "https://schema.org", "@type": "Service",
      name: "Внедрение речевой аналытики Voice AI в amoCRM",
      description: "Настройка и внедрение виджета речевой аналитики на базе ИИ для amoCRM: автоанализ звонков, контроль качества, сбор данных ЦА.",
      provider: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
      areaServed: "RU",
      serviceType: "Speech Analytics Integration",
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "RUB",
        description: "Внедрение речевой аналитики (без учёта абонентской платы за токены виджета)",
      },
    });

    return () => {
      document.getElementById("ld-breadcrumb-speech")?.remove();
      document.getElementById("ld-service-speech")?.remove();
    };
  }, []);

  return (
    <main>
      <Header />

      {/* Hero */}
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
              🎙️ Речевая аналитика для amoCRM
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Внедрение <span className="text-gradient">речевой аналитики</span> в amoCRM
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-4 max-w-xl">
              Виджет Voice AI на базе искусственного интеллекта анализирует 100% звонков, выявляет ошибки менеджеров и собирает данные о клиентах — без ручного прослушивания.
            </p>
            <p className="text-primary-foreground/50 text-sm mb-8">
              Стоимость внедрения — <span className="text-primary-foreground/90 font-bold">от 50 000 ₽</span> (+ абонентская плата за токены виджета)
            </p>
            <a href="#speech-form" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
              Оставить заявку <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <InView key={f.title} animation="anim-hidden" className={`bg-card rounded-xl p-6 card-shadow anim-delay-${i + 1}`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Кейсы использования</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Как речевая аналитика решает задачи бизнеса</p>
          </InView>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((uc, i) => (
              <InView key={uc.title} animation="anim-hidden" className={`bg-card rounded-2xl p-8 card-shadow anim-delay-${Math.min(i + 1, 4)}`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <uc.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{uc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{uc.description}</p>
                <ul className="space-y-2.5">
                  {uc.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-card-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Как мы внедряем</h2>
            <p className="text-muted-foreground text-lg">Процесс настройки речевой аналитики под ваш бизнес</p>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <InView key={s.num} animation="anim-hidden" className={`relative bg-card rounded-xl p-6 card-shadow anim-delay-${i + 1}`}>
                <span className="text-5xl font-extrabold text-primary/10 absolute top-4 right-4 font-display">{s.num}</span>
                <h3 className="text-lg font-bold text-card-foreground mb-2 mt-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <HeadphonesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-card-foreground mb-3 font-display">Стоимость внедрения</h2>
              <p className="text-4xl font-extrabold text-primary mb-2">от 50 000 ₽</p>
              <p className="text-muted-foreground text-sm mb-6">
                + абонентская плата за токены виджета Voice AI (зависит от объёма звонков). 50 минут бесплатно для теста.
              </p>
              <div className="text-left space-y-2 text-sm text-card-foreground/80 max-w-md mx-auto">
                {[
                  "Аудит текущих процессов продаж",
                  "Установка и настройка виджета Voice AI",
                  "Настройка промптов и критериев анализа",
                  "Тестирование на реальных звонках",
                  "Обучение команды работе с аналитикой",
                  "Техническая поддержка после внедрения",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* Form */}
      <section id="speech-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">Внедрить речевую аналитику</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — расскажем, как Voice AI поможет вашему бизнесу</p>
          </InView>
          <LeadForm title="Хотите внедрить речевую аналитику?" subtitle="Оставьте заявку — проведём демонстрацию и подберём решение" source="speech-analytics" buttonText="Оставить заявку" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SpeechAnalyticsPage;
