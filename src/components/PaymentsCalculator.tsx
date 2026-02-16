import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";
import { InView } from "@/components/InView";

export const PaymentsCalculator = () => {
  const [revenue, setRevenue] = useState(5);
  const [installmentShare, setInstallmentShare] = useState(30);

  const overpayment = revenue * 1_000_000 * (installmentShare / 100) * 0.07;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);

  return (
    <InView animation="anim-hidden-up">
      <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-card-foreground">Калькулятор переплаты GetPay</h3>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-medium text-card-foreground">Ваша средняя выручка в месяц</label>
              <span className="text-lg font-bold text-primary">{revenue} млн ₽</span>
            </div>
            <Slider
              value={[revenue]}
              onValueChange={(v) => setRevenue(v[0])}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 млн</span>
              <span>20 млн</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-medium text-card-foreground">Доля оплат в рассрочку</label>
              <span className="text-lg font-bold text-primary">{installmentShare}%</span>
            </div>
            <Slider
              value={[installmentShare]}
              onValueChange={(v) => setInstallmentShare(v[0])}
              min={0}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Ваша переплата GetPay в месяц</p>
            <p className="text-3xl font-extrabold text-primary">{formatCurrency(overpayment)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {revenue} млн × {installmentShare}% × 7% = {formatCurrency(overpayment)}
            </p>
          </div>
        </div>
      </div>
    </InView>
  );
};
