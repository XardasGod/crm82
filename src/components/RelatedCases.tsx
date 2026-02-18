import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/cases";
import { OptimizedImage } from "./OptimizedImage";
import { InView } from "./InView";

interface RelatedCasesProps {
  caseSlugs: string[];
}

export const RelatedCases = ({ caseSlugs }: RelatedCasesProps) => {
  const cases = caseSlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter(Boolean);

  if (cases.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <InView animation="anim-hidden-up">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-10">
              Похожие кейсы
            </h2>
          </InView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <InView key={c!.slug} animation="anim-hidden" className={`anim-delay-${i + 1}`}>
                <Link
                  to={`/cases/${c!.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden card-shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300 h-full"
                >
                  <div className="h-40 overflow-hidden">
                    <OptimizedImage
                      src={c!.image}
                      webpSrc={c!.imageWebp}
                      alt={`Кейс — ${c!.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {c!.industry}
                    </span>
                    <h3 className="text-base font-bold text-card-foreground mb-2 font-display group-hover:text-primary transition-colors">
                      {c!.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-accent">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-bold text-sm">{c!.result}</span>
                      </div>
                      <span className="text-primary group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
