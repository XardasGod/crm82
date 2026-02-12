import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseStudy } from "@/data/cases";
import { InView } from "./InView";

interface CaseNavigationProps {
  currentSlug: string;
  allCases: CaseStudy[];
}

export const CaseNavigation = ({ currentSlug, allCases }: CaseNavigationProps) => {
  const currentIndex = allCases.findIndex((c) => c.slug === currentSlug);
  const previousCase = currentIndex > 0 ? allCases[currentIndex - 1] : null;
  const nextCase = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {previousCase ? (
            <InView animation="anim-hidden-left">
              <Link
                to={`/cases/${previousCase.slug}`}
                className="group block bg-card rounded-xl p-6 card-shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-primary mb-3">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Предыдущий кейс</span>
                </div>
                <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors font-display">
                  {previousCase.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2">{previousCase.subtitle}</p>
              </Link>
            </InView>
          ) : (
            <div className="opacity-50" />
          )}

          {nextCase ? (
            <InView animation="anim-hidden-right" className="md:col-start-2">
              <Link
                to={`/cases/${nextCase.slug}`}
                className="group block bg-card rounded-xl p-6 card-shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-primary mb-3">
                      <span className="text-sm font-medium">Следующий кейс</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors font-display">
                      {nextCase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2">{nextCase.subtitle}</p>
                  </div>
                </div>
              </Link>
            </InView>
          ) : (
            <div className="opacity-50" />
          )}
        </div>
      </div>
    </section>
  );
};
