import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const LeadForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    if (!name || !phone) {
      toast.error("Пожалуйста, заполните имя и телефон");
      return;
    }
    setLoading(true);

    // Save to database
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      phone,
      email: formData.email.trim() || null,
      company: formData.company.trim() || null,
    });

    if (dbError) {
      console.error("DB error:", dbError);
    }

    // Create deal in amoCRM
    try {
      const { data, error } = await supabase.functions.invoke("create-amocrm-deal", {
        body: { name, phone, email: formData.email.trim() || null, company: formData.company.trim() || null },
      });

      if (error) {
        console.error("amoCRM error:", error);
        toast.error("Заявка сохранена, но ошибка при отправке в CRM. Мы свяжемся с вами.");
      } else {
        toast.success("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.");
      }
    } catch (err) {
      console.error("amoCRM call error:", err);
      toast.success("Заявка сохранена! Мы свяжемся с вами в течение 15 минут.");
    }

    setFormData({ name: "", phone: "", email: "", company: "" });
    setLoading(false);
  };

  return (
    <div className="bg-card rounded-2xl p-8 card-shadow w-full max-w-md">
      <h2 className="text-2xl font-bold text-card-foreground mb-2 font-display">
        Получите бесплатный аудит
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Разберём вашу воронку продаж и покажем точки роста
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
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
        >
          {loading ? "Отправляем..." : "Получить аудит бесплатно"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};
