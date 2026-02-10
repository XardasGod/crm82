import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().trim().regex(/^\+?[0-9\s\-\(\)]+$/, "Invalid phone format").min(7, "Phone too short").max(20, "Phone too long"),
  email: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().email("Invalid email").max(255).optional()),
  company: z.preprocess((v) => (v === "" || v === null ? undefined : v), z.string().trim().max(200, "Company name too long").optional()),
});

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
    // Rate limiting by IP
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneHourAgo);

    if (count !== null && count >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: 'Слишком много заявок. Попробуйте позже.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await req.json();
    const parseResult = leadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, phone, email, company } = parseResult.data;

    // Support both "crm82" and "crm82.amocrm.ru" formats
    const domain = AMOCRM_SUBDOMAIN.includes('.') ? AMOCRM_SUBDOMAIN : `${AMOCRM_SUBDOMAIN}.amocrm.ru`;
    const baseUrl = `https://${domain}/api/v4`;
    const headers = {
      'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // 1. Search for existing contact by phone
    let contactId: number | undefined;

    const searchParams = new URLSearchParams({ query: phone });
    const searchRes = await fetch(`${baseUrl}/contacts?${searchParams}`, { headers });
    
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      contactId = searchData?._embedded?.contacts?.[0]?.id;
      if (contactId) {
        console.log(`Found existing contact ${contactId} for phone ${phone}`);
      }
    }

    // 2. Create contact only if not found
    if (!contactId) {
      const customFields: any[] = [
        {
          field_code: "PHONE",
          values: [{ value: phone }],
        },
      ];
      if (email) {
        customFields.push({
          field_code: "EMAIL",
          values: [{ value: email }],
        });
      }

      const contactRes = await fetch(`${baseUrl}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          name,
          custom_fields_values: customFields,
        }]),
      });

      const contactData = await contactRes.json();
      if (!contactRes.ok) {
        console.error('amoCRM contact error:', JSON.stringify(contactData));
        throw new Error(`Contact creation failed [${contactRes.status}]`);
      }

      contactId = contactData?._embedded?.contacts?.[0]?.id;
      console.log(`Created new contact ${contactId}`);
    }

    // 3. Create lead (deal)
    const leadBody: any[] = [{
      name: `Заявка с сайта: ${company || name}`,
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

    const leadData = await leadRes.json();
    if (!leadRes.ok) {
      console.error('amoCRM lead error:', JSON.stringify(leadData));
      throw new Error(`Lead creation failed [${leadRes.status}]`);
    }

    return new Response(JSON.stringify({ success: true, lead_id: leadData?._embedded?.leads?.[0]?.id }), {
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
