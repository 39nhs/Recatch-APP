const { test } = require('node:test');
const assert = require('node:assert/strict');
const { webcrypto } = require('node:crypto');
const { validate, normalize, createFailureCache } = require('../wallet-validation.js');
const input = (number, format = 'numeric') => ({ name: '멤버십', number, format });

test('validates numeric formats without silently removing invalid characters', () => {
  for (const number of ['', '12', '1234567890123456789012345', '12345678abc', '１２３４５６７８', '111111111111']) assert.ok(validate(input(number)).error);
  assert.equal(validate(input('7700 1923-8832 1049')).raw, '7700192388321049');
  assert.equal(normalize('0001 2345-6789'), '000123456789');
  assert.ok(validate({ ...input('12345678'), name: '  ' }).error);
  assert.ok(validate({ ...input('12345678'), name: 'a'.repeat(41) }).error);
  assert.ok(validate(input('12345678', 'unknown')).error);
});
test('uses length rules for membership/student formats and check digits only for GTIN', () => {
  assert.ok(validate(input('7700192388321049', 'member16')).raw);
  assert.ok(validate(input('261104205578', 'student12')).raw);
  assert.ok(validate(input('261104205578', 'member16')).error);
  assert.ok(validate(input('4006381333931', 'ean13')).raw);
  assert.ok(validate(input('4006381333932', 'ean13')).error);
  assert.ok(validate(input('036000291452', 'upca')).raw);
  assert.ok(validate(input('036000291453', 'upca')).error);
});
function storage() { const map = new Map(); return { getItem: k => map.get(k), setItem: (k, v) => map.set(k, v), values: map }; }
test('normalizes failures, survives reload, hashes identifiers and expires', async () => {
  let time = 1000; const store = storage(), options = { storage: store, crypto: webcrypto, now: () => time, ttl: 100 };
  const cache = createFailureCache(options);
  await cache.record('membership', 'numeric', '1234-5678', { ok: false, code: 'NOT_FOUND', message: 'server text' });
  assert.equal((await cache.get('membership', 'numeric', '1234 5678')).code, 'NOT_FOUND');
  assert.equal((await createFailureCache(options).get('membership', 'numeric', '12345678')).code, 'NOT_FOUND');
  const saved = [...store.values.values()].join('');
  assert.ok(!saved.includes('12345678') && !saved.includes('server text'));
  assert.equal(await cache.get('card', 'numeric', '12345678'), null);
  assert.equal((await cache.get('membership', 'member16', '12345678')).code, 'NOT_FOUND');
  time += 101;
  assert.equal(await cache.get('membership', 'numeric', '12345678'), null);
});
test('does not cache transport failures, rate limits, successful or malformed responses', async () => {
  const cache = createFailureCache({ crypto: webcrypto });
  for (const result of [undefined, {}, { ok: true, code: 'NOT_FOUND' }, { ok: false, code: 'TIMEOUT' }, { ok: false, code: 'RATE_LIMIT' }, { ok: false, code: 'SERVER_ERROR' }]) {
    await cache.record('membership', 'numeric', '12345678', result);
    assert.equal(await cache.get('membership', 'numeric', '12345678'), null);
  }
});
test('storage/crypto unavailable still supports a bounded in-memory cache', async () => {
  const cache = createFailureCache({ storage: { getItem() { throw Error(); }, setItem() { throw Error(); } }, limit: 2 });
  for (const number of ['12345678', '23456789', '34567890']) await cache.record('membership', 'numeric', number, { ok: false, code: 'INVALID_BARCODE' });
  assert.equal(await cache.get('membership', 'numeric', '12345678'), null);
  assert.equal((await cache.get('membership', 'numeric', '34567890')).code, 'INVALID_BARCODE');
});
