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
    // Fetch Inter font with Cyrillic support (two subsets: Latin + Cyrillic)
    const [interBoldLatin, interBoldCyrillic] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff').then(r => r.arrayBuffer()),
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-cyrillic-700-normal.woff').then(r => r.arrayBuffer()),
    ]);

    const imageResponse = new ImageResponse(
      buildLayout(),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Inter', data: interBoldLatin, weight: 700, style: 'normal' as const },
          { name: 'Inter', data: interBoldCyrillic, weight: 700, style: 'normal' as const },
        ],
      }
    );

    // Add cache + CORS headers
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

function buildLayout() {
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
      children: [
        // CRM82 title
        {
          type: 'div',
          props: {
            style: {
              fontSize: '96px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-2px',
              lineHeight: 1,
            },
            children: 'CRM82',
          },
        },
        // Subtitle
        {
          type: 'div',
          props: {
            style: {
              fontSize: '28px',
              fontWeight: 700,
              color: '#94a3b8',
              marginTop: '20px',
            },
            children: 'Внедрение amoCRM для бизнеса',
          },
        },
        // Stats row
        {
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
        },
      ],
    },
  };
}

function statBlock(value: string, label: string) {
  const children: Record<string, unknown>[] = [
    {
      type: 'div',
      props: {
        style: {
          fontSize: '28px',
          fontWeight: 700,
          color: 'white',
        },
        children: value,
      },
    },
  ];

  if (label) {
    children.push({
      type: 'div',
      props: {
        style: {
          fontSize: '16px',
          fontWeight: 700,
          color: '#64748b',
          marginTop: '4px',
        },
        children: label,
      },
    });
  }

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      children,
    },
  };
}
