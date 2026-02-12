import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Trophy } from "lucide-react";
import { caseStudies } from "@/data/cases";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { OptimizedImage } from "@/components/OptimizedImage";
import { CaseNavigation } from "@/components/CaseNavigation";
import { InView } from "@/components/InView";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import NotFound from "./NotFound";

const CasePage = () => {
  const { slug } = useParams();
  const caseData = caseStudies.find((c) => c.slug === slug);

  useEffect(() => {
    if (!caseData) return;
    document.title = `${caseData.subtitle} — кейс внедрения amoCRM | CRM82`;
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", `Кейс внедрения amoCRM: ${caseData.subtitle}. ${caseData.result}. Настройка CRM и автоматизация продаж для «${caseData.title}», сфера: ${caseData.industry}.`);
    setMeta("property", "og:title", `${caseData.subtitle} — кейс внедрения amoCRM | CRM82`);
    setMeta("property", "og:description", `${caseData.result}. Внедрение и настройка amoCRM для компании «${caseData.title}» в сфере «${caseData.industry}».`);
    setMeta("property", "og:type", "article");

    const addJsonLd = (id: string, data: object) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addJsonLd("ld-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://crm82.tech/" },
        { "@type": "ListItem", "position": 2, "name": "Кейсы", "item": "https://crm82.tech/#cases" },
        { "@type": "ListItem", "position": 3, "name": caseData.title, "item": `https://crm82.tech/cases/${caseData.slug}` },
      ],
    });

    addJsonLd("ld-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${caseData.subtitle} — кейс внедрения amoCRM`,
      "description": `${caseData.result}. Внедрение amoCRM для «${caseData.title}» в сфере «${caseData.industry}».`,
      "author": { "@type": "Organization", "name": "CRM82", "url": "https://crm82.tech" },
      "publisher": { "@type": "Organization", "name": "CRM82", "url": "https://crm82.tech" },
      "mainEntityOfPage": `https://crm82.tech/cases/${caseData.slug}`,
    });

    return () => {
      document.getElementById("ld-breadcrumb")?.remove();
      document.getElementById("ld-article")?.remove();
    };
  }, [caseData]);

  if (!caseData) return <NotFound />;

  return (
    <main>
      <Header />

      {/* Breadcrumbs */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#cases">Кейсы</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{caseData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-0">
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <OptimizedImage
            src={caseData.image}
            webpSrc={caseData.imageWebp}
            alt={`Кейс внедрения amoCRM для ${caseData.title} — ${caseData.industry}`}
            className="w-full h-full object-cover"
            width={1200}
            height={600}
            loading="eager"
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

          <div className="anim-hero-enter">
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
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-5 py-3 rounded-xl">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="font-bold text-lg">{caseData.result}</span>
              </div>
              <button
                onClick={() => document.getElementById("case-lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Какие проблемы были
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {caseData.problems.map((problem, i) => (
                <InView
                  key={i}
                  animation="anim-hidden-left"
                  className={`bg-card rounded-xl p-5 card-shadow border-l-4 border-destructive/40 anim-delay-${Math.min(i + 1, 8)}`}
                >
                  <p className="text-card-foreground text-sm leading-relaxed">{problem}</p>
                </InView>
              ))}
            </div>
          </InView>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up">
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Что реализовали
              </h2>
            </div>
            <div className="space-y-4">
              {caseData.solutions.map((solution, i) => (
                <InView
                  key={i}
                  animation="anim-hidden"
                  className={`flex gap-4 items-start bg-card rounded-xl p-5 card-shadow anim-delay-${Math.min(i + 1, 8)}`}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-card-foreground text-sm leading-relaxed">{solution}</p>
                </InView>
              ))}
            </div>
          </InView>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                Результат
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {caseData.outcomes.map((outcome, i) => (
                <InView
                  key={i}
                  animation="anim-hidden-scale"
                  className={`flex gap-3 items-start bg-card rounded-xl p-5 card-shadow border-l-4 border-accent/40 anim-delay-${Math.min(i + 1, 8)}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-card-foreground text-sm leading-relaxed">{outcome}</p>
                </InView>
              ))}
            </div>
          </InView>
        </div>
      </section>

      {/* CTA with Lead Form */}
      <section id="case-lead-form" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <InView animation="anim-hidden-up" className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 font-display">
              Хотите такой же результат?
            </h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку и узнайте, как увеличить продажи в вашей сфере
            </p>
          </InView>
          <LeadForm />
        </div>
      </section>

      {/* Case Navigation */}
      <CaseNavigation currentSlug={slug} allCases={caseStudies} />

      <Footer />
    </main>
  );
};

export default CasePage;
