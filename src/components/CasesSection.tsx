import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/cases";

export const CasesSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="cases">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Кейсы наших клиентов
          </h2>
          <p className="text-muted-foreground text-lg">
            Реальные результаты внедрения amoCRM в разных нишах
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/cases/${c.slug}`}
                className="group block bg-card rounded-xl overflow-hidden card-shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300 h-full"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={c.image}
                    alt={`Кейс внедрения amoCRM — ${c.title}, ${c.industry}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {c.industry}
                </span>
                <h3 className="text-lg font-bold text-card-foreground mb-2 font-display group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {c.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold text-sm">{c.result}</span>
                  </div>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
