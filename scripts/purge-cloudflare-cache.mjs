import { pathToFileURL } from 'node:url';

// Only a zone-scoped Cache Purge token is needed. Never log its value.
export async function purgeCache({ zoneId, token, fetchImpl = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
  if (!/^[a-f0-9]{32}$/i.test(zoneId ?? '')) throw new Error('CLOUDFLARE_ZONE_ID must be a 32-character zone ID');
  if (!token?.trim()) throw new Error('CLOUDFLARE_API_TOKEN is required');
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    try {
      response = await fetchImpl(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ purge_everything: true }),
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      if (attempt === 2) throw new Error('Cloudflare purge failed after 3 network attempts');
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    if (response.status === 429 || response.status >= 500) {
      if (attempt === 2) throw new Error(`Cloudflare purge failed after 3 attempts (HTTP ${response.status})`);
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    let result;
    try { result = await response.json(); } catch { throw new Error('Cloudflare purge returned invalid JSON'); }
    if (!response.ok || result.success !== true) {
      // Error codes are useful; response messages could echo request details.
      const codes = (result.errors ?? []).map(error => error.code).filter(Number.isInteger).join(',');
      throw new Error(`Cloudflare purge rejected (HTTP ${response.status}${codes ? `, codes ${codes}` : ''})`);
    }
    return;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  purgeCache({ zoneId: process.env.CLOUDFLARE_ZONE_ID, token: process.env.CLOUDFLARE_API_TOKEN })
    .then(() => console.log('Cloudflare zone cache purge accepted'))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
