// Netlify Function: Secure OpenAI proxy
// Reads OPENAI_API_KEY from server env and returns JSON content

import OpenAI from 'openai';

export default async function handler(req, context) {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    // Normalize env vars (trim to avoid invisible whitespace causing 401s)
    const apiKey = (process.env.OPENAI_API_KEY || '').trim();
    const project = (process.env.OPENAI_PROJECT || '').trim();
    const organization = (process.env.OPENAI_ORG || process.env.OPENAI_ORGANIZATION || '').trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY on server' }), { status: 500 });
    }

    const body = await req.json();
    const { prompt, model = 'gpt-4o-mini', temperature = 0.2, max_tokens = 4000 } = body || {};
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    // Prefer direct HTTPS call to avoid SDK-level header behavior differences
    const isProjectScopedKey = apiKey.startsWith('sk-proj-');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      ...(isProjectScopedKey ? {} : (organization ? { 'OpenAI-Organization': organization } : {})),
      ...(isProjectScopedKey ? {} : (project ? { 'OpenAI-Project': project } : {})),
    };

    const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        temperature,
        max_tokens,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are a precise data extraction assistant that returns only valid JSON.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!oaResp.ok) {
      let err;
      try { err = await oaResp.json(); } catch { err = { error: { message: await oaResp.text() } }; }
      return new Response(
        JSON.stringify({ success: false, error: err?.error?.message || 'OpenAI error', status: oaResp.status }),
        { status: oaResp.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await oaResp.json();
    const content = data?.choices?.[0]?.message?.content?.trim() || '';
    return new Response(JSON.stringify({ success: true, content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const status = e?.status || e?.response?.status || 500;
    const message = e?.message || e?.response?.data?.error?.message || 'OpenAI proxy error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


