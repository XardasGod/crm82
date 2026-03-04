

## План: Интеграция Facebook Pixel + Conversions API

### Что будет сделано

**1. Клиентский Facebook Pixel (`index.html`)**
- Добавить базовый скрипт Facebook Pixel (ID: `1940056993251273`) аналогично Яндекс.Метрике и GA4
- Автоматическое отслеживание `PageView` на всех страницах
- Отложенная загрузка (аналогично amoCRM чату) для минимального влияния на Core Web Vitals

**2. Клиентские события (`LeadForm.tsx`)**
- Добавить вызов `fbq('track', 'Lead')` при успешной отправке формы (рядом с существующими ym/gtag вызовами)

**3. Серверная часть — Facebook Conversions API**

Создать edge-функцию `facebook-capi` которая будет вызываться из `create-amocrm-deal` после успешного создания лида:

- **Endpoint**: `POST https://graph.facebook.com/v21.0/1940056993251273/events`
- **Событие**: `Lead` с параметрами:
  - `event_time`, `event_source_url`, `action_source: "website"`
  - `user_data`: хешированные (SHA-256) `email`, `phone`, `client_ip_address`, `client_user_agent`
- **Access Token**: сохранить как секрет `FB_CAPI_ACCESS_TOKEN`

**4. Обновить `create-amocrm-deal/index.ts`**
- После успешного создания лида в amoCRM, отправлять серверное событие `Lead` в Facebook CAPI напрямую (без отдельной edge-функции, чтобы не добавлять лишний hop)
- Хешировать email и phone через SHA-256 (требование Facebook)
- Передавать `client_ip_address` и `client_user_agent` из заголовков запроса

**5. Конфигурация**
- `supabase/config.toml`: добавить `verify_jwt = false` для существующей функции (уже настроено)
- Секрет `FB_CAPI_ACCESS_TOKEN` — запросить через add_secret

### Архитектура событий

```text
Браузер                          Сервер
───────                          ──────
PageView  ──► fbq (клиент)
Lead      ──► fbq (клиент)  +   create-amocrm-deal ──► FB CAPI (Lead)
```

Дедупликация: клиентский и серверный `Lead` будут дедуплицированы Facebook по `event_id` (одинаковый ID генерируется на клиенте и передается на сервер).

### Файлы для изменения
- `index.html` — добавить FB Pixel скрипт
- `src/components/LeadForm.tsx` — добавить `fbq('track', 'Lead')` + передать `event_id`
- `supabase/functions/create-amocrm-deal/index.ts` — добавить отправку в FB CAPI

