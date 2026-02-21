import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Пожалуйста, введите имя").max(100, "Имя слишком длинное"),
  phone: z.string().trim().regex(/^\+?[0-9\s\-\(\)]+$/, "Некорректный формат телефона").min(7, "Телефон слишком короткий").max(20, "Телефон слишком длинный"),
  email: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().email("Некорректный email").max(255).optional()),
  company: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().max(200, "Название компании слишком длинное").optional()),
});

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  source?: string;
  buttonText?: string;
}

export const LeadForm = ({ 
  title = "Получите бесплатный аудит", 
  subtitle = "Разберём вашу воронку продаж и покажем точки роста",
  source = "main",
  buttonText = "Получить аудит бесплатно"
}: LeadFormProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Capture UTM params on mount (from URL or sessionStorage)
  const utm = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
    const result: Record<string, string> = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) {
        result[k] = v;
        try { sessionStorage.setItem(k, v); } catch {}
      } else {
        try { const stored = sessionStorage.getItem(k); if (stored) result[k] = stored; } catch {}
      }
    });
    return Object.keys(result).length > 0 ? result : undefined;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Необходимо согласие с политикой конфиденциальности");
      return;
    }

    const parseResult = leadSchema.safeParse(formData);
    if (!parseResult.success) {
      toast.error(parseResult.error.errors[0].message);
      return;
    }
    const { name, phone, email, company } = parseResult.data;

    setLoading(true);

    // Save to database
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      company: company || null,
      source,
    });

    if (dbError) {
      if (import.meta.env.DEV) console.error("DB error:", dbError);
    }

    // Create deal in amoCRM
    // Send analytics goals regardless of amoCRM result
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106777831, "reachGoal", "lead_form_submit");
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", { event_category: "form", event_label: "lead_form" });
    }

    try {
      const { data, error } = await supabase.functions.invoke("create-amocrm-deal", {
        body: { name, phone, email: email || null, company: company || null, source, website: honeypot, utm },
      });

      if (error) {
        if (import.meta.env.DEV) console.error("amoCRM error:", error);
        toast.error("Заявка сохранена, но ошибка при отправке в CRM. Мы свяжемся с вами.");
      } else {
        toast.success("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.");
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("amoCRM call error:", err);
      toast.success("Заявка сохранена! Мы свяжемся с вами в течение 15 минут.");
    }

    setFormData({ name: "", phone: "", email: "", company: "" });
    setLoading(false);
  };

  return (
    <div id="lead-form" className="bg-card rounded-2xl p-8 card-shadow w-full max-w-md">
      <h2 className="text-2xl font-bold text-card-foreground mb-2 font-display">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        {subtitle}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="h-12 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
        />
        <Input
          placeholder="Телефон"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="h-12 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
        />
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
        />
        <Input
          placeholder="Название компании"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="h-12 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
        />
        {/* Honeypot field - hidden from real users, bots will fill it */}
        <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
          <Input
            placeholder="Website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            name="website"
          />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="policy-agree"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
          />
          <label htmlFor="policy-agree" className="text-xs text-muted-foreground leading-tight cursor-pointer">
            Я соглашаюсь с{" "}
            <a href="/policy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              политикой конфиденциальности
            </a>
          </label>
        </div>
        <Button
          type="submit"
          disabled={loading || !agreed}
          className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
        >
          {loading ? "Отправляем..." : buttonText}
        </Button>
      </form>
    </div>
  );
};
