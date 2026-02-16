import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { CreditCard, Percent, Receipt, ArrowRight, CheckCircle2, Wallet, SplitSquareHorizontal, Landmark, Banknote, Mail, Repeat, Building2, ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { InView } from "@/components/InView";
import { PaymentsCalculator } from "@/components/PaymentsCalculator";

const paymentSystems: { name: string; icon: LucideIcon; description: string; features: string[] }[] = [
  { name: "ЮKassa", icon: Wallet, description: "Универсальная платёжная система для приёма онлайн-платежей картами, электронными кошельками и через СБП.", features: ["Карты РФ и зарубежные", "СБП", "Электронные кошельки"] },
  { name: "Долями", icon: SplitSquareHorizontal, description: "Сервис оплаты частями от Тинькофф — клиент платит 25% сразу, остальное в 3 платежа без переплат.", features: ["Без переплаты для клиента", "4 равных платежа", "Моментальное подтверждение"] },
  { name: "Яндекс Сплит", icon: SplitSquareHorizontal, description: "Оплата частями от Яндекса — разбивает покупку на 2–6 платежей без процентов для покупателя.", features: ["До 6 платежей", "Без процентов", "Яндекс экосистема"] },
  { name: "Сбербанк «В рассрочку»", icon: Landmark, description: "Рассрочка от Сбербанка для ваших клиентов — оплата покупки частями через Сбербанк Онлайн.", features: ["Рассрочка до 12 месяцев", "Широкая аудитория", "Без переплаты"] },
  { name: "Подели", icon: Banknote, description: "Сервис от Почта Банка — оплата покупки 4 равными платежами раз в 2 недели.", features: ["4 платежа", "Раз в 2 недели", "Без процентов"] },
  { name: "Продамус", icon: Repeat, description: "Платёжная система для инфобизнеса с поддержкой рассрочек, подписок и рекуррентных платежей.", features: ["Подписки", "Рассрочки", "Рекуррентные платежи"] },
  { name: "Тинькофф", icon: CreditCard, description: "Интернет-эквайринг и рассрочка от Тинькофф Банка с минимальными комиссиями.", features: ["Эквайринг", "Рассрочка", "Низкие комиссии"] },
  { name: "ОТП Банк", icon: Building2, description: "Кредитование и рассрочка от ОТП Банка для увеличения среднего чека.", features: ["Рассрочка", "Кредит", "Высокое одобрение"] },
];

const benefits = [
  { icon: Percent, title: "Экономия от 3 до 7%", description: "Подключение напрямую обходится дешевле, чем через платёжный модуль GetCourse" },
  { icon: Receipt, title: "Автоматические чеки ОФД", description: "Настроим автоматическую выдачу чеков для всех платёжных систем" },
  { icon: CreditCard, title: "Комбинирование методов", description: "Оставьте GetPay для карт, а рассрочки подключим напрямую" },
];

const PaymentsPage = () => {
  useEffect(() => {
    document.title = "Интеграция платежных систем в GetCourse — CRM82";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Интеграция платежных систем напрямую в GetCourse: ЮKassa, Долями, Яндекс Сплит, Сбербанк, Продамус, Тинькофф. Экономия от 3 до 7% на комиссиях.");
    setMeta("property", "og:title", "Интеграция платежных систем в GetCourse — CRM82");
    setMeta("property", "og:description", "Подключаем платёжные системы напрямую в GetCourse. Экономия от 3 до 7% на комиссиях модуля GetPay.");
    setMeta("property", "og:type", "website");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id; script.type = "application/ld+json"; script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addJsonLd("ld-breadcrumb-payments", {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Платёжные системы", item: "https://crm82.tech/payments" },
      ],
    });

    return () => { document.getElementById("ld-breadcrumb-payments")?.remove(); };
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
              Интеграции для GetCourse
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-6">
              Интегрируем <span className="text-gradient">платёжные системы</span> в ваш GetCourse
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Подключаем платёжные системы напрямую — экономия от 3 до 7%, которые доначисляет платёжный модуль GetCourse.
            </p>
            <a href="#payments-form" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-colors">
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

      <section className="py-20 bg-muted/30" id="payment-systems">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Какие платежные системы интегрируем
            </h2>
            <p className="text-muted-foreground text-lg">
              Подключаем все популярные сервисы оплаты и рассрочки
            </p>
          </InView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paymentSystems.map((ps, i) => (
              <InView key={ps.name} animation="anim-hidden" className={`bg-card rounded-xl p-5 card-shadow hover:shadow-lg transition-shadow anim-delay-${Math.min(i + 1, 8)}`}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <ps.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{ps.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3">{ps.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ps.features.map((f) => (
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

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Сколько вы переплачиваете?
            </h2>
            <p className="text-muted-foreground text-lg">
              Рассчитайте вашу переплату модулю GetPay
            </p>
          </InView>
          <PaymentsCalculator />
        </div>
      </section>

      <section id="payments-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">
              Подключить платёжную систему
            </h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку — подберём оптимальное решение для вашего GetCourse
            </p>
          </InView>
          <LeadForm
            title="Нужна консультация по подключению платёжных систем?"
            subtitle="Оставьте заявку — разберём вашу ситуацию и подберём оптимальное решение"
            source="payments"
            buttonText="Оставить заявку"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PaymentsPage;
