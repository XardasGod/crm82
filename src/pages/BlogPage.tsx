import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { InView } from "@/components/InView";
import { articles } from "@/data/articles";
import { ArrowRight, Clock, Tag } from "lucide-react";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
    { "@type": "ListItem", position: 2, name: "Блог", item: "https://crm82.tech/blog" },
  ],
};

const BlogPage = () => {
  useEffect(() => {
    document.title = "Блог о CRM для строительства и недвижимости | CRM82";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Статьи о внедрении amoCRM для застройщиков, агентств недвижимости, ремонтных и строительных компаний. Практические кейсы и советы.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://crm82.tech/blog");

    const script = document.createElement("script");
    script.id = "ld-breadcrumb-blog";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
    return () => { document.getElementById("ld-breadcrumb-blog")?.remove(); };
  }, []);

  return (
    <main>
      <Header />
      <section className="pt-28 pb-16 bg-gradient-to-b from-[hsl(var(--hero-dark))] to-background">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Блог</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-4">
            Блог о CRM для строительства и недвижимости
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Практические статьи о внедрении amoCRM в строительных компаниях, агентствах недвижимости и смежных отраслях.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <InView key={article.slug} animation="anim-hidden-up">
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {article.industry}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground font-display mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Читать статью <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </InView>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30" id="blog-form">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Хотите внедрить CRM в вашей компании?
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку — проведём бесплатный аудит ваших процессов и покажем, как amoCRM поможет вашему бизнесу.
            </p>
          </div>
          <LeadForm source="blog" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
