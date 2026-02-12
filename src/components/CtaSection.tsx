import { Button } from "@/components/ui/button";
import { InView } from "./InView";

export const CtaSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <InView animation="anim-hidden-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 font-display">
            Готовы увеличить продажи?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Оставьте заявку прямо сейчас и получите бесплатный аудит вашего отдела продаж
          </p>
          <Button
            onClick={scrollToTop}
            size="lg"
            className="h-14 px-10 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all rounded-xl"
          >
            Оставить заявку
          </Button>
        </InView>
      </div>
    </section>
  );
};
