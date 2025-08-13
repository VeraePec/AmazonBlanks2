// Netlify Function: Secure OpenAI proxy
// Reads OPENAI_API_KEY from server env and returns JSON content

import OpenAI from 'openai';

export default async function handler(req, context) {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const apiKey = process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY on server' }), { status: 500 });
    }

    const body = await req.json();
    const { prompt, model = 'gpt-4o-mini', temperature = 0.2, max_tokens = 4000 } = body || {};
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
    }

    const client = new OpenAI({ apiKey });
    const resp = await client.chat.completions.create({
      model,
      temperature,
      max_tokens,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a precise data extraction assistant that returns only valid JSON.' },
        { role: 'user', content: prompt },
      ],
    });

    const content = resp?.choices?.[0]?.message?.content?.trim() || '';
    return new Response(JSON.stringify({ success: true, content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e?.message || 'OpenAI proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


