import { motion } from "framer-motion";
import { TrendingUp, Zap, Users, BarChart3, PhoneCall, Settings } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Рост конверсии до 40%",
    description: "Автоматизация воронки продаж позволяет не терять ни одного лида",
  },
  {
    icon: Zap,
    title: "Быстрое внедрение",
    description: "Настраиваем amoCRM за 5-14 дней, а не месяцами",
  },
  {
    icon: Users,
    title: "Обучение команды",
    description: "Проводим тренинги для менеджеров и руководителей",
  },
  {
    icon: BarChart3,
    title: "Прозрачная аналитика",
    description: "Дашборды и отчёты для контроля каждого этапа продаж",
  },
  {
    icon: PhoneCall,
    title: "IP-телефония",
    description: "Интеграция со всеми популярными АТС и сервисами связи",
  },
  {
    icon: Settings,
    title: "100+ интеграций",
    description: "Подключаем сайт, мессенджеры, почту и другие каналы",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-background" id="benefits">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Комплексное внедрение amoCRM с гарантией результата
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
