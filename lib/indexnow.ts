import { SITE_URL } from './seo';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export function getIndexNowKey(): string | undefined {
  return process.env.INDEXNOW_KEY?.trim() || undefined;
}

export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  const key = getIndexNowKey();
  if (!key || urls.length === 0) {
    return { ok: false, status: 0 };
  }

  const host = SITE_URL.replace(/^https?:\/\//, '');
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, urlList: urls }),
  });

  return { ok: response.ok, status: response.status };
}
