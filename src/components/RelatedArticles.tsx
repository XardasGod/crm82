import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/data/articles";
import { InView } from "./InView";

interface RelatedArticlesProps {
  articleSlugs: string[];
}

export const RelatedArticles = ({ articleSlugs }: RelatedArticlesProps) => {
  const related = articleSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <InView animation="anim-hidden-up">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold font-display">Читайте также</h3>
          </div>
        </InView>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto md:max-w-none">
          {related.map((article) => (
            <InView key={article!.slug} animation="anim-hidden-up">
              <Link
                to={`/blog/${article!.slug}`}
                className="group block bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full"
              >
                <span className="inline-flex text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2">
                  {article!.industry}
                </span>
                <h4 className="text-sm font-bold text-foreground font-display mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {article!.title}
                </h4>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                  Читать <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
};
