import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Сколько времени занимает внедрение amoCRM?",
    a: "Стандартное внедрение занимает от 5 до 14 рабочих дней в зависимости от сложности процессов и количества интеграций.",
  },
  {
    q: "Нужно ли покупать лицензию amoCRM отдельно?",
    a: "Да, лицензия amoCRM оплачивается отдельно. Мы поможем выбрать оптимальный тариф под ваши задачи и получить максимальную скидку.",
  },
  {
    q: "Что входит в обучение команды?",
    a: "Проводим онлайн-тренинг для менеджеров и отдельно для руководителей. Записываем видеоинструкции, предоставляем базу знаний.",
  },
  {
    q: "Есть ли гарантия результата?",
    a: "Да, мы гарантируем корректную работу всех настроенных процессов. Если что-то не работает — исправляем бесплатно в рамках гарантийного периода.",
  },
  {
    q: "Работаете ли вы с компаниями из регионов?",
    a: "Конечно! Мы работаем удалённо по всей России и СНГ. Все коммуникации ведутся через Zoom и мессенджеры.",
  },
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Частые вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl px-6 border-0 card-shadow"
              >
                <AccordionTrigger className="text-left text-card-foreground font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
