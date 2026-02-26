import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Known bot User-Agent patterns
const BOT_UA_PATTERNS = [
  /bot/i, /crawl/i, /spider/i, /slurp/i, /mediapartners/i,
  /headless/i, /phantom/i, /selenium/i, /puppeteer/i, /playwright/i,
  /wget/i, /curl/i, /httpie/i, /python-requests/i, /axios/i, /node-fetch/i,
  /go-http-client/i, /java\//i, /libwww/i, /scrapy/i,
  /ahrefsbot/i, /semrushbot/i, /dotbot/i, /mj12bot/i,
  /petalbot/i, /bytespider/i, /yandexbot/i, /baiduspider/i,
];

function isBotUserAgent(ua: string): boolean {
  if (!ua || ua.length < 10) return true; // Too short or empty UA
  return BOT_UA_PATTERNS.some(pattern => pattern.test(ua));
}

const utmSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
}).optional();

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().trim().regex(/^\+?[0-9\s\-\(\)]+$/, "Invalid phone format").min(7, "Phone too short").max(20, "Phone too long"),
  email: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().email("Invalid email").max(255).optional()),
  company: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().max(200, "Company name too long").optional()),
  source: z.string().trim().max(50).default("main"),
  website: z.string().max(0, "Bot detected").optional(),
  utm: utmSchema,
  // JS challenge fields
  _t: z.number().optional(),  // timestamp of first interaction
  _d: z.number().optional(),  // duration in ms from interaction to submit
});

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ALLOWED_ORIGINS = [
  'https://crm82.lovable.app',
  'https://crm82.ru',
  'https://www.crm82.ru',
];

// In-memory per-IP tracking for honeypot abuse
const honeypotAbusers = new Map<string, number>();
// In-memory per-IP tracking for bot UA abuse
const botUaBlocked = new Map<string, number>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // 1. User-Agent bot check
  const userAgent = req.headers.get('user-agent') || '';
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isBotUserAgent(userAgent)) {
    const count = (botUaBlocked.get(clientIp) || 0) + 1;
    botUaBlocked.set(clientIp, count);
    console.log(`Bot UA blocked: "${userAgent}" IP: ${clientIp} (count: ${count})`);
    // Silently return success to not tip off bots
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 2. Validate origin/referer
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';
  const isPreview = origin.includes('.lovable.app') || referer.includes('.lovable.app') || origin.includes('.lovableproject.com') || referer.includes('.lovableproject.com');
  const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
  if (!isPreview && !isAllowed && origin !== '' && referer !== '') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const AMOCRM_SUBDOMAIN = Deno.env.get('AMOCRM_SUBDOMAIN');
  const AMOCRM_ACCESS_TOKEN = Deno.env.get('AMOCRM_ACCESS_TOKEN');

  if (!AMOCRM_SUBDOMAIN || !AMOCRM_ACCESS_TOKEN) {
    return new Response(JSON.stringify({ error: 'amoCRM credentials not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Check if IP is a known honeypot abuser
    const honeypotCount = honeypotAbusers.get(clientIp) || 0;
    if (honeypotCount >= 3) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Rate limiting by IP
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneHourAgo)
      .eq('source', clientIp.substring(0, 50));

    const { count: globalCount } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneHourAgo);

    if ((globalCount !== null && globalCount >= 20) || (count !== null && count >= RATE_LIMIT_MAX)) {
      return new Response(JSON.stringify({ error: 'Слишком много заявок. Попробуйте позже.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await req.json();
    const parseResult = leadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const honeypotError = parseResult.error.errors.find(e => e.path.includes('website'));
      if (honeypotError) {
        honeypotAbusers.set(clientIp, (honeypotAbusers.get(clientIp) || 0) + 1);
        console.log(`Honeypot triggered by IP ${clientIp}, count: ${honeypotAbusers.get(clientIp)}`);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, phone, email, company, source, utm, _t, _d } = parseResult.data;

    // 3. JS challenge validation
    // Real users: interaction timestamp exists, duration > 3 seconds, timestamp not from the future
    const now = Date.now();
    if (_t && _d) {
      const isTooFast = _d < 3000; // Less than 3 seconds to fill form
      const isFromFuture = _t > now + 60000; // Timestamp from the future (with 1 min tolerance)
      const isTooOld = _t < now - 24 * 60 * 60 * 1000; // Older than 24 hours
      
      if (isTooFast || isFromFuture || isTooOld) {
        console.log(`JS challenge failed: IP=${clientIp} duration=${_d}ms timestamp=${_t} isTooFast=${isTooFast} isFromFuture=${isFromFuture} isTooOld=${isTooOld}`);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    // If _t/_d not present, we still allow (graceful degradation for older cached forms)

    // --- amoCRM logic (unchanged) ---
    const domain = AMOCRM_SUBDOMAIN.includes('.') ? AMOCRM_SUBDOMAIN : `${AMOCRM_SUBDOMAIN}.amocrm.ru`;
    const baseUrl = `https://${domain}/api/v4`;
    const headers = {
      'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // 1. Search for existing contact by phone, then by email
    let contactId: number | undefined;

    const phoneSearch = new URLSearchParams({ query: phone });
    const phoneSearchRes = await fetch(`${baseUrl}/contacts?${phoneSearch}`, { headers });
    if (phoneSearchRes.ok && phoneSearchRes.status !== 204) {
      const text = await phoneSearchRes.text();
      if (text) {
        const data = JSON.parse(text);
        contactId = data?._embedded?.contacts?.[0]?.id;
        if (contactId) console.log(`Found existing contact ${contactId} by phone`);
      }
    }

    if (!contactId && email) {
      const emailSearch = new URLSearchParams({ query: email });
      const emailSearchRes = await fetch(`${baseUrl}/contacts?${emailSearch}`, { headers });
      if (emailSearchRes.ok && emailSearchRes.status !== 204) {
        const text = await emailSearchRes.text();
        if (text) {
          const data = JSON.parse(text);
          contactId = data?._embedded?.contacts?.[0]?.id;
          if (contactId) console.log(`Found existing contact ${contactId} by email`);
        }
      }
    }

    // 2. Create or update contact
    if (contactId) {
      const updateFields: any[] = [
        { field_code: "PHONE", values: [{ value: phone }] },
      ];
      if (email) {
        updateFields.push({ field_code: "EMAIL", values: [{ value: email }] });
      }
      const updateRes = await fetch(`${baseUrl}/contacts/${contactId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          name,
          custom_fields_values: updateFields,
        }),
      });
      if (!updateRes.ok) {
        console.error('amoCRM contact update error:', await updateRes.text());
      } else {
        console.log(`Updated contact ${contactId}`);
      }
    } else {
      const customFields: any[] = [
        { field_code: "PHONE", values: [{ value: phone }] },
      ];
      if (email) {
        customFields.push({ field_code: "EMAIL", values: [{ value: email }] });
      }

      const contactRes = await fetch(`${baseUrl}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          name,
          custom_fields_values: customFields,
        }]),
      });

      const contactText = await contactRes.text();
      const contactData = contactText ? JSON.parse(contactText) : null;
      if (!contactRes.ok) {
        console.error('amoCRM contact error:', contactText);
        throw new Error(`Contact creation failed [${contactRes.status}]`);
      }

      contactId = contactData?._embedded?.contacts?.[0]?.id;
      console.log(`Created new contact ${contactId}`);
    }

    // 3. Create lead (deal)
    const sourceLabels: Record<string, string> = {
      main: "Главная",
      payments: "Платёжные системы",
      widgets: "Виджеты",
    };
    const sourceLabel = sourceLabels[source] || source;

    const leadBody: any[] = [{
      name: `Заявка с сайта (${sourceLabel}): ${company || name}`,
      status_id: 21249469,
      _embedded: {
        contacts: contactId ? [{ id: contactId }] : [],
      },
    }];

    const leadRes = await fetch(`${baseUrl}/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(leadBody),
    });

    const leadText = await leadRes.text();
    const leadData = leadText ? JSON.parse(leadText) : null;
    if (!leadRes.ok) {
      console.error('amoCRM lead error:', leadText);
      throw new Error(`Lead creation failed [${leadRes.status}]`);
    }

    const leadId = leadData?._embedded?.leads?.[0]?.id;

    // 4. Add UTM note to the lead if UTM params present
    if (leadId && utm && Object.keys(utm).length > 0) {
      const utmLines = Object.entries(utm).map(([k, v]) => `${k}: ${v}`).join('\n');
      const noteBody = [{
        entity_id: leadId,
        note_type: "common",
        params: { text: `UTM-метки:\n${utmLines}` },
      }];
      try {
        const noteRes = await fetch(`${baseUrl}/leads/${leadId}/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify(noteBody),
        });
        if (!noteRes.ok) {
          console.error('amoCRM note error:', await noteRes.text());
        } else {
          console.log(`Added UTM note to lead ${leadId}`);
        }
      } catch (noteErr) {
        console.error('UTM note error:', noteErr);
      }
    }

    return new Response(JSON.stringify({ success: true, lead_id: leadId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating amoCRM deal:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
