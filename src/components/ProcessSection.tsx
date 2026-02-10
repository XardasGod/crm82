import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Аудит", description: "Анализируем текущие процессы продаж и выявляем точки роста" },
  { number: "02", title: "Настройка", description: "Создаём воронки, настраиваем поля, автоматизации и интеграции" },
  { number: "03", title: "Обучение", description: "Проводим тренинг для менеджеров и руководства" },
  { number: "04", title: "Поддержка", description: "Сопровождаем 30 дней после запуска и оптимизируем процессы" },
];

export const ProcessSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="process">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Как мы работаем
          </h2>
          <p className="text-muted-foreground text-lg">
            4 простых шага к автоматизации продаж
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-extrabold text-primary/10 font-display mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
