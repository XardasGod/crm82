

## Интеграция Facebook Pixel + Conversions API

Pixel ID: `1940056993251273`. Access Token получен — сохраним как секрет `FB_CAPI_ACCESS_TOKEN`.

### Изменения

**1. Секрет `FB_CAPI_ACCESS_TOKEN`**
Сохранить предоставленный токен через add_secret.

**2. `index.html` — Facebook Pixel**
Добавить стандартный скрипт FB Pixel после блока Google Analytics:
- `fbq('init', '1940056993251273')`
- `fbq('track', 'PageView')`
- noscript-пиксель в body

**3. `src/components/LeadForm.tsx` — клиентское событие Lead**
- Генерировать `event_id` через `crypto.randomUUID()` перед отправкой
- Вызывать `fbq('track', 'Lead', {}, {eventID: event_id})` рядом с ym/gtag
- Передавать `event_id` в body запроса к edge-функции

**4. `supabase/functions/create-amocrm-deal/index.ts` — серверный CAPI**
После успешного создания лида в amoCRM, fire-and-forget POST на Facebook CAPI:
- URL: `https://graph.facebook.com/v21.0/1940056993251273/events`
- Событие `Lead` с `event_id` для дедупликации
- SHA-256 хеширование `email` и `phone` (через `crypto.subtle.digest`)
- `client_ip_address` и `client_user_agent` из заголовков запроса
- `action_source: "website"`, `event_source_url` из referer
- Добавить `event_id` в schema (z.string().uuid().optional())

### Файлы
| Файл | Действие |
|---|---|
| `index.html` | + FB Pixel скрипт |
| `src/components/LeadForm.tsx` | + fbq Lead + event_id |
| `supabase/functions/create-amocrm-deal/index.ts` | + FB CAPI вызов |

