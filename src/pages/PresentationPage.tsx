import { useEffect } from "react";
import logoCrm82 from "@/assets/logo-crm82.png";
import certAmocrm from "@/assets/certificate-amocrm.jpg";
import certSipuni from "@/assets/certificate-sipuni-fixed.jpg";
import certWazzup from "@/assets/certificate-wazzup-fixed.jpg";
import heroCrm from "@/assets/hero-crm.jpg";
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

      {/* ===== Слайд 1: Титульный ===== */}
      <section className="kp-no-break mb-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white p-8 overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          <div className="relative z-10">
            <img src={logoCrm82} alt="CRM82" className="h-8 mb-6 brightness-0 invert" />
            <h1 className="text-3xl font-extrabold leading-tight mb-3 print:text-2xl">
              CRM82 — ваш надежный партнер<br />по внедрению <span className="text-blue-400">amoCRM</span>
            </h1>
            <p className="text-blue-200 text-sm max-w-lg mb-6">
              Автоматизируем продажи, настраиваем интеграции и увеличиваем вашу прибыль.
            </p>
            <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2 text-xs text-blue-200">
              Знакомство с компанией и наши услуги →
            </div>
          </div>
        </div>
      </section>

      {/* ===== Слайд 2: О нас в цифрах ===== */}
      <section className="kp-page-break mb-8">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Почему выбирают CRM82?</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: Award, label: "Сертифицированный партнёр", desc: "amoCRM, Sipuni, Wazzup" },
            { icon: Calendar, label: "На рынке с 2019 года", desc: "Проверенный опыт" },
            { icon: BarChart3, label: "300+ внедрений", desc: "Успешных проектов" },
            { icon: Star, label: "NPS 9.2 / 10", desc: "Индекс лояльности клиентов" },
          ].map((item) => (
            <div key={item.label} className="kp-no-break flex gap-3 items-start p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xs">{item.label}</p>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mb-4">
          {[
            { src: certAmocrm, alt: "Сертификат amoCRM" },
            { src: certSipuni, alt: "Сертификат Sipuni" },
            { src: certWazzup, alt: "Сертификат Wazzup" },
          ].map((cert) => (
            <div key={cert.alt} className="flex-1 rounded-xl border border-gray-100 bg-gray-50 p-2 aspect-[4/3] flex items-center justify-center">
              <img src={cert.src} alt={cert.alt} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 text-center font-medium">
          Мы не просто настраиваем программу — мы выстраиваем систему, которая приносит деньги.
        </div>
      </section>

      {/* ===== Слайд 3: Проблемы бизнеса ===== */}
      <section className="mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Знакомые ситуации?</h2>
        <div className="space-y-2.5">
          {[
            { icon: AlertTriangle, text: "Менеджеры забывают перезвонить клиентам или теряют заявки." },
            { icon: Eye, text: "Нет прозрачной аналитики: непонятно, откуда приходят лиды и где они «отваливаются»." },
            { icon: Clock, text: "Много времени уходит на рутину — заполнение документов, ручные рассылки." },
            { icon: Shield, text: "Руководитель не видит реальную картину продаж и не может контролировать сотрудников." },
          ].map((item) => (
            <div key={item.text} className="flex gap-3 items-start p-3 rounded-xl bg-red-50 border border-red-100">
              <item.icon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Слайд 4: Наше решение ===== */}
      <section className="kp-page-break mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Что вы получите после внедрения?</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: TrendingUp, title: "Рост конверсии до 40%", desc: "Уже в первый месяц работы" },
            { icon: Shield, title: "100% контроль заявок", desc: "Ни один лид не потеряется, все обращения в едином окне" },
            { icon: BarChart3, title: "Прозрачная аналитика", desc: "Дашборды и отчёты по каждому этапу продаж и менеджеру" },
            { icon: Bot, title: "Автоматизация рутины", desc: "Digital-воронки и боты сделают половину работы за отдел" },
          ].map((item) => (
            <div key={item.title} className="kp-no-break p-3 rounded-xl bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4 text-green-600" />
                <p className="font-bold text-xs">{item.title}</p>
              </div>
              <p className="text-[11px] text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src={heroCrm} alt="Интерфейс amoCRM" className="w-full h-auto" />
        </div>
      </section>

      {/* ===== Слайд 5: Услуги ===== */}
      <section className="mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Все интеграции в одном окне</h2>
        <div className="space-y-2">
          {[
            { icon: Settings, title: "Настройка логики", desc: "Создаём воронки продаж, настраиваем карточки сделок и контактов." },
            { icon: MessageSquare, title: "Мессенджеры и соцсети", desc: "Интеграция с WhatsApp, Telegram, Instagram (через Wazzup)." },
            { icon: Headphones, title: "IP-телефония", desc: "Подключение Sipuni и других АТС с записью звонков в карточке клиента." },
            { icon: Globe, title: "Сайт и почта", desc: "Сбор всех заявок с форм на сайте и email." },
            { icon: Zap, title: "Автоматизация", desc: "Триггерные рассылки, автозадачи для менеджеров и генерация документов." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xs">{item.title}</p>
                <p className="text-[11px] text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Слайд 6: Как мы работаем ===== */}
      <section className="kp-page-break mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-1 border-b-2 border-gray-200 pb-2">Внедрение за 5–14 дней, а не месяцами</h2>
        <p className="text-xs text-gray-500 mb-4">4 простых шага к автоматизации продаж</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { num: "01", title: "Аудит", desc: "Анализируем ваши текущие процессы продаж и находим точки роста (бесплатно)." },
            { num: "02", title: "Настройка", desc: "Создаём воронки, настраиваем поля, автоматизацию и подключаем интеграции." },
            { num: "03", title: "Обучение", desc: "Практические тренинги для менеджеров и руководства." },
            { num: "04", title: "Поддержка", desc: "Сопровождаем 30 дней после запуска, оптимизируем процессы." },
          ].map((s) => (
            <div key={s.num} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-2xl font-extrabold text-blue-600/25">{s.num}</span>
              <p className="font-bold text-xs mt-1">{s.title}</p>
              <p className="text-[10px] text-gray-600 mt-1 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Слайд 7: Ниши ===== */}
      <section className="mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Опыт работы в вашей сфере</h2>
        <p className="text-xs text-gray-600 mb-3">Мы успешно внедрили CRM для компаний из самых разных отраслей:</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: Building2, title: "Недвижимость и строительство", desc: "ЖСК ЮГ-1, АН Морозов" },
            { icon: Car, title: "Автобизнес и автошколы", desc: "ООО «Альфакар», Город Дорог" },
            { icon: Users, title: "Консалтинг, HR и экспертиза", desc: "Империал Эксперт, Технадзор" },
            { icon: GraduationCap, title: "Онлайн-школы и образование", desc: "Академия популярного искусства" },
            { icon: Plane, title: "Туризм и страхование", desc: "Пегас Турист, страховые компании" },
            { icon: Mail, title: "Кадастровые услуги", desc: "РККР и другие" },
          ].map((item) => (
            <div key={item.title} className="flex gap-2.5 items-start p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <item.icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-xs">{item.title}</p>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Слайд 8: Кейсы ===== */}
      <section className="mb-8 kp-no-break">
        <h2 className="text-xl font-extrabold mb-4 border-b-2 border-gray-200 pb-2">Кейсы, которыми мы гордимся</h2>
        <div className="space-y-3">
          {[
            {
              title: "Агентство недвижимости «Морозов»",
              result: "Сократили цикл сделки на 40%",
              desc: "Полная интеграция с мессенджерами и сайтом.",
              percent: 40,
            },
            {
              title: "ЖСК ЮГ-1 (Строительство)",
              result: "Увеличили продажи на 20%",
              desc: "Прозрачная система ведения клиента от заявки до сделки.",
              percent: 20,
            },
            {
              title: "Центр экспертиз «Империал Эксперт»",
              result: "Экономия 30 мин на каждой сделке",
              desc: "Автоматизация рутины и генерация документов.",
              percent: 30,
            },
          ].map((c) => (
            <div key={c.title} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-extrabold text-blue-600">{c.percent}%</span>
              </div>
              <div>
                <p className="font-bold text-sm">{c.title}</p>
                <p className="text-xs text-blue-700 font-semibold">{c.result}</p>
                <p className="text-[11px] text-gray-500">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Слайд 10: Контакты ===== */}
      <section className="kp-page-break kp-no-break">
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white p-8">
          <img src={logoCrm82} alt="CRM82" className="h-7 mb-4 brightness-0 invert" />
          <h2 className="text-xl font-extrabold mb-5">Давайте обсудим ваш проект</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[11px] text-blue-300 mb-1">Телефон / Мессенджеры</p>
              <a href="tel:+79697773672" className="flex items-center gap-2 text-sm font-semibold text-white">
                <Phone className="w-4 h-4" />
                +7 (969) 777-36-72
              </a>
            </div>
            <div>
              <p className="text-[11px] text-blue-300 mb-1">Сайт</p>
              <p className="text-sm font-semibold">crm82.tech</p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <a href="https://t.me/crm82_support" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600/30 border border-blue-500/30 rounded-lg px-4 py-2 text-xs text-blue-200 hover:bg-blue-600/40 transition-colors">
              <Send className="w-3.5 h-3.5" />
              Написать в Telegram
            </a>
            <a href="https://wa.me/79697773672" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600/30 border border-green-500/30 rounded-lg px-4 py-2 text-xs text-green-200 hover:bg-green-600/40 transition-colors">
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
