import { motion } from "framer-motion";
import { Star, Building2 } from "lucide-react";

const testimonials = [
  {
    name: "Алексей Петров",
    role: "Директор, ООО «Ладога»",
    text: "После внедрения amoCRM наши менеджеры перестали терять заявки на продажу софта для ресторанов. Конверсия выросла на 35% за первые 2 месяца.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "РОП, ООО «Русская сотка»",
    text: "Наконец-то я вижу реальную картину по каждому менеджеру. Продажи домов и участков в Подмосковье стали прозрачными — отчёты формируются автоматически.",
    rating: 5,
  },
  {
    name: "Дмитрий Морозов",
    role: "Директор, АН «Морозов»",
    text: "Ребята настроили всё за неделю. Интеграция с сайтом, телефонией и мессенджерами — наше агентство недвижимости в Крыму работает как часы.",
    rating: 5,
  },
];

const clients = [
  { name: "ООО «Ладога»", desc: "Продажа софта для ресторанов и общепита" },
  { name: "ООО «Русская сотка»", desc: "Продажа домов и земельных участков в Подмосковье" },
  { name: "АН «Морозов»", desc: "Агентство по продаже недвижимости в Крыму" },
  { name: "РККР", desc: "Агентство кадастровых услуг в Крыму" },
  { name: "ООО «Агрокомплекс»", desc: "Продажа сельхоз техники и комплектующих" },
  { name: "ООО «МАПП»", desc: "Академия по обучению психологии и психотерапии" },
  { name: "ООО «Альфакар»", desc: "Аренда авто с правом выкупа" },
  { name: "Технадзор", desc: "Технический надзор и экспертизы в Москве" },
  { name: "АНО «Академия популярного искусства»", desc: "Онлайн-школа в сфере искусства" },
  { name: "Пегас-Турист", desc: "Турагентство и онлайн-школа для турагентов" },
  { name: "ООО «Автоконструктор»", desc: "Продажа авто из Кореи, Японии, Китая" },
  { name: "ООО «Город Дорог»", desc: "Автошкола в Москве" },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background" id="reviews">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Отзывы клиентов
          </h2>
          <p className="text-muted-foreground text-lg">
            Более 300 компаний уже увеличили продажи с нашей помощью
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 card-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground text-sm leading-relaxed mb-6">
                «{t.text}»
              </p>
              <div>
                <p className="font-semibold text-card-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clients section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">
            Наши клиенты
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 card-shadow text-center"
            >
              <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-bold text-card-foreground text-sm mb-1">{client.name}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{client.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};