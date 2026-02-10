export const Footer = () => {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CRM82. Все права защищены.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#benefits" className="hover:text-foreground transition-colors">Преимущества</a>
            <a href="#process" className="hover:text-foreground transition-colors">Процесс</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="/policy" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
