import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Алексей Петров",
    role: "Директор, «СтройПро»",
    text: "После внедрения amoCRM наши менеджеры перестали терять заявки. Конверсия выросла на 35% за первые 2 месяца.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "РОП, «ТехноСервис»",
    text: "Наконец-то я вижу реальную картину по каждому менеджеру. Отчёты формируются автоматически, экономим 10 часов в неделю.",
    rating: 5,
  },
  {
    name: "Дмитрий Савельев",
    role: "CEO, «Digital Agency 42»",
    text: "Ребята настроили всё за неделю. Интеграция с сайтом, телефонией и WhatsApp работает идеально.",
    rating: 5,
  },
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

        <div className="grid md:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};
