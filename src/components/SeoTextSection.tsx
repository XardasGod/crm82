import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const SeoTextSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <span>Подробнее о внедрении amoCRM</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>

          <div className={`anim-collapse ${expanded ? "anim-expanded" : ""}`}>
            <div className="pt-6 space-y-4 text-muted-foreground text-sm leading-relaxed">
              <h2 className="text-xl font-bold text-foreground font-display">
                Внедрение amoCRM — профессиональная настройка CRM для вашего бизнеса
              </h2>
              <p>
                <strong className="text-foreground">CRM82</strong> — сертифицированный партнёр amoCRM с опытом более 300 внедрений 
                в различных отраслях: недвижимость, страхование, консалтинг, образование, автобизнес и другие. 
                Мы помогаем компаниям систематизировать продажи, автоматизировать рутинные процессы и увеличить конверсию.
              </p>
              <p>
                <strong className="text-foreground">Настройка amoCRM под ключ</strong> включает аудит текущих бизнес-процессов, 
                проектирование воронки продаж, настройку карточек сделок и контактов, подключение всех каналов коммуникации 
                (телефония, мессенджеры, email, формы на сайте) и автоматизацию задач. В среднем внедрение занимает 5–14 рабочих дней.
              </p>
              <p>
                <strong className="text-foreground">Интеграции amoCRM</strong> с популярными сервисами — Sipuni, Wazzup, 
                Яндекс.Метрика, 1С, Telegram, WhatsApp, Instagram — позволяют собрать все обращения в единое окно 
                и отслеживать эффективность каждого рекламного канала вплоть до прибыли.
              </p>
              <p>
                <strong className="text-foreground">Автоматизация продаж</strong> — ключевое преимущество amoCRM. 
                Digital-воронки, автоматические задачи, триггерные рассылки и боты позволяют менеджерам сосредоточиться 
                на продажах, а не на рутине. Наши клиенты фиксируют рост конверсии до 40% уже в первый месяц после внедрения.
              </p>
              <p>
                Мы работаем удалённо по всей России и СНГ. Оставьте заявку на бесплатный аудит — разберём вашу воронку 
                продаж и покажем точки роста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
