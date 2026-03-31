import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { ServiceFaq } from "@/components/ServiceFaq";
import { InView } from "@/components/InView";
import { getOgImageUrl } from "@/lib/og-image";
import {
  CheckCircle2, Settings, Users, BarChart3, Workflow,
  ShieldCheck, Target, Gauge, Building2, MapPin, Phone,
} from "lucide-react";

interface CityData {
  city: string;
  cityPrepositional: string; // "в Москве"
  slug: string;
  phone: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  advantages: { icon: React.ElementType; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  localBusiness: object;
}

const cities: Record<string, CityData> = {
  moscow: {
    city: "Москва",
    cityPrepositional: "в Москве",
    slug: "moscow",
    phone: "+7 (969) 777-36-72",
    metaTitle: "Внедрение amoCRM в Москве — настройка CRM под ключ | CRM82",
    metaDescription: "Профессиональное внедрение и настройка amoCRM в Москве. Аудит бизнес-процессов, автоматизация продаж, обучение команды. Опыт 200+ проектов.",
    heroTitle: "Внедрение amoCRM в Москве",
    heroSubtitle: "Настраиваем CRM-систему для московского бизнеса: от стартапов до крупных компаний. Знаем специфику столичного рынка и высокой конкуренции.",
    aboutText: "Москва — крупнейший бизнес-хаб России, где скорость обработки лидов решает всё. Мы помогаем московским компаниям выстроить системные продажи через amoCRM: автоматизируем обработку заявок из Яндекс.Директ, VK Ads, социальных сетей и мессенджеров. Наши клиенты в Москве увеличивают конверсию в среднем на 35% за первые 3 месяца работы.",
    advantages: [
      { icon: Target, title: "Быстрая обработка лидов", desc: "В Москве скорость ответа критична — настраиваем автоматическое распределение заявок за секунды" },
      { icon: BarChart3, title: "Аналитика по каналам", desc: "Отслеживаем эффективность каждого рекламного канала в разрезе ROI" },
      { icon: Gauge, title: "Масштабирование отдела продаж", desc: "Система растёт вместе с вашей командой — от 2 до 200+ менеджеров" },
    ],
    faqs: [
      { q: "Работаете ли вы с офисом или удалённо?", a: "Мы работаем удалённо по всей Москве и МО. Все встречи проводим через Яндекс Телемост. При необходимости возможен выезд в офис для обучения команды." },
      { q: "Сколько стоит внедрение amoCRM в Москве?", a: "Стоимость зависит от сложности процессов и количества интеграций. Базовая настройка — от 45 000 ₽, полное внедрение с автоматизацией — от 90 000 ₽." },
      { q: "Какие сроки внедрения?", a: "Стандартное внедрение занимает 5-14 рабочих дней. Сложные проекты с кастомными интеграциями — до 30 дней." },
      { q: "Работаете ли вы с крупными компаниями?", a: "Да, у нас есть опыт внедрения для компаний с отделом продаж от 50+ менеджеров и сложными бизнес-процессами." },
    ],
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "CRM82 — Внедрение amoCRM в Москве",
      "description": "Профессиональное внедрение и настройка amoCRM в Москве. Автоматизация продаж, интеграции, обучение команды.",
      "url": "https://crm82.tech/moscow",
      "telephone": "+7 (969) 777-36-72",
      "address": { "@type": "PostalAddress", "addressLocality": "Москва", "addressCountry": "RU" },
      "areaServed": { "@type": "City", "name": "Москва" },
      "priceRange": "₽₽",
      "openingHours": "Mo-Fr 09:00-18:00",
    },
  },
  "saint-petersburg": {
    city: "Санкт-Петербург",
    cityPrepositional: "в Санкт-Петербурге",
    slug: "saint-petersburg",
    phone: "+7 (969) 777-36-72",
    metaTitle: "Внедрение amoCRM в Санкт-Петербурге — настройка CRM под ключ | CRM82",
    metaDescription: "Внедрение и настройка amoCRM в Санкт-Петербурге. Автоматизация продаж, интеграции с телефонией и мессенджерами, обучение команды.",
    heroTitle: "Внедрение amoCRM в Санкт-Петербурге",
    heroSubtitle: "Помогаем петербургскому бизнесу систематизировать продажи и увеличить конверсию с помощью amoCRM.",
    aboutText: "Санкт-Петербург — второй по величине бизнес-центр России с развитой IT-инфраструктурой. Мы помогаем петербургским компаниям из сфер услуг, торговли, недвижимости и IT выстроить прозрачную систему продаж. Автоматизируем сбор лидов с сайтов, Авито, соцсетей. Интегрируем CRM с популярными в Петербурге сервисами телефонии и мессенджерами.",
    advantages: [
      { icon: Target, title: "Интеграции под ваш рынок", desc: "Подключаем Авито, ЦИАН, локальные площадки и все популярные каналы коммуникации" },
      { icon: BarChart3, title: "Контроль удалённых команд", desc: "Настраиваем CRM для гибридного формата работы — офис + удалёнка" },
      { icon: Gauge, title: "Сезонное управление продажами", desc: "Учитываем сезонность петербургского рынка при построении воронок" },
    ],
    faqs: [
      { q: "Вы находитесь в Санкт-Петербурге?", a: "Мы работаем удалённо по всей России, включая Санкт-Петербург и Ленинградскую область. Все коммуникации через Яндекс Телемост и мессенджеры." },
      { q: "Какие отрасли в Петербурге вы обслуживаете?", a: "У нас есть опыт работы с недвижимостью, IT-компаниями, образовательными проектами, сферой услуг и e-commerce в Санкт-Петербурге." },
      { q: "Можно ли интегрировать amoCRM с ЦИАН и Авито?", a: "Да, мы настраиваем автоматический импорт заявок с ЦИАН, Авито, Юлы и других площадок прямо в amoCRM." },
      { q: "Есть ли техподдержка после внедрения?", a: "Да, мы предоставляем гарантийный период поддержки и возможность продлённого сопровождения по подписке." },
    ],
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "CRM82 — Внедрение amoCRM в Санкт-Петербурге",
      "description": "Внедрение и настройка amoCRM в Санкт-Петербурге. Автоматизация продаж, интеграции, обучение.",
      "url": "https://crm82.tech/saint-petersburg",
      "telephone": "+7 (969) 777-36-72",
      "address": { "@type": "PostalAddress", "addressLocality": "Санкт-Петербург", "addressCountry": "RU" },
      "areaServed": { "@type": "City", "name": "Санкт-Петербург" },
      "priceRange": "₽₽",
      "openingHours": "Mo-Fr 09:00-18:00",
    },
  },
  tyumen: {
    city: "Тюмень",
    cityPrepositional: "в Тюмени",
    slug: "tyumen",
    phone: "+7 (969) 777-36-72",
    metaTitle: "Внедрение amoCRM в Тюмени — настройка CRM под ключ | CRM82",
    metaDescription: "Внедрение и настройка amoCRM в Тюмени. Автоматизация продаж для нефтегазовой отрасли, строительства, услуг. Обучение команды.",
    heroTitle: "Внедрение amoCRM в Тюмени",
    heroSubtitle: "Настраиваем CRM-систему для тюменского бизнеса с учётом специфики регионального рынка и отраслевых особенностей.",
    aboutText: "Тюмень — один из самых динамично развивающихся городов России с мощным бизнес-сообществом. Мы помогаем тюменским компаниям из нефтегазового сектора, строительства, сферы услуг и торговли выстроить эффективную систему продаж. Автоматизируем полный цикл работы с клиентами: от первого звонка до повторных продаж и рекомендаций.",
    advantages: [
      { icon: Target, title: "Отраслевая экспертиза", desc: "Знаем специфику нефтегазовой отрасли, строительства и B2B-продаж в Тюменском регионе" },
      { icon: BarChart3, title: "Длинные сделки под контролем", desc: "Настраиваем воронки для сделок с циклом от 1 до 12 месяцев" },
      { icon: Gauge, title: "Региональный подход", desc: "Учитываем часовой пояс, локальные каналы привлечения и особенности рынка" },
    ],
    faqs: [
      { q: "Работаете ли вы с компаниями из Тюмени удалённо?", a: "Да, мы работаем удалённо по всей России. Тюмень — один из ключевых регионов нашей работы. Все встречи через Яндекс Телемост." },
      { q: "Есть ли опыт работы с нефтегазовой отраслью?", a: "Да, мы настраивали amoCRM для компаний нефтесервисного сектора с длинными циклами сделок и сложными тендерными процессами." },
      { q: "Сколько стоит внедрение для малого бизнеса в Тюмени?", a: "Базовая настройка amoCRM для малого бизнеса — от 35 000 ₽. Включает воронку продаж, базовые интеграции и обучение." },
      { q: "Учитываете ли вы разницу во времени?", a: "Конечно! Мы планируем все звонки и обучение с учётом тюменского времени (UTC+5). Обычно работаем с 11:00 до 20:00 по Тюмени." },
    ],
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "CRM82 — Внедрение amoCRM в Тюмени",
      "description": "Внедрение и настройка amoCRM в Тюмени. Автоматизация продаж, интеграции, обучение для регионального бизнеса.",
      "url": "https://crm82.tech/tyumen",
      "telephone": "+7 (969) 777-36-72",
      "address": { "@type": "PostalAddress", "addressLocality": "Тюмень", "addressCountry": "RU" },
      "areaServed": { "@type": "City", "name": "Тюмень" },
      "priceRange": "₽₽",
      "openingHours": "Mo-Fr 09:00-18:00",
    },
  },
};

const steps = [
  { icon: Settings, title: "Аудит процессов", desc: "Анализируем текущие бизнес-процессы и находим точки роста" },
  { icon: Workflow, title: "Проектирование воронок", desc: "Создаём структуру CRM под вашу специфику" },
  { icon: Building2, title: "Настройка и интеграции", desc: "Настраиваем amoCRM и подключаем все каналы" },
  { icon: Users, title: "Обучение команды", desc: "Обучаем менеджеров и руководителей работе в CRM" },
  { icon: ShieldCheck, title: "Поддержка", desc: "Сопровождаем после запуска и корректируем настройки" },
];

interface CityPageContentProps {
  citySlug: string;
}

const CityPageContent = ({ citySlug }: CityPageContentProps) => {
  const data = cities[citySlug];

  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", data.metaDescription);
    setMeta("property", "og:title", data.metaTitle);
    setMeta("property", "og:description", data.metaDescription);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", getOgImageUrl(data.heroTitle, data.city, "Город"));

    const link = document.querySelector("link[rel='canonical']") as HTMLLinkElement || (() => {
      const l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); return l;
    })();
    link.href = `https://crm82.tech/${data.slug}`;

    const addJsonLd = (id: string, obj: object) => {
      document.getElementById(id)?.remove();
      const s = document.createElement("script");
      s.id = id; s.type = "application/ld+json"; s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };

    addJsonLd("ld-city-business", data.localBusiness);
    addJsonLd("ld-city-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://crm82.tech/" },
        { "@type": "ListItem", "position": 2, "name": `amoCRM ${data.cityPrepositional}`, "item": `https://crm82.tech/${data.slug}` },
      ],
    });
    addJsonLd("ld-city-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    });

    return () => {
      document.getElementById("ld-city-business")?.remove();
      document.getElementById("ld-city-breadcrumb")?.remove();
      document.getElementById("ld-city-faq")?.remove();
    };
  }, [data]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Город не найден</div>;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <InView animation="anim-hidden-up">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{data.city}, Россия</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 font-display leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#form" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors text-lg">
                Получить консультацию
              </a>
              <a href="tel:+79697773672" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors text-lg">
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            </div>
          </InView>
        </div>
      </section>

      {/* About city */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <InView animation="anim-hidden-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 font-display">
              amoCRM для бизнеса {data.cityPrepositional}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.aboutText}
            </p>
          </InView>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Почему выбирают нас {data.cityPrepositional}
            </h2>
          </InView>
          <div className="grid md:grid-cols-3 gap-8">
            {data.advantages.map((a, i) => (
              <InView key={i} animation="anim-hidden-up" className={`anim-delay-${i + 1}`}>
                <div className="bg-card rounded-2xl p-8 card-shadow h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <a.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{a.title}</h3>
                  <p className="text-muted-foreground">{a.desc}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Как мы работаем
            </h2>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <InView key={i} animation="anim-hidden-up" className={`anim-delay-${i + 1}`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">Шаг {i + 1}</div>
                  <h3 className="font-bold text-card-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="py-16 md:py-24 bg-muted/50" id="form">
        <div className="container mx-auto px-4 max-w-2xl">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Получите бесплатную консультацию
            </h2>
            <p className="text-muted-foreground text-lg">
              Расскажем, как amoCRM поможет вашему бизнесу {data.cityPrepositional}
            </p>
          </InView>
          <LeadForm source={`geo-${data.slug}`} />
        </div>
      </section>

      {/* FAQ */}
      <ServiceFaq faqs={data.faqs} title={`Вопросы о внедрении amoCRM ${data.cityPrepositional}`} />

      <Footer />
    </main>
  );
};

export const MoscowPage = () => <CityPageContent citySlug="moscow" />;
export const SaintPetersburgPage = () => <CityPageContent citySlug="saint-petersburg" />;
export const TyumenPage = () => <CityPageContent citySlug="tyumen" />;

export default CityPageContent;
