import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const LeadForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", company: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Пожалуйста, заполните имя и телефон");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.");
      setFormData({ name: "", phone: "", company: "" });
    }, 1000);
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
