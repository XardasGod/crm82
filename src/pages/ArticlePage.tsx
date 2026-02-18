import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { InView } from "@/components/InView";
import { RelatedCases } from "@/components/RelatedCases";
import { getArticleBySlug, articles } from "@/data/articles";
import { Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";

/** Parse content with **bold** and [link text](/url) syntax */
const renderContent = (content: string) => {
  // Split by bold and link patterns
  const parts = content.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <Link key={j} to={linkMatch[2]} className="text-primary hover:underline font-medium">{linkMatch[1]}</Link>;
    }
    return <span key={j}>{part}</span>;
  });
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (!article) return;
    document.title = article.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", article.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://crm82.tech/blog/${article.slug}`);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      author: { "@type": "Organization", name: "CRM82" },
      publisher: { "@type": "Organization", name: "CRM82", url: "https://crm82.tech" },
      datePublished: article.publishDate,
      mainEntityOfPage: `https://crm82.tech/blog/${article.slug}`,
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: "https://crm82.tech/" },
        { "@type": "ListItem", position: 2, name: "Блог", item: "https://crm82.tech/blog" },
        { "@type": "ListItem", position: 3, name: article.title, item: `https://crm82.tech/blog/${article.slug}` },
      ],
    };

    const s1 = document.createElement("script");
    s1.id = "ld-article"; s1.type = "application/ld+json"; s1.textContent = JSON.stringify(articleSchema);
    const s2 = document.createElement("script");
    s2.id = "ld-breadcrumb-article"; s2.type = "application/ld+json"; s2.textContent = JSON.stringify(breadcrumbSchema);
    document.head.append(s1, s2);
    return () => { document.getElementById("ld-article")?.remove(); document.getElementById("ld-breadcrumb-article")?.remove(); };
  }, [article]);

  if (!article) return <Navigate to="/blog" replace />;

  const currentIndex = articles.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <main>
      <Header />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[hsl(var(--hero-dark))] to-background">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary-foreground/80 transition-colors">Блог</Link>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground/90">{article.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/20 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {article.industry}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-primary-foreground/60">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground font-display leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {article.sections.map((section, i) => (
              <InView key={i} animation="anim-hidden-up">
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-4">
                    {section.heading}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
                    {renderContent(section.content)}
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </article>

      {/* Navigation between articles */}
      <section className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
            {prevArticle ? (
              <Link to={`/blog/${prevArticle.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{prevArticle.title.length > 40 ? prevArticle.title.slice(0, 40) + "…" : prevArticle.title}</span>
                <span className="sm:hidden">Предыдущая</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/blog/${nextArticle.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                <span className="hidden sm:inline">{nextArticle.title.length > 40 ? nextArticle.title.slice(0, 40) + "…" : nextArticle.title}</span>
                <span className="sm:hidden">Следующая</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Related cases */}
      {article.relatedCases && article.relatedCases.length > 0 && (
        <RelatedCases caseSlugs={article.relatedCases} />
      )}

      {/* CTA */}
      <section className="py-16 bg-muted/30" id="article-form">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Готовы внедрить CRM?
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку — проведём бесплатный аудит и покажем, как amoCRM решит задачи вашего бизнеса.
            </p>
          </div>
          <LeadForm source={`blog-${article.slug}`} />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ArticlePage;
