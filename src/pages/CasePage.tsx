import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Trophy } from "lucide-react";
import { caseStudies } from "@/data/cases";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import NotFound from "./NotFound";

const CasePage = () => {
  const { slug } = useParams();
  const caseData = caseStudies.find((c) => c.slug === slug);

  useEffect(() => {
    if (!caseData) return;
    document.title = `${caseData.subtitle} — ${caseData.title} | CRM82`;
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", `Кейс: ${caseData.subtitle}. ${caseData.result}. Клиент: ${caseData.title}, сфера: ${caseData.industry}.`);
    setMeta("property", "og:title", `${caseData.subtitle} — ${caseData.title}`);
    setMeta("property", "og:description", `${caseData.result}. Узнайте, как мы помогли компании ${caseData.title} в сфере «${caseData.industry}».`);
    setMeta("property", "og:type", "article");
  }, [caseData]);

  if (!caseData) return <NotFound />;

  return (
    <main>
      <Header />

      {/* Hero */}
      {/* Hero Image */}
      <section className="pt-24 pb-0">
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img
            src={caseData.image}
            alt={caseData.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Link
            to="/#cases"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Все кейсы
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {caseData.industry}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-display">
              {caseData.subtitle}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Клиент: <span className="font-semibold text-foreground">{caseData.title}</span>
              {caseData.duration && (
                <span className="ml-4 text-sm">Срок реализации: {caseData.duration}</span>
              )}
            </p>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-5 py-3 rounded-xl">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-bold text-lg">{caseData.result}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Какие проблемы были
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {caseData.problems.map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-xl p-5 card-shadow border-l-4 border-destructive/40"
                >
                  <p className="text-card-foreground text-sm leading-relaxed">{problem}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Что реализовали
              </h2>
            </div>
            <div className="space-y-4">
              {caseData.solutions.map((solution, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 items-start bg-card rounded-xl p-5 card-shadow"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-card-foreground text-sm leading-relaxed">{solution}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Результат
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {caseData.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-3 items-start bg-card rounded-xl p-5 card-shadow border-l-4 border-accent/40"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-card-foreground text-sm leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA with Lead Form */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">
              Хотите такой же результат?
            </h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку и узнайте, как увеличить продажи в вашей сфере
            </p>
          </motion.div>
          <LeadForm />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CasePage;
