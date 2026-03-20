import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      className="bg-card border border-border rounded-xl p-5 mb-10"
      aria-label="Оглавление"
    >
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-primary" />
        <span className="text-sm font-bold font-display text-foreground">
          Содержание
        </span>
      </div>
      <ol className="space-y-1.5 list-none m-0 p-0">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "text-sm leading-snug block py-0.5 pl-4 border-l-2 transition-colors",
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
              )}
            >
              {i + 1}. {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/** Generate a URL-safe slug from heading text */
export const headingToId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
