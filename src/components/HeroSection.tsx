import { motion } from "framer-motion";
import heroCrm from "@/assets/hero-crm.jpg";
import { LeadForm } from "./LeadForm";

export const HeroSection = () => {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-screen flex items-center">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-foreground/80 text-sm font-medium mb-6 border border-primary/20">
              Сертифицированный партнёр amoCRM
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Внедрим <span className="text-gradient">amoCRM</span> и увеличим ваши продажи
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg">
              Автоматизируем воронку продаж, настроим интеграции и обучим команду. 
              Результат — рост конверсии до 40% за первый месяц.
            </p>
            <div className="flex items-center gap-6 text-primary-foreground/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>300+ внедрений</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>NPS 9.2/10</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>На рынке с 2019 года</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10"
            >
              <img
                src={heroCrm}
                alt="Интерфейс amoCRM с воронкой продаж, аналитикой и автоматизацией для бизнеса"
                className="rounded-xl border border-primary-foreground/10 shadow-2xl max-w-full"
                loading="lazy"
                width="600"
                height="400"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
