import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InView } from "./InView";

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceFaqProps {
  faqs: FaqItem[];
  title?: string;
}

export const ServiceFaq = ({ faqs, title = "Частые вопросы" }: ServiceFaqProps) => {
  return (
    <section className="py-20 bg-muted/50" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <InView animation="anim-hidden-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            {title}
          </h2>
        </InView>

        <InView animation="anim-hidden-up" className="anim-delay-1">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl px-6 border-0 card-shadow"
              >
                <AccordionTrigger className="text-left text-card-foreground font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </InView>
      </div>
    </section>
  );
};
