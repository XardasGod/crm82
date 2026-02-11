import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CasesSection } from "@/components/CasesSection";
import { CertificateSection } from "@/components/CertificateSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { SeoTextSection } from "@/components/SeoTextSection";
import { Footer } from "@/components/Footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CRM82",
  "description": "Профессиональное внедрение amoCRM: настройка воронок продаж, интеграции, автоматизация бизнес-процессов. Сертифицированный партнёр amoCRM.",
  "url": "https://crm82.tech",
  "image": "https://crm82.lovable.app/og-image.png",
  "telephone": "+7 (999) 999-99-99",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU"
  },
  "priceRange": "₽₽",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [],
  "serviceArea": {
    "@type": "Country",
    "name": "Россия"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Внедрение amoCRM",
        "description": "Полная настройка amoCRM под бизнес-процессы компании: воронки продаж, автоматизация, интеграции с телефонией и мессенджерами."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Настройка amoCRM",
        "description": "Профессиональная настройка amoCRM: digital-воронки, триггеры, автоматические задачи, виджеты."
      }
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько времени занимает внедрение amoCRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Стандартное внедрение занимает от 5 до 14 рабочих дней в зависимости от сложности процессов и количества интеграций."
      }
    },
    {
      "@type": "Question",
      "name": "Нужно ли покупать лицензию amoCRM отдельно?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, лицензия amoCRM оплачивается отдельно. Мы поможем выбрать оптимальный тариф под ваши задачи и получить максимальную скидку."
      }
    },
    {
      "@type": "Question",
      "name": "Что входит в обучение команды?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Проводим онлайн-тренинг для менеджеров и отдельно для руководителей. Записываем видеоинструкции, предоставляем базу знаний."
      }
    },
    {
      "@type": "Question",
      "name": "Есть ли гарантия результата?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, мы гарантируем корректную работу всех настроенных процессов. Если что-то не работает — исправляем бесплатно в рамках гарантийного периода."
      }
    },
    {
      "@type": "Question",
      "name": "Работаете ли вы с компаниями из регионов?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Конечно! Мы работаем удалённо по всей России и СНГ. Все коммуникации ведутся через Яндекс Телемост и мессенджеры."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://crm82.tech/" },
  ],
};

const Index = () => {
  useEffect(() => {
    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };
    addJsonLd("ld-local-business", localBusinessSchema);
    addJsonLd("ld-faq", faqSchema);
    addJsonLd("ld-breadcrumb", breadcrumbSchema);
    return () => {
      document.getElementById("ld-local-business")?.remove();
      document.getElementById("ld-faq")?.remove();
      document.getElementById("ld-breadcrumb")?.remove();
    };
  }, []);

  return (
    <main>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CasesSection />
      <CertificateSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <SeoTextSection />
      <Footer />
    </main>
  );
};

export default Index;
