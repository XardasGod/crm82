import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calculator, Users, Puzzle, Settings, ArrowRight } from "lucide-react";

const SETUP_LEVELS = [
  {
    id: "basic",
    label: "Базовый",
    description: "1–2 воронки, базовые поля, минимальная автоматизация",
    basePrice: 25000,
    perUser: 3000,
  },
  {
    id: "standard",
    label: "Стандарт",
    description: "3–5 воронок, автодействия, обучение команды",
    basePrice: 50000,
    perUser: 5000,
  },
  {
    id: "premium",
    label: "Премиум",
    description: "Неограниченные воронки, сложная автоматизация, интеграции, аналитика, поддержка 3 мес.",
    basePrice: 90000,
    perUser: 7000,
  },
] as const;

const INTEGRATIONS = [
  { id: "telephony", label: "Телефония (Sipuni / Mango)", price: 15000 },
  { id: "whatsapp", label: "WhatsApp (Wazzup)", price: 10000 },
  { id: "telegram", label: "Telegram-бот", price: 10000 },
  { id: "website", label: "Виджет на сайт", price: 8000 },
  { id: "email", label: "Email-рассылки", price: 7000 },
  { id: "payments", label: "Платёжная система", price: 12000 },
  { id: "analytics", label: "Речевая аналитика", price: 20000 },
] as const;

export const CrmCalculator = () => {
  const [users, setUsers] = useState(5);
  const [levelId, setLevelId] = useState<string>("standard");
  const [selectedIntegrations, setSelectedIntegrations] = useState<Set<string>>(new Set());

  const level = SETUP_LEVELS.find((l) => l.id === levelId)!;

  const total = useMemo(() => {
    const integrationsSum = INTEGRATIONS.filter((i) => selectedIntegrations.has(i.id)).reduce((s, i) => s + i.price, 0);
    return level.basePrice + level.perUser * users + integrationsSum;
  }, [level, users, selectedIntegrations]);

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" /> Калькулятор
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 font-display">
            Рассчитайте стоимость внедрения
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Выберите параметры — получите ориентировочную стоимость. Точную цену рассчитаем после аудита.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Left: controls */}
          <div className="space-y-8 bg-card rounded-2xl p-6 md:p-8 card-shadow">
            {/* Users */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-card-foreground">Количество пользователей</h3>
                <span className="ml-auto text-2xl font-extrabold text-primary">{users}</span>
              </div>
              <Slider
                value={[users]}
                onValueChange={([v]) => setUsers(v)}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span><span>50</span>
              </div>
            </div>

            {/* Level */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-card-foreground">Уровень настройки</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {SETUP_LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevelId(l.id)}
                    className={`text-left rounded-xl p-4 border-2 transition-all ${
                      levelId === l.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <span className="font-bold text-sm text-card-foreground block mb-1">{l.label}</span>
                    <span className="text-xs text-muted-foreground leading-tight block mb-2">{l.description}</span>
                    <span className="text-sm font-extrabold text-primary">от {fmt(l.basePrice)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Puzzle className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-card-foreground">Интеграции</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {INTEGRATIONS.map((intg) => (
                  <label
                    key={intg.id}
                    className={`flex items-center gap-3 rounded-lg p-3 border cursor-pointer transition-all ${
                      selectedIntegrations.has(intg.id)
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    <Checkbox
                      checked={selectedIntegrations.has(intg.id)}
                      onCheckedChange={() => toggleIntegration(intg.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-card-foreground block truncate">{intg.label}</span>
                      <span className="text-xs text-muted-foreground">+{fmt(intg.price)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: result */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-5">
              <h3 className="font-bold text-card-foreground text-lg">Ваш расчёт</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{level.label} настройка</span>
                  <span className="font-semibold text-card-foreground">{fmt(level.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{users} пользовател{users === 1 ? "ь" : users < 5 ? "я" : "ей"}</span>
                  <span className="font-semibold text-card-foreground">{fmt(level.perUser * users)}</span>
                </div>
                {selectedIntegrations.size > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Интеграции ({selectedIntegrations.size})</span>
                    <span className="font-semibold text-card-foreground">
                      {fmt(INTEGRATIONS.filter((i) => selectedIntegrations.has(i.id)).reduce((s, i) => s + i.price, 0))}
                    </span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-card-foreground text-base">Итого</span>
                  <span className="font-extrabold text-primary text-2xl">{fmt(total)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                * Ориентировочная стоимость. Точный расчёт после бесплатного аудита.
              </p>

              <Button
                className="w-full h-12 text-base font-semibold glow-primary"
                onClick={() => document.getElementById("setup-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Получить точный расчёт <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
