import { useEffect } from "react";
import logoCrm82 from "@/assets/logo-crm82.png";
import { CheckCircle2, Mic, Brain, BarChart3, MessageSquareWarning, ShieldCheck, Search, Target, Megaphone, Phone, MessageCircle, Send } from "lucide-react";

const features = [
  { icon: Mic, title: "Расшифровка звонков", desc: "Транскрибация звонков в текст в карточке сделки amoCRM" },
  { icon: MessageSquareWarning, title: "Выявление проблем", desc: "ИИ находит конфликты, негатив и ошибки менеджеров" },
  { icon: Brain, title: "Рекомендации ИИ", desc: "Рекомендации по улучшению качества коммуникации" },
  { icon: BarChart3, title: "Извлечение данных", desc: "Извлечение данных из разговора и запись в поля amoCRM" },
];

const useCases = [
  {
    icon: ShieldCheck, title: "Контроль качества на ИИ",
    points: ["Проверка 100% звонков автоматически", "Уведомления о критичных разговорах", "Оценка менеджеров по качеству", "Контроль следования скриптам"],
  },
  {
    icon: Search, title: "Автоанализ звонков",
    points: ["Детекция конфликтных ситуаций", "Выявление слабых мест менеджеров", "Анализ причин потерянных сделок", "Рекомендации по улучшению"],
  },
  {
    icon: Target, title: "Анализ ЦА и частых вопросов",
    points: ["Систематизация частых вопросов", "Выявление болей и потребностей ЦА", "Готовые инсайты для контента", "Данные для улучшения рекламы"],
  },
  {
    icon: Megaphone, title: "Данные для маркетинга",
    points: ["Формулировки клиентов для текстов", "Возражения → темы для контента", "Понимание языка клиента", "Инсайты для доработки офферов"],
  },
];

const steps = [
  { num: "01", title: "Аудит", desc: "Изучаем процессы продаж и скрипты" },
  { num: "02", title: "Настройка", desc: "Устанавливаем виджет, настраиваем промпты" },
  { num: "03", title: "Тест", desc: "Запускаем на реальных звонках" },
  { num: "04", title: "Обучение", desc: "Показываем как работать с аналитикой" },
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
    <div className="kp-page bg-white text-gray-900 min-h-screen print:text-[10pt] max-w-[210mm] mx-auto px-[18mm] py-[12mm]">
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .kp-page { font-size: 10pt; padding: 0; max-width: none; }
          .kp-no-break { break-inside: avoid; }
          .kp-page-break { break-before: page; }
          @page { margin: 12mm 15mm; size: A4; }
          a { text-decoration: none !important; }
        }
        @media screen {
          .kp-page a:hover { opacity: 0.8; }
        }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-gray-200 pb-4 mb-6">
        <div>
          <img src={logoCrm82} alt="CRM82" className="h-8 mb-2" />
          <h1 className="text-2xl font-extrabold leading-tight print:text-xl">
            Внедрение речевой аналитики <span className="text-blue-600">Voice AI</span> в amoCRM
          </h1>
          <p className="text-gray-500 mt-1 text-xs">Коммерческое предложение</p>
        </div>
        <div className="text-right text-xs text-gray-500 space-y-0.5">
          <p>crm82.tech</p>
          <p>+7 (969) 777-36-72</p>
        </div>
      </header>

      {/* Intro */}
      <section className="mb-6 kp-no-break">
        <p className="text-sm leading-relaxed max-w-3xl">
          Виджет <strong>Voice AI</strong> на базе ИИ анализирует <strong>100% звонков</strong>, 
          выявляет ошибки менеджеров и собирает данные о клиентах — без ручного прослушивания. 
          Результаты фиксируются прямо в карточке сделки amoCRM.
        </p>
      </section>

      {/* Features */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1.5">Возможности Voice AI</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className="kp-no-break flex gap-2 items-start p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <f.icon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-xs">{f.title}</p>
                <p className="text-[11px] text-gray-600 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-6 kp-page-break">
        <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1.5">Кейсы использования</h2>
        <div className="grid grid-cols-2 gap-3">
          {useCases.map((uc) => (
            <div key={uc.title} className="kp-no-break p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <uc.icon className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs">{uc.title}</h3>
              </div>
              <ul className="space-y-1">
                {uc.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                    <CheckCircle2 className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-6 kp-no-break">
        <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1.5">Процесс внедрения</h2>
        <div className="grid grid-cols-4 gap-3">
          {steps.map((s) => (
            <div key={s.num} className="text-center p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-xl font-extrabold text-blue-600/30">{s.num}</span>
              <p className="font-bold text-xs mt-0.5">{s.title}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-6 kp-no-break">
        <h2 className="text-lg font-bold mb-3 border-b border-gray-200 pb-1.5">Стоимость</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-2xl font-extrabold text-blue-700">от 50 000 ₽</span>
            <span className="text-xs text-gray-500">единоразово за внедрение</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-3">
            + абонентская плата за токены виджета Voice AI (зависит от объёма звонков). 50 минут бесплатно для теста.
          </p>
          <h3 className="font-semibold text-xs mb-1.5">Что входит:</h3>
          <div className="grid grid-cols-2 gap-1">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer className="kp-no-break border-t-2 border-gray-200 pt-4 mt-auto text-sm text-gray-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-gray-900 text-base">CRM82</p>
            <p className="text-xs">Внедрение и настройка amoCRM</p>
            <p className="text-[11px] mt-1 text-gray-400">ИП Рудольф Е.Е. · ИНН 910209375845</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <a href="tel:+79697773672" className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+7 (969) 777-36-72</span>
            </a>
            <a href="https://wa.me/79697773672" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-green-700 hover:text-green-600 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a href="https://t.me/crm82_support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-500 transition-colors">
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpeechAnalyticsKPPage;
