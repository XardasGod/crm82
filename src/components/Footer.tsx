import { Send, Phone } from "lucide-react";
import { InView } from "./InView";

export const Footer = () => {
  return (
    <InView as="footer" animation="anim-hidden-up" className="bg-foreground/[0.03] border-t border-border py-10 pb-24 md:pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Навигация</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#benefits" className="hover:text-foreground transition-colors">Преимущества</a>
              <a href="#process" className="hover:text-foreground transition-colors">Процесс</a>
              <a href="#cases" className="hover:text-foreground transition-colors">Кейсы</a>
              <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="/setup-amocrm" className="hover:text-foreground transition-colors">Настройка amoCRM</a>
              <a href="/telephony" className="hover:text-foreground transition-colors">Интеграция телефонии</a>
              <a href="/automation" className="hover:text-foreground transition-colors">Автоматизация продаж</a>
              <a href="/payments" className="hover:text-foreground transition-colors">Платёжные системы</a>
              <a href="/widgets" className="hover:text-foreground transition-colors">Виджеты amoCRM</a>
              <a href="/blog" className="hover:text-foreground transition-colors">Блог</a>
              <a href="/policy" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="tel:+79697773672"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 (969) 777-36-72
              </a>
              <a
                href="https://t.me/crm82_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Send className="w-4 h-4" />
                Написать в Telegram
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Реквизиты</h4>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span>ИП Рудольф Евгений Евгеньевич</span>
              <span>ИНН 910209375845</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CRM82. Все права защищены.
        </div>
      </div>
    </InView>
  );
};
