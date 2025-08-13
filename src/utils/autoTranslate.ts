import { openai } from '../services/openaiService';

type LanguageCode = 'en' | 'da' | 'no' | 'de' | 'fr' | 'es' | 'tr';

const STORAGE_KEY = 'translationCacheV1';

interface CacheMap { [key: string]: string }

const readCache = (): CacheMap => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const writeCache = (map: CacheMap) => {
  try {
    // Trim to ~500 entries to avoid bloat
    const entries = Object.entries(map);
    if (entries.length > 500) {
      const trimmed = Object.fromEntries(entries.slice(entries.length - 500));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Continue silently
  }
};

const cacheGet = (language: LanguageCode, text: string): string | undefined => {
  const map = readCache();
  return map[`${language}|${text}`];
};

const cacheSet = (language: LanguageCode, text: string, translated: string) => {
  const map = readCache();
  map[`${language}|${text}`] = translated;
  writeCache(map);
};

export const translateText = async (language: LanguageCode, text: string): Promise<string> => {
  if (!text || language === 'en') return text;
  const cached = cacheGet(language, text);
  if (cached) return cached;
  try {
    const resp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 300,
      messages: [
        { role: 'system', content: 'Translate the user text to the requested target language. Return only the translation. Preserve numbers, units, punctuation, and brand names. Do not add quotes.' },
        { role: 'user', content: `Target language: ${language}\nText:\n${text}` }
      ]
    });
    const out = resp.choices[0]?.message?.content?.trim() || text;
    cacheSet(language, text, out);
    return out;
  } catch {
    return text;
  }
};

export const translateArray = async (language: LanguageCode, arr: string[] = []): Promise<string[]> => {
  return Promise.all(arr.map((t) => translateText(language, t)));
};

export const translateRecord = async (language: LanguageCode, obj: Record<string, string> = {}): Promise<Record<string, string>> => {
  const entries = Object.entries(obj);
  const translatedEntries = await Promise.all(entries.map(async ([k, v]) => {
    const keyTr = await translateText(language, k);
    const valTr = await translateText(language, v);
    return [keyTr, valTr] as const;
  }));
  return Object.fromEntries(translatedEntries);
};

export const translateProductData = async (language: LanguageCode, data: any) => {
  if (!data || language === 'en') return data;
  const [name, features, about, details, tech, reviews] = await Promise.all([
    translateText(language, data.name || ''),
    translateArray(language, data.features || []),
    translateArray(language, data.aboutThisItem || []),
    translateRecord(language, data.productDetails || {}),
    translateRecord(language, data.technicalDetails || {}),
    (async () => {
      const list = Array.isArray(data.reviews) ? data.reviews : [];
      return Promise.all(list.map(async (r: any) => ({
        ...r,
        title: await translateText(language, r.title || ''),
        content: await translateText(language, r.content || ''),
      })));
    })()
  ]);
  return {
    ...data,
    name,
    features,
    aboutThisItem: about,
    productDetails: details,
    technicalDetails: tech,
    reviews,
  };
};


