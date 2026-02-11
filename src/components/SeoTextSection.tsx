import { motion } from "framer-motion";

export const SeoTextSection = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6 font-display">
            Внедрение amoCRM — профессиональная настройка CRM для вашего бизнеса
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
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
        </motion.div>
      </div>
    </section>
  );
};
