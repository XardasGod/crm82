import { useEffect } from "react";
import logoCrm82 from "@/assets/logo-crm82.png";
import certAmocrm from "@/assets/certificate-amocrm.jpg";
import certSipuni from "@/assets/certificate-sipuni-fixed.jpg";
import certWazzup from "@/assets/certificate-wazzup-fixed.jpg";
import heroCrm from "@/assets/hero-crm.jpg";
import presentationBg from "@/assets/presentation-hero-bg.jpg";
import {
  Star, BarChart3, Calendar, Award, Phone, MessageCircle, Send,
  AlertTriangle, TrendingUp, Shield, Eye, Clock, Bot, Globe, Mail,
  MessageSquare, Headphones, Settings, Building2, Car, GraduationCap, Plane,
  Users, Zap
} from "lucide-react";

const PresentationPage = () => {
  useEffect(() => {
    document.title = "Презентация — CRM82 | Внедрение amoCRM";
  }, []);

  return (
    <div className="presentation-page bg-white text-gray-900 min-h-screen print:text-[9pt] max-w-[210mm] mx-auto px-[15mm] py-[8mm]">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .presentation-page { font-size: 9pt; padding: 0; max-width: none; }
          .kp-no-break { break-inside: avoid; }
          .kp-page-break { break-before: page; }
          @page { margin: 8mm 12mm; size: A4; }
          a { text-decoration: none !important; }
        }
        @media screen {
          .presentation-page a:hover { opacity: 0.8; }
        }
      `}</style>

      {/* ===== СТРАНИЦА 1: Титульный + О нас + Проблемы ===== */}

      {/* Титульный */}
      <section className="mb-2">
        <div className="relative rounded-xl text-white p-4 overflow-hidden" style={{ backgroundColor: '#0a1628' }}>
          <img src={presentationBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex-1">
              <img src={logoCrm82} alt="CRM82" className="h-5 mb-1.5 brightness-0 invert" />
              <h1 className="text-xl font-extrabold leading-tight mb-1 print:text-lg">
                CRM82 — ваш партнер по внедрению <span className="text-blue-400">amoCRM</span>
              </h1>
              <p className="text-blue-200 text-[10px]">
                Автоматизируем продажи, настраиваем интеграции и увеличиваем прибыль.
              </p>
            </div>
            <div className="hidden print:flex flex-col items-end text-right text-[9px] text-blue-300 gap-0.5 flex-shrink-0">
              <span>crm82.tech</span>
              <span>+7 (969) 777-36-72</span>
            </div>
          </div>
        </div>
      </section>

      {/* О нас — без kp-no-break чтобы не создавать пустоту */}
      <section className="mb-2">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Почему выбирают CRM82?</h2>
        <div className="grid grid-cols-4 gap-1 mb-1.5">
          {[
            { icon: Award, label: "Сертифицированный партнёр", desc: "amoCRM, Sipuni, Wazzup" },
            { icon: Calendar, label: "С 2019 года", desc: "На рынке" },
            { icon: BarChart3, label: "300+ внедрений", desc: "Успешных проектов" },
            { icon: Star, label: "NPS 9.2/10", desc: "Лояльность клиентов" },
          ].map((item) => (
            <div key={item.label} className="text-center p-1 rounded-md bg-gray-50 border border-gray-100">
              <item.icon className="w-3 h-3 text-blue-600 mx-auto mb-0.5" />
              <p className="font-bold text-[9px] leading-tight">{item.label}</p>
              <p className="text-[8px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mb-1.5">
          {[
            { src: certAmocrm, alt: "Сертификат amoCRM" },
            { src: certSipuni, alt: "Сертификат Sipuni" },
            { src: certWazzup, alt: "Сертификат Wazzup" },
          ].map((cert) => (
            <div key={cert.alt} className="flex-1 rounded-md border border-gray-100 bg-gray-50 p-0.5 aspect-[4/3] flex items-center justify-center">
              <img src={cert.src} alt={cert.alt} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Проблемы — на той же странице */}
      <section className="mb-2">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Знакомые ситуации?</h2>
        <div className="grid grid-cols-2 gap-1">
          {[
            { icon: AlertTriangle, text: "Менеджеры забывают перезвонить или теряют заявки." },
            { icon: Eye, text: "Нет аналитики: непонятно, откуда лиды." },
            { icon: Clock, text: "Много рутины — документы, ручные рассылки." },
            { icon: Shield, text: "Руководитель не видит картину продаж." },
          ].map((item) => (
            <div key={item.text} className="flex gap-1 items-start p-1.5 rounded-md bg-red-50 border border-red-100">
              <item.icon className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-[9px] text-gray-700 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== СТРАНИЦА 2: Решение + Услуги + Процесс ===== */}

      <section className="kp-page-break mb-2 kp-no-break">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Что вы получите после внедрения?</h2>
        <div className="grid grid-cols-2 gap-1 mb-2">
          {[
            { icon: TrendingUp, title: "Рост конверсии до 40%", desc: "В первый месяц работы" },
            { icon: Shield, title: "100% контроль заявок", desc: "Все обращения в одном окне" },
            { icon: BarChart3, title: "Прозрачная аналитика", desc: "Дашборды по этапам" },
            { icon: Bot, title: "Автоматизация рутины", desc: "Воронки и боты за менеджеров" },
          ].map((item) => (
            <div key={item.title} className="p-1.5 rounded-md bg-green-50 border border-green-100">
              <div className="flex items-center gap-1 mb-0.5">
                <item.icon className="w-3 h-3 text-green-600" />
                <p className="font-bold text-[9px]">{item.title}</p>
              </div>
              <p className="text-[8px] text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-md overflow-hidden border border-gray-200">
          <img src={heroCrm} alt="Интерфейс amoCRM" className="w-full h-auto" />
        </div>
      </section>

      <section className="mb-2 kp-no-break">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Все интеграции в одном окне</h2>
        <div className="grid grid-cols-3 gap-1">
          {[
            { icon: Settings, title: "Воронки", desc: "Логика продаж" },
            { icon: MessageSquare, title: "Мессенджеры", desc: "WA, TG, IG" },
            { icon: Headphones, title: "Телефония", desc: "Sipuni, АТС" },
            { icon: Globe, title: "Сайт и почта", desc: "Формы, email" },
            { icon: Zap, title: "Автоматизация", desc: "Задачи, документы" },
          ].map((item) => (
            <div key={item.title} className="flex gap-1 items-center p-1 rounded-md bg-gray-50 border border-gray-100">
              <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-2.5 h-2.5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-[9px]">{item.title}</p>
                <p className="text-[8px] text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-2 kp-no-break">
        <h2 className="text-sm font-extrabold mb-1 border-b border-gray-200 pb-1">Внедрение за 5–14 дней</h2>
        <div className="grid grid-cols-4 gap-1 mt-1">
          {[
            { num: "01", title: "Аудит", desc: "Анализ (бесплатно)" },
            { num: "02", title: "Настройка", desc: "Воронки, интеграции" },
            { num: "03", title: "Обучение", desc: "Тренинги команды" },
            { num: "04", title: "Поддержка", desc: "30 дней" },
          ].map((s) => (
            <div key={s.num} className="text-center p-1 rounded-md bg-gray-50 border border-gray-100">
              <span className="text-base font-extrabold text-blue-600/25">{s.num}</span>
              <p className="font-bold text-[9px]">{s.title}</p>
              <p className="text-[8px] text-gray-600 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== СТРАНИЦА 3: Ниши + Кейсы + Контакты ===== */}

      <section className="kp-page-break mb-2 kp-no-break">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Опыт в вашей сфере</h2>
        <div className="grid grid-cols-3 gap-1">
          {[
            { icon: Building2, title: "Недвижимость", desc: "ЮГ-1, Морозов" },
            { icon: Car, title: "Автобизнес", desc: "Альфакар" },
            { icon: Users, title: "Консалтинг", desc: "Империал Эксперт" },
            { icon: GraduationCap, title: "Образование", desc: "Онлайн-школы" },
            { icon: Plane, title: "Туризм", desc: "Пегас Турист" },
            { icon: Mail, title: "Кадастр", desc: "РККР и другие" },
          ].map((item) => (
            <div key={item.title} className="flex gap-1 items-center p-1 rounded-md bg-gray-50 border border-gray-100">
              <item.icon className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-[9px]">{item.title}</p>
                <p className="text-[8px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-2 kp-no-break">
        <h2 className="text-sm font-extrabold mb-1.5 border-b border-gray-200 pb-1">Кейсы</h2>
        <div className="grid grid-cols-3 gap-1">
          {[
            { title: "АН «Морозов»", result: "−40% цикл сделки", desc: "Мессенджеры + сайт.", percent: 40 },
            { title: "ЖСК ЮГ-1", result: "+20% продажи", desc: "Прозрачное ведение.", percent: 20 },
            { title: "Империал Эксперт", result: "−30 мин / сделка", desc: "Автоматизация.", percent: 30 },
          ].map((c) => (
            <div key={c.title} className="p-1.5 rounded-md bg-gray-50 border border-gray-100 text-center">
              <div className="w-7 h-7 rounded bg-blue-100 flex items-center justify-center mx-auto mb-0.5">
                <span className="text-[10px] font-extrabold text-blue-600">{c.percent}%</span>
              </div>
              <p className="font-bold text-[9px]">{c.title}</p>
              <p className="text-[9px] text-blue-700 font-semibold">{c.result}</p>
              <p className="text-[8px] text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kp-no-break">
        <div className="rounded-xl bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <img src={logoCrm82} alt="CRM82" className="h-4 mb-1 brightness-0 invert" />
              <h2 className="text-sm font-extrabold">Давайте обсудим ваш проект</h2>
            </div>
            <div className="text-right text-[9px] text-blue-300 space-y-0.5">
              <p>crm82.tech</p>
              <a href="tel:+79697773672" className="flex items-center justify-end gap-1 text-white font-semibold text-[10px]">
                <Phone className="w-2.5 h-2.5" />
                +7 (969) 777-36-72
              </a>
            </div>
          </div>
          <div className="flex gap-2 mb-1.5">
            <a href="https://t.me/crm82_support" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 bg-blue-600/30 border border-blue-500/30 rounded-md px-2.5 py-1 text-[9px] text-blue-200">
              <Send className="w-2.5 h-2.5" />
              Telegram
            </a>
            <a href="https://wa.me/79697773672" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-600/30 border border-green-500/30 rounded-md px-2.5 py-1 text-[9px] text-green-200">
              <MessageCircle className="w-2.5 h-2.5" />
              WhatsApp
            </a>
          </div>
          <p className="text-[8px] text-blue-300/60">ИП Рудольф Евгений Евгеньевич</p>
        </div>
      </section>
    </div>
  );
};

export default PresentationPage;
