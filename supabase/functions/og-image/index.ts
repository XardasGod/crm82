import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || 'CRM82';
    const subtitle = url.searchParams.get('subtitle') || 'Внедрение amoCRM для бизнеса';
    const tag = url.searchParams.get('tag') || '';

    const [interBoldLatin, interBoldCyrillic] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff').then(r => r.arrayBuffer()),
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-cyrillic-700-normal.woff').then(r => r.arrayBuffer()),
    ]);

    const imageResponse = new ImageResponse(
      buildLayout(title, subtitle, tag),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Inter', data: interBoldLatin, weight: 700, style: 'normal' as const },
          { name: 'Inter', data: interBoldCyrillic, weight: 700, style: 'normal' as const },
        ],
      }
    );

    const headers = new Headers(imageResponse.headers);
    headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800');
    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }

    return new Response(imageResponse.body, {
      status: imageResponse.status,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildLayout(title: string, subtitle: string, tag: string) {
  const isDefault = title === 'CRM82' && !tag;

  const children: Record<string, unknown>[] = [];

  // Tag badge (if provided)
  if (tag) {
    children.push({
      type: 'div',
      props: {
        style: {
          fontSize: '18px',
          fontWeight: 700,
          color: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '8px 24px',
          borderRadius: '999px',
          marginBottom: '24px',
        },
        children: tag,
      },
    });
  }

  // Title
  children.push({
    type: 'div',
    props: {
      style: {
        fontSize: isDefault ? '96px' : '52px',
        fontWeight: 700,
        color: 'white',
        letterSpacing: isDefault ? '-2px' : '-1px',
        lineHeight: 1.15,
        textAlign: 'center',
        maxWidth: '1000px',
      },
      children: title,
    },
  });

  // Subtitle
  children.push({
    type: 'div',
    props: {
      style: {
        fontSize: isDefault ? '28px' : '24px',
        fontWeight: 700,
        color: '#94a3b8',
        marginTop: '20px',
        textAlign: 'center',
        maxWidth: '800px',
      },
      children: subtitle,
    },
  });

  // Stats row (only for default/home page)
  if (isDefault) {
    children.push({
      type: 'div',
      props: {
        style: {
          display: 'flex',
          gap: '80px',
          marginTop: '100px',
        },
        children: [
          statBlock('300+', 'внедрений'),
          statBlock('NPS 9.2/10', ''),
          statBlock('На рынке', 'с 2019 года'),
        ],
      },
    });
  } else {
    // CRM82 branding at bottom
    children.push({
      type: 'div',
      props: {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '60px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '32px',
                fontWeight: 700,
                color: '#64748b',
              },
              children: 'CRM82',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                width: '4px',
                height: '24px',
                backgroundColor: '#334155',
                borderRadius: '2px',
              },
              children: '',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '18px',
                fontWeight: 700,
                color: '#475569',
              },
              children: 'crm82.tech',
            },
          },
        ],
      },
    });
  }

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        fontFamily: 'Inter',
        padding: '60px',
      },
      children,
    },
  };
}

function statBlock(value: string, label: string) {
  const children: Record<string, unknown>[] = [
    {
      type: 'div',
      props: {
        style: { fontSize: '28px', fontWeight: 700, color: 'white' },
        children: value,
      },
    },
  ];

  if (label) {
    children.push({
      type: 'div',
      props: {
        style: { fontSize: '16px', fontWeight: 700, color: '#64748b', marginTop: '4px' },
        children: label,
      },
    });
  }

  return {
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      children,
    },
  };
}
