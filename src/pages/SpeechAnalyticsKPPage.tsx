import { useEffect } from "react";
import logoCrm82 from "@/assets/logo-crm82.png";
import { CheckCircle2, Mic, Brain, BarChart3, MessageSquareWarning, ShieldCheck, Search, Target, Megaphone } from "lucide-react";

const features = [
  { icon: Mic, title: "Расшифровка звонков", desc: "Мгновенная транскрибация звонков в текст в карточке сделки amoCRM" },
  { icon: MessageSquareWarning, title: "Выявление проблем", desc: "ИИ находит конфликты, негатив и ошибки менеджеров без прослушивания" },
  { icon: Brain, title: "Рекомендации ИИ", desc: "Автоматические рекомендации по улучшению качества коммуникации" },
  { icon: BarChart3, title: "Извлечение данных", desc: "Извлечение ключевых данных из разговора и запись в поля amoCRM" },
];

const useCases = [
  {
    icon: ShieldCheck, title: "Отдел контроля качества на ИИ",
    points: ["Автоматическая проверка 100% звонков", "Уведомления о критичных разговорах", "Оценка менеджеров по качеству", "Контроль следования скриптам"],
  },
  {
    icon: Search, title: "Автоанализ звонков и выявление ошибок",
    points: ["Детекция конфликтных ситуаций", "Выявление слабых мест менеджеров", "Анализ причин потерянных сделок", "Рекомендации по улучшению"],
  },
  {
    icon: Target, title: "Анализ ЦА и сбор частых вопросов",
    points: ["Систематизация частых вопросов клиентов", "Выявление болей и потребностей ЦА", "Готовые инсайты для контента", "Данные для улучшения рекламы"],
  },
  {
    icon: Megaphone, title: "Данные для маркетинга и рекламы",
    points: ["Реальные формулировки клиентов для текстов", "Частые возражения → темы для контента", "Понимание языка клиента для таргетинга", "Инсайты для доработки офферов"],
  },
];

const steps = [
  { num: "01", title: "Аудит процессов", desc: "Изучаем текущие процессы продаж и скрипты" },
  { num: "02", title: "Настройка Voice AI", desc: "Устанавливаем виджет, настраиваем промпты" },
  { num: "03", title: "Тестирование", desc: "Запускаем на реальных звонках, калибруем" },
  { num: "04", title: "Обучение команды", desc: "Показываем как работать с аналитикой" },
];

const included = [
  "Аудит текущих процессов продаж",
  "Установка и настройка виджета Voice AI",
  "Настройка промптов и критериев анализа",
  "Тестирование на реальных звонках",
  "Обучение команды работе с аналитикой",
  "Техническая поддержка после внедрения",
];

const SpeechAnalyticsKPPage = () => {
  useEffect(() => {
    document.title = "КП — Внедрение речевой аналитики Voice AI | CRM82";
  }, []);

  return (
    <div className="kp-page bg-white text-gray-900 min-h-screen print:text-[11pt]">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .kp-page { font-size: 11pt; }
          .kp-no-break { break-inside: avoid; }
          .kp-page-break { break-before: page; }
          @page { margin: 15mm 18mm; size: A4; }
        }
      `}</style>

      {/* Header / Cover */}
      <header className="flex items-center justify-between border-b-2 border-gray-200 pb-6 mb-8">
        <div>
          <img src={logoCrm82} alt="CRM82" className="h-10 mb-3" />
          <h1 className="text-3xl font-extrabold leading-tight print:text-2xl">
            Внедрение речевой аналитики<br />
            <span className="text-blue-600">Voice AI</span> в amoCRM
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Коммерческое предложение</p>
        </div>
        <div className="text-right text-sm text-gray-500 space-y-1">
          <p>crm82.tech</p>
          <p>info@crm82.tech</p>
        </div>
      </header>

      {/* Intro */}
      <section className="mb-10 kp-no-break">
        <p className="text-base leading-relaxed max-w-3xl">
          Виджет <strong>Voice AI</strong> на базе искусственного интеллекта анализирует <strong>100% звонков</strong>, 
          выявляет ошибки менеджеров и собирает данные о клиентах — без ручного прослушивания. 
          Результаты анализа фиксируются прямо в карточке сделки amoCRM.
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Возможности Voice AI</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="kp-no-break flex gap-3 items-start p-3 rounded-lg bg-gray-50 border border-gray-100">
              <f.icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-xs text-gray-600 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-10 kp-page-break">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Кейсы использования</h2>
        <div className="grid grid-cols-2 gap-5">
          {useCases.map((uc) => (
            <div key={uc.title} className="kp-no-break p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <uc.icon className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm">{uc.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {uc.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-10 kp-no-break">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Процесс внедрения</h2>
        <div className="grid grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-2xl font-extrabold text-blue-600/30">{s.num}</span>
              <p className="font-bold text-sm mt-1">{s.title}</p>
              <p className="text-xs text-gray-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-10 kp-no-break">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Стоимость</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-extrabold text-blue-700">от 50 000 ₽</span>
            <span className="text-sm text-gray-500">единоразово за внедрение</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            + абонентская плата за токены виджета Voice AI (зависит от объёма звонков). 50 минут бесплатно для теста.
          </p>
          <h3 className="font-semibold text-sm mb-2">Что входит:</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer className="kp-no-break border-t-2 border-gray-200 pt-6 mt-10 text-sm text-gray-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-900">CRM82</p>
            <p>crm82.tech — внедрение и настройка amoCRM</p>
          </div>
          <div className="text-right">
            <p>info@crm82.tech</p>
            <p>crm82.tech/speech-analytics</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpeechAnalyticsKPPage;
