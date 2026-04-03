import { forwardRef } from "react";
import { Send, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { InView } from "./InView";

export const Footer = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <InView as="footer" animation="anim-hidden-up" className="bg-foreground/[0.03] border-t border-border py-10 pb-24 md:pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Navigation */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Навигация</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#benefits" className="hover:text-foreground transition-colors">Преимущества</a>
              <a href="#process" className="hover:text-foreground transition-colors">Процесс</a>
              <a href="#cases" className="hover:text-foreground transition-colors">Кейсы</a>
              <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              <Link to="/blog" className="hover:text-foreground transition-colors">Блог</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Услуги</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/setup-amocrm" className="hover:text-foreground transition-colors">Настройка amoCRM</Link>
              <Link to="/telephony" className="hover:text-foreground transition-colors">Интеграция телефонии</Link>
              <Link to="/automation" className="hover:text-foreground transition-colors">Автоматизация продаж</Link>
              <Link to="/payments" className="hover:text-foreground transition-colors">Платёжные системы</Link>
              <Link to="/widgets" className="hover:text-foreground transition-colors">Виджеты amoCRM</Link>
              <Link to="/speech-analytics" className="hover:text-foreground transition-colors">Речевая аналитика</Link>
              <Link to="/integrations" className="hover:text-foreground transition-colors">Интеграции</Link>
            </div>
          </div>

          {/* Cities + Contacts */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Города</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/moscow" className="hover:text-foreground transition-colors">Москва</Link>
              <Link to="/saint-petersburg" className="hover:text-foreground transition-colors">Санкт-Петербург</Link>
              <Link to="/tyumen" className="hover:text-foreground transition-colors">Тюмень</Link>
            </div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+79697773672" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +7 (969) 777-36-72
              </a>
              <a href="https://t.me/crm82_support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                <Send className="w-4 h-4" /> Написать в Telegram
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-3 font-display">Реквизиты</h4>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
              <span>ИП Рудольф Евгений Евгеньевич</span>
              <span>ИНН 910209375845</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/oferta" className="hover:text-foreground transition-colors">Оферта</Link>
              <Link to="/policy" className="hover:text-foreground transition-colors">Политика конфиденциальности</Link>
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
