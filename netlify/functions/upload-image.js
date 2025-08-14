// Netlify Function: Upload image(s) to Supabase Storage and return public URLs
// Env vars required in Netlify UI:
// - SUPABASE_URL (or VITE_SUPABASE_URL)
// - SUPABASE_ANON_KEY (or VITE_SUPABASE_ANON_KEY)

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim()
const SUPABASE_ANON_KEY = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim()
const BUCKET = 'product-images'

function toUint8ArrayFromDataUrl(dataUrl) {
  const match = /^data:(.*?);base64,(.*)$/.exec(dataUrl || '')
  if (!match) return null
  const base64 = match[2]
  const buffer = Buffer.from(base64, 'base64')
  return { bytes: new Uint8Array(buffer), contentType: match[1] || 'image/jpeg', ext: (match[1] || 'image/jpeg').split('/')[1] || 'jpg' }
}

async function fetchUrlToBytes(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const arrayBuffer = await res.arrayBuffer()
  return { bytes: new Uint8Array(arrayBuffer), contentType, ext: (contentType.split('/')[1] || 'jpg').split(';')[0] }
}

async function handleSingle({ dataUrl, url, filename }, supabase) {
  let bytes, contentType, ext
  if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
    const parsed = toUint8ArrayFromDataUrl(dataUrl)
    if (!parsed) throw new Error('Invalid dataUrl')
    ;({ bytes, contentType, ext } = parsed)
  } else if (typeof url === 'string') {
    const fetched = await fetchUrlToBytes(url)
    ;({ bytes, contentType, ext } = fetched)
  } else {
    throw new Error('Provide dataUrl or url')
  }

  const safeBase = (filename || `img_${Date.now()}_${Math.random().toString(36).slice(2,8)}`).replace(/[^a-zA-Z0-9-_.]/g, '_')
  const objectKey = safeBase.includes('.') ? `products/${safeBase}` : `products/${safeBase}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(objectKey, bytes, { contentType, upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectKey)
  const publicUrl = data?.publicUrl
  return { success: true, url: publicUrl }
}

export default async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
    }
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(JSON.stringify({ error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY' }), { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const payload = await req.json()

    // Batch mode
    if (Array.isArray(payload?.items)) {
      const results = []
      for (const item of payload.items) {
        try {
          results.push(await handleSingle(item || {}, supabase))
        } catch (e) {
          results.push({ success: false, error: e?.message || 'upload failed' })
        }
      }
      return new Response(JSON.stringify({ success: true, results }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    // Single mode
    const result = await handleSingle(payload || {}, supabase)
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e?.message || 'upload error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}


