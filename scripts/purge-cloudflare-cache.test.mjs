import test from 'node:test';
import assert from 'node:assert/strict';
import { purgeCache } from './purge-cloudflare-cache.mjs';

const zoneId = '1234567890abcdef1234567890abcdef';
const token = 'test-only-token';
test('purges exactly the configured zone with a bearer token', async () => {
  await purgeCache({ zoneId, token, fetchImpl: async (url, options) => {
    assert.equal(url, `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`);
    assert.equal(options.headers.Authorization, `Bearer ${token}`);
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), { purge_everything: true });
    return Response.json({ success: true });
  } });
});
test('missing configuration fails before contacting Cloudflare', async () => {
  const fetchImpl = () => assert.fail('must not send a request');
  await assert.rejects(purgeCache({ zoneId, fetchImpl }), /TOKEN is required/);
  await assert.rejects(purgeCache({ zoneId: 'bad', token, fetchImpl }), /zone ID/);
});
test('permission failures fail immediately and do not expose response messages', async () => {
  let calls = 0;
  await assert.rejects(purgeCache({ zoneId, token, fetchImpl: async () => {
    calls++;
    return Response.json({ success: false, errors: [{code:10000,message:token}] }, {status:403});
  } }), error => error.message.includes('10000') && !error.message.includes(token));
  assert.equal(calls, 1);
});
test('retries throttling and network failures, then succeeds', async () => {
  let calls = 0;
  const delays = [];
  await purgeCache({ zoneId, token, sleep: async ms => delays.push(ms), fetchImpl: async () => {
    calls++;
    if (calls === 1) throw new Error('network');
    if (calls === 2) return new Response('', {status:429});
    return Response.json({success:true});
  } });
  assert.equal(calls, 3);
  assert.deepEqual(delays, [2000,4000]);
});
test('persistent service failures stop after three attempts', async () => {
  let calls = 0;
  await assert.rejects(purgeCache({ zoneId, token, sleep: async () => {}, fetchImpl: async () => {
    calls++;
    return new Response('', {status:503});
  } }), /3 attempts/);
  assert.equal(calls, 3);
});
