import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { Puzzle, ArrowRight, Play, Crown, Gift, Shuffle, Users, Palette, Webhook, EyeOff, MessageCircle, Code2, Clock, ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import { getOgImageUrl } from "@/lib/og-image";

interface Widget {
  name: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  price: string;
  installUrl: string;
  videoUrl?: string;
  free?: boolean;
}

const paidWidgets: Widget[] = [
  { name: "Распределение сделок", icon: Shuffle, description: "Распределяет сделки по менеджерам в процентном соотношении с учётом графика работы каждого менеджера.", features: ["Процентное распределение", "График работы менеджеров", "Простые настройки", "14 дней бесплатно"], price: "от 1 000 ₽/мес", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=bcc479f1-fd01-4726-a160-7094bb2f5b6d&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", videoUrl: "https://clck.ru/3LsoQW" },
  { name: "Антидубль контактов", icon: Users, description: "Работает 24/7 — сканирует всю базу и автоматически склеивает дубли контактов в фоновом режиме.", features: ["Работает 24/7", "Склеивает дубли автоматически", "Сканирование всей базы", "14 дней бесплатно"], price: "от 8 000 ₽ / 6 мес", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=9591c71c-3516-4b42-96d7-37687f499b4e&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", videoUrl: "https://clck.ru/3LsoRA" },
  { name: "Цветные сделки", icon: Palette, description: "Присваивает сделке цветовую раскраску в воронке в зависимости от значений полей. Визуально упрощает группировку.", features: ["Цвета по значениям полей", "Визуальная группировка", "14 дней бесплатно"], price: "499 ₽/мес", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=3011d1b0-65e8-4175-8a96-97cdd8e15fe9&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", videoUrl: "https://clck.ru/3LsoRQ" },
  { name: "Вебхук из карточки сделки", icon: Webhook, description: "Добавляет неограниченное количество кнопок в сделку. При нажатии отправляет webhook на произвольный URL.", features: ["Неограниченные кнопки", "Webhook на любой URL", "Интеграция с любыми системами", "14 дней бесплатно"], price: "от 1 000 ₽/мес", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=3011d1b0-65e8-4175-8a96-97cdd8e15fe9&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", videoUrl: "https://clck.ru/3LsoRd" },
  { name: "Скрытие полей", icon: EyeOff, description: "Гибкая настройка видимости полей для различных менеджеров и воронок. Управление доступом к конфиденциальным данным.", features: ["Скрытие по менеджерам", "Скрытие по воронкам", "Безопасность данных", "Интуитивная настройка"], price: "от 1 000 ₽/мес", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=b4db99d6-9623-4026-8772-dae7ed76982a&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", videoUrl: "https://clck.ru/3LsoS8" },
];

const freeWidgets: Widget[] = [
  { name: "Написать в WhatsApp", icon: MessageCircle, description: "При нажатии на телефон клиента появляется возможность перейти в диалог с ним в WhatsApp.", features: ["Переход в WA в один клик"], price: "Бесплатно", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=b1c94ed5-5402-43fd-9ec9-549e0a387a46&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", free: true },
  { name: "Кодировка полей", icon: Code2, description: "Возможность сделать любое поле в amoCRM кликабельным или цветным для удобной навигации.", features: ["Кликабельные поля", "Цветовая кодировка"], price: "Бесплатно", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=a8fee3bc-f775-455c-b7ce-edaffa56bce7&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", free: true },
  { name: "Время клиента", icon: Clock, description: "Проверяет номер телефона клиента и визуально отображает его текущее время — удобно для звонков в разные часовые пояса.", features: ["Определение часового пояса", "Визуальное отображение"], price: "Бесплатно", installUrl: "https://www.amocrm.ru/oauth?mode=popup&client_id=5747b857-4cb4-4c49-8f57-84cd46d01889&state=%7B%22redirect%22:%20true,%22widgetCode%22:%22amodistribution%22%7D", free: true },
];

const WidgetCard = ({ widget }: { widget: Widget }) => (
  <InView
    animation="anim-hidden"
    className="bg-card rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow flex flex-col h-full"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
      <widget.icon className="w-5 h-5 text-primary" />
    </div>
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-bold text-card-foreground text-lg">{widget.name}</h3>
      {widget.free ? (
        <span className="inline-flex items-center gap-1 bg-accent/20 text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
          <Gift className="w-3 h-3" /> Free
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
          <Crown className="w-3 h-3" /> PRO
        </span>
      )}
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{widget.description}</p>
    <ul className="space-y-1.5 mb-4 flex-1">
      {widget.features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {f}
        </li>
      ))}
    </ul>
    <div className="pt-3 border-t border-border">
      <p className="font-bold text-foreground text-sm mb-3">{widget.price}</p>
      <div className="flex gap-2">
        <a href={widget.installUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
          <Puzzle className="w-3.5 h-3.5" /> Установить
        </a>
        {widget.videoUrl && (
          <a href={widget.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-muted text-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors">
            <Play className="w-3.5 h-3.5" /> Видео
          </a>
        )}
      </div>
    </div>
  </InView>
);

const WidgetsPage = () => {
  useEffect(() => {
    document.title = "Виджеты для amoCRM — автоматизация процессов | CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Виджеты для amoCRM от CRM82: распределение сделок, антидубль контактов, цветные сделки, скрытие полей. Платные и бесплатные решения.");
    setMeta("property", "og:title", "Виджеты для amoCRM — автоматизация процессов | CRM82");
    setMeta("property", "og:description", "Готовые виджеты для amoCRM: распределение сделок, антидубль, цветные сделки и другие. Бесплатный тестовый период 14 дней.");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", getOgImageUrl("Виджеты для amoCRM", "Распределение сделок, антидубль, цветные сделки", "Виджеты"));

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id; script.type = "application/ld+json"; script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addJsonLd("ld-breadcrumb-widgets", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Виджеты", item: "https://crm82.tech/widgets" },
      ],
    });

    addJsonLd("ld-faq-widgets", {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Есть ли бесплатный тестовый период у виджетов?", acceptedAnswer: { "@type": "Answer", text: "Да, все платные виджеты предоставляют 14 дней бесплатного тестового периода. Бесплатные виджеты работают без ограничений." } },
        { "@type": "Question", name: "Как установить виджет в amoCRM?", acceptedAnswer: { "@type": "Answer", text: "Нажмите кнопку «Установить» на странице виджета — вы будете перенаправлены на страницу авторизации amoCRM. После подтверждения виджет автоматически установится в ваш аккаунт." } },
        { "@type": "Question", name: "Можно ли разработать виджет под наши задачи?", acceptedAnswer: { "@type": "Answer", text: "Да, мы разрабатываем кастомные виджеты для amoCRM под индивидуальные задачи бизнеса. Оставьте заявку — обсудим ваши требования." } },
      ],
    });

    return () => {
      document.getElementById("ld-breadcrumb-widgets")?.remove();
      document.getElementById("ld-faq-widgets")?.remove();
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
              Виджеты от CRM82
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Виджеты для <span className="text-gradient">amoCRM</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Автоматизируйте ваши процессы с нашими готовыми решениями. Платные и бесплатные виджеты с тестовым периодом.
            </p>
            <a href="#paid-widgets" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
              Выбрать виджет <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background" id="paid-widgets">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Платные виджеты</h2>
            <p className="text-muted-foreground text-lg">Готовые решения, которые упростят вашу работу</p>
          </InView>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidWidgets.map((w) => <WidgetCard key={w.name} widget={w} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" id="free-widgets">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">Бесплатные виджеты</h2>
            <p className="text-muted-foreground text-lg">Полезные инструменты без ограничений — устанавливайте бесплатно</p>
          </InView>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {freeWidgets.map((w) => <WidgetCard key={w.name} widget={w} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">Нужна доработка виджета?</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — подберём решение или разработаем виджет под ваши задачи</p>
          </InView>
          <LeadForm title="Заинтересовал виджет и нужна консультация?" subtitle="Оставьте заявку — поможем подобрать и настроить нужное решение" source="widgets" buttonText="Оставить заявку" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WidgetsPage;
