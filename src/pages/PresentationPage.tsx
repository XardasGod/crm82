import { useEffect } from "react";
import logoCrm82 from "@/assets/logo-crm82.png";
import certAmocrm from "@/assets/certificate-amocrm.jpg";
import certSipuni from "@/assets/certificate-sipuni-fixed.jpg";
import certWazzup from "@/assets/certificate-wazzup-fixed.jpg";
import heroCrm from "@/assets/hero-crm.jpg";
import presentationBg from "@/assets/presentation-hero-bg.jpg";
import {
  CheckCircle2, Star, BarChart3, Calendar, Award, Phone, MessageCircle, Send,
  AlertTriangle, TrendingUp, Shield, Eye, Clock, Bot, Globe, Mail,
  MessageSquare, Headphones, Settings, Building2, Car, GraduationCap, Plane,
  Users, Zap
} from "lucide-react";

const PresentationPage = () => {
  useEffect(() => {
    document.title = "Презентация — CRM82 | Внедрение amoCRM";
  }, []);

  return (
    <div className="presentation-page bg-white text-gray-900 min-h-screen print:text-[10pt] max-w-[210mm] mx-auto px-[18mm] py-[12mm]">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .presentation-page { font-size: 10pt; padding: 0; max-width: none; }
          .kp-no-break { break-inside: avoid; }
          .kp-page-break { break-before: page; }
          @page { margin: 12mm 15mm; size: A4; }
          a { text-decoration: none !important; }
        }
        @media screen {
          .presentation-page a:hover { opacity: 0.8; }
        }
      `}</style>

      {/* ===== СТРАНИЦА 1: Титульный + О нас ===== */}

      {/* Титульный блок — компактный */}
      <section className="kp-no-break mb-5">
        <div className="relative rounded-2xl text-white p-6 overflow-hidden" style={{ backgroundColor: '#0a1628' }}>
          <img src={presentationBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex-1">
              <img src={logoCrm82} alt="CRM82" className="h-6 mb-3 brightness-0 invert" />
              <h1 className="text-2xl font-extrabold leading-tight mb-2 print:text-xl">
                CRM82 — ваш надежный партнер по внедрению <span className="text-blue-400">amoCRM</span>
              </h1>
              <p className="text-blue-200 text-xs max-w-md">
                Автоматизируем продажи, настраиваем интеграции и увеличиваем вашу прибыль.
              </p>
            </div>
            <div className="hidden print:flex flex-col items-end text-right text-[10px] text-blue-300 gap-0.5 flex-shrink-0">
              <span>crm82.tech</span>
              <span>+7 (969) 777-36-72</span>
            </div>
          </div>
        </div>
      </section>

      {/* О нас в цифрах */}
      <section className="mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Почему выбирают CRM82?</h2>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { icon: Award, label: "Сертифицированный партнёр", desc: "amoCRM, Sipuni, Wazzup" },
            { icon: Calendar, label: "С 2019 года", desc: "На рынке" },
            { icon: BarChart3, label: "300+ внедрений", desc: "Успешных проектов" },
            { icon: Star, label: "NPS 9.2/10", desc: "Лояльность клиентов" },
          ].map((item) => (
            <div key={item.label} className="text-center p-2 rounded-lg bg-gray-50 border border-gray-100">
              <item.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="font-bold text-[11px] leading-tight">{item.label}</p>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {[
            { src: certAmocrm, alt: "Сертификат amoCRM" },
            { src: certSipuni, alt: "Сертификат Sipuni" },
            { src: certWazzup, alt: "Сертификат Wazzup" },
          ].map((cert) => (
            <div key={cert.alt} className="flex-1 rounded-lg border border-gray-100 bg-gray-50 p-1.5 aspect-[4/3] flex items-center justify-center">
              <img src={cert.src} alt={cert.alt} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-[11px] text-blue-800 text-center font-medium">
          Мы не просто настраиваем программу — мы выстраиваем систему, которая приносит деньги.
        </div>
      </section>

      {/* ===== СТРАНИЦА 2: Проблемы + Решение ===== */}

      {/* Проблемы бизнеса */}
      <section className="kp-page-break mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Знакомые ситуации?</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: AlertTriangle, text: "Менеджеры забывают перезвонить клиентам или теряют заявки." },
            { icon: Eye, text: "Нет прозрачной аналитики: непонятно, откуда лиды и где они «отваливаются»." },
            { icon: Clock, text: "Много времени уходит на рутину — документы, ручные рассылки." },
            { icon: Shield, text: "Руководитель не видит реальную картину продаж." },
          ].map((item) => (
            <div key={item.text} className="flex gap-2 items-start p-2.5 rounded-lg bg-red-50 border border-red-100">
              <item.icon className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-gray-700 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Наше решение */}
      <section className="mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Что вы получите после внедрения?</h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { icon: TrendingUp, title: "Рост конверсии до 40%", desc: "Уже в первый месяц работы" },
            { icon: Shield, title: "100% контроль заявок", desc: "Все обращения в едином окне" },
            { icon: BarChart3, title: "Прозрачная аналитика", desc: "Дашборды по каждому этапу продаж" },
            { icon: Bot, title: "Автоматизация рутины", desc: "Воронки и боты работают за менеджеров" },
          ].map((item) => (
            <div key={item.title} className="kp-no-break p-2.5 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center gap-1.5 mb-0.5">
                <item.icon className="w-3.5 h-3.5 text-green-600" />
                <p className="font-bold text-[11px]">{item.title}</p>
              </div>
              <p className="text-[10px] text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <img src={heroCrm} alt="Интерфейс amoCRM" className="w-full h-auto" />
        </div>
      </section>

      {/* ===== СТРАНИЦА 3: Услуги + Процесс ===== */}

      {/* Услуги */}
      <section className="kp-page-break mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Все интеграции в одном окне</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Settings, title: "Настройка логики", desc: "Воронки продаж, карточки сделок и контактов." },
            { icon: MessageSquare, title: "Мессенджеры и соцсети", desc: "WhatsApp, Telegram, Instagram (Wazzup)." },
            { icon: Headphones, title: "IP-телефония", desc: "Sipuni и другие АТС с записью звонков." },
            { icon: Globe, title: "Сайт и почта", desc: "Сбор заявок с форм и email." },
            { icon: Zap, title: "Автоматизация", desc: "Рассылки, автозадачи, генерация документов." },
          ].map((item) => (
            <div key={item.title} className="flex gap-2 items-start p-2 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-[11px]">{item.title}</p>
                <p className="text-[10px] text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-1 border-b-2 border-gray-200 pb-1.5">Внедрение за 5–14 дней</h2>
        <p className="text-[10px] text-gray-500 mb-3">4 простых шага к автоматизации продаж</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: "01", title: "Аудит", desc: "Анализ процессов продаж и точек роста (бесплатно)." },
            { num: "02", title: "Настройка", desc: "Воронки, автоматизация, все интеграции." },
            { num: "03", title: "Обучение", desc: "Тренинги для менеджеров и руководства." },
            { num: "04", title: "Поддержка", desc: "30 дней сопровождения после запуска." },
          ].map((s) => (
            <div key={s.num} className="text-center p-2 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xl font-extrabold text-blue-600/25">{s.num}</span>
              <p className="font-bold text-[11px] mt-0.5">{s.title}</p>
              <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ниши */}
      <section className="mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Опыт работы в вашей сфере</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Building2, title: "Недвижимость", desc: "ЖСК ЮГ-1, АН Морозов" },
            { icon: Car, title: "Автобизнес", desc: "Альфакар, Город Дорог" },
            { icon: Users, title: "Консалтинг и HR", desc: "Империал Эксперт" },
            { icon: GraduationCap, title: "Образование", desc: "Онлайн-школы" },
            { icon: Plane, title: "Туризм", desc: "Пегас Турист" },
            { icon: Mail, title: "Кадастр и страхование", desc: "РККР и другие" },
          ].map((item) => (
            <div key={item.title} className="flex gap-2 items-start p-2 rounded-lg bg-gray-50 border border-gray-100">
              <item.icon className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-[11px]">{item.title}</p>
                <p className="text-[10px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== СТРАНИЦА 4: Кейсы + Контакты ===== */}

      {/* Кейсы */}
      <section className="kp-page-break mb-5 kp-no-break">
        <h2 className="text-lg font-extrabold mb-3 border-b-2 border-gray-200 pb-1.5">Кейсы, которыми мы гордимся</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { title: "АН «Морозов»", result: "−40% цикл сделки", desc: "Интеграция с мессенджерами и сайтом.", percent: 40 },
            { title: "ЖСК ЮГ-1", result: "+20% продажи", desc: "Прозрачное ведение клиента.", percent: 20 },
            { title: "Империал Эксперт", result: "−30 мин / сделка", desc: "Автоматизация рутины.", percent: 30 },
          ].map((c) => (
            <div key={c.title} className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-1.5">
                <span className="text-sm font-extrabold text-blue-600">{c.percent}%</span>
              </div>
              <p className="font-bold text-xs">{c.title}</p>
              <p className="text-[11px] text-blue-700 font-semibold">{c.result}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section className="kp-no-break">
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <img src={logoCrm82} alt="CRM82" className="h-6 mb-2 brightness-0 invert" />
              <h2 className="text-lg font-extrabold">Давайте обсудим ваш проект</h2>
            </div>
            <div className="text-right text-[10px] text-blue-300 space-y-0.5">
              <p>crm82.tech</p>
              <a href="tel:+79697773672" className="flex items-center justify-end gap-1.5 text-white font-semibold text-xs">
                <Phone className="w-3 h-3" />
                +7 (969) 777-36-72
              </a>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <a href="https://t.me/crm82_support" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600/30 border border-blue-500/30 rounded-lg px-4 py-2 text-xs text-blue-200">
              <Send className="w-3.5 h-3.5" />
              Написать в Telegram
            </a>
            <a href="https://wa.me/79697773672" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600/30 border border-green-500/30 rounded-lg px-4 py-2 text-xs text-green-200">
              <MessageCircle className="w-3.5 h-3.5" />
              Написать в WhatsApp
            </a>
          </div>

          <p className="text-[10px] text-blue-300/60">ИП Рудольф Евгений Евгеньевич</p>
        </div>
      </section>
    </div>
  );
};

export default PresentationPage;
