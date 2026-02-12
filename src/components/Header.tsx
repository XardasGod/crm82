import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-crm82.png";
import logoWebp from "@/assets/logo-crm82.png?format=webp";
import { OptimizedImage } from "./OptimizedImage";

const navLinks = [
  { href: "#benefits", label: "Преимущества" },
  { href: "#process", label: "Процесс" },
  { href: "#certificate", label: "Сертификат" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "/setup-amocrm", label: "Настройка amoCRM" },
  { href: "/telephony", label: "Телефония" },
  { href: "/automation", label: "Автоматизация" },
  { href: "/payments", label: "Платёжные системы" },
  { href: "/widgets", label: "Виджеты amoCRM" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" onClick={scrollToTop} className="flex items-center">
          <OptimizedImage src={logo} webpSrc={logoWebp} alt="CRM82 — внедрение и настройка amoCRM" className={`h-8 transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} width={120} height={40} loading="eager" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={scrollToTop}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg"
          >
            Оставить заявку
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={scrollToTop}
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg mt-2"
            >
              Оставить заявку
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};
