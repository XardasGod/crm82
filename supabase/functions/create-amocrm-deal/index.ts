import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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
    const { name, phone, company } = await req.json();

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Support both "crm82" and "crm82.amocrm.ru" formats
    const domain = AMOCRM_SUBDOMAIN.includes('.') ? AMOCRM_SUBDOMAIN : `${AMOCRM_SUBDOMAIN}.amocrm.ru`;
    const baseUrl = `https://${domain}/api/v4`;
    const headers = {
      'Authorization': `Bearer ${AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // 1. Create contact
    const contactRes = await fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify([{
        name,
        custom_fields_values: [
          {
            field_code: "PHONE",
            values: [{ value: phone }],
          },
        ],
      }]),
    });

    const contactData = await contactRes.json();
    if (!contactRes.ok) {
      console.error('amoCRM contact error:', JSON.stringify(contactData));
      throw new Error(`Contact creation failed [${contactRes.status}]`);
    }

    const contactId = contactData?._embedded?.contacts?.[0]?.id;

    // 2. Create lead (deal)
    const leadBody: any[] = [{
      name: `Заявка с сайта: ${company || name}`,
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
