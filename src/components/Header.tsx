import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-crm82.png";
import logoWebp from "@/assets/logo-crm82.png?format=webp";
import { OptimizedImage } from "./OptimizedImage";

const navLinks = [
  { href: "#benefits", label: "Преимущества" },
  { href: "#process", label: "Процесс" },
  { href: "#certificate", label: "Сертификат" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

const serviceLinks = [
  { href: "/setup-amocrm", label: "Настройка amoCRM" },
  { href: "/telephony", label: "Телефония" },
  { href: "/automation", label: "Автоматизация" },
  { href: "/payments", label: "Платёжные системы" },
  { href: "/widgets", label: "Виджеты amoCRM" },
  { href: "/speech-analytics", label: "Речевая аналитика" },
  { href: "/blog", label: "Блог" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 anim-header-enter ${
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
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                Услуги
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
              {serviceLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground cursor-pointer px-2 py-1.5 w-full"
                  >
                    {link.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
         <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border anim-mobile-menu">
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
             
             {/* Mobile Services Menu */}
             <details className="text-sm font-medium text-foreground/70 hover:text-foreground py-2 cursor-pointer">
               <summary className="flex items-center gap-2">
                 Услуги
                 <ChevronDown className="w-4 h-4" />
               </summary>
               <div className="flex flex-col gap-2 mt-2 ml-4 pl-2 border-l border-border">
                 {serviceLinks.map((link) => (
                   <a
                     key={link.href}
                     href={link.href}
                     onClick={() => setMobileOpen(false)}
                     className="text-sm text-foreground/70 hover:text-foreground py-1"
                   >
                     {link.label}
                   </a>
                 ))}
               </div>
             </details>
             
             <Button
               onClick={scrollToTop}
               size="sm"
               className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg mt-2"
             >
               Оставить заявку
             </Button>
           </nav>
         </div>
       )}
    </header>
  );
};
