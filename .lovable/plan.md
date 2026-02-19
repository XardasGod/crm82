

## Plan: Add 2 New SEO Blog Articles

### New Articles

Two new articles targeting high-intent keyword clusters that are NOT yet covered by existing content. Both articles are service-oriented (targeting keywords around specific services) rather than industry-oriented (which is already well covered by the 7 existing articles).

---

**Article 1: "Интеграция телефонии с amoCRM: как не терять звонки и контролировать отдел продаж"**
- Slug: `integratsiya-telefonii-amocrm`
- Target keywords: "интеграция телефонии amoCRM", "телефония для CRM", "запись звонков amoCRM", "Sipuni amoCRM"
- Industry tag: Телефония
- Sections:
  - Почему бизнес теряет звонки без интеграции телефонии
  - Что даёт связка телефонии и amoCRM
  - Какие АТС и сервисы мы подключаем (Sipuni, Мегафон, и т.д.)
  - Речевая аналитика звонков (ссылка на /speech-analytics)
  - Результаты: цифры по клиентам
- Internal links: /telephony, /speech-analytics, /setup-amocrm, /automation
- Related cases: rkkr, imperialexpert, morozov

**Article 2: "Как выбрать CRM-систему для малого бизнеса в 2026 году"**
- Slug: `kak-vybrat-crm-dlya-malogo-biznesa`
- Target keywords: "CRM для малого бизнеса", "как выбрать CRM", "сравнение CRM систем", "amoCRM или Битрикс24"
- Industry tag: Бизнес
- Sections:
  - Зачем малому бизнесу CRM-система
  - Критерии выбора CRM: на что обращать внимание
  - Почему мы рекомендуем amoCRM
  - Типовой план внедрения CRM за 2 недели
  - Сколько стоит внедрение и когда окупается
- Internal links: /setup-amocrm, /telephony, /automation, /widgets
- Related cases: konsalting, strakhovaniye, alfakar

---

### Technical Changes

**1. `src/data/articles.ts`**
- Add 2 new article objects to the `articles` array with all required fields (slug, title, metaTitle, metaDescription, excerpt, industry, publishDate, readTime, keywords, sections, relatedCases)
- Content will include markdown-style internal links (`[text](/path)`) to service pages

**2. `public/sitemap.xml`**
- Add 2 new `<url>` entries:
  - `https://crm82.tech/blog/integratsiya-telefonii-amocrm`
  - `https://crm82.tech/blog/kak-vybrat-crm-dlya-malogo-biznesa`

No changes needed to routing, components, or page templates -- they already handle dynamic articles via `/blog/:slug`.

