/* Browser + Node: membership numbers are not universally GTINs or bank-card PANs. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RecatchValidation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const FORMATS = {
    numeric: { label: '숫자형 바코드 (8~24자리)', min: 8, max: 24 },
    member16: { label: '16자리 멤버십·선불카드', min: 16, max: 16 },
    student12: { label: '12자리 학생증 (데모 예시)', min: 12, max: 12 },
    ean13: { label: 'EAN-13 (13자리·검증 숫자 포함)', min: 13, max: 13, gtin: true },
    upca: { label: 'UPC-A (12자리·검증 숫자 포함)', min: 12, max: 12, gtin: true }
  };
  const normalize = value => String(value).replace(/[\s-]/g, '');
  function validGTIN(number) {
    const digits = number.slice(0, -1).split('').reverse();
    const sum = digits.reduce((total, digit, i) => total + Number(digit) * (i % 2 ? 1 : 3), 0);
    return (10 - sum % 10) % 10 === Number(number.at(-1));
  }
  function validate({ name, number, format = 'numeric' }) {
    if (!name.trim() || name.trim().length > 40) return { field: 'name', error: '이름을 1~40자로 입력해주세요.' };
    if (!String(number).trim()) return { field: 'number', error: '바코드 번호를 입력해주세요.' };
    if (!/^[0-9\s-]+$/.test(number)) return { field: 'number', error: '숫자만 입력해주세요. 공백과 하이픈은 사용할 수 있어요.' };
    const raw = normalize(number), rule = FORMATS[format];
    if (!rule) return { field: 'format', error: '바코드 형식을 선택해주세요.' };
    if (raw.length < rule.min || raw.length > rule.max) return { field: 'number', error: rule.min === rule.max ? `${rule.min}자리 번호를 입력해주세요.` : `${rule.min}~${rule.max}자리 번호를 입력해주세요.` };
    if (/^(\d)\1+$/.test(raw)) return { field: 'number', error: '같은 숫자만 반복된 번호는 등록할 수 없어요.' };
    if (rule.gtin && !validGTIN(raw)) return { field: 'number', error: '바코드의 마지막 검증 숫자가 맞지 않아요. 번호를 다시 확인해주세요.' };
    return { raw };
  }
  const PERMANENT_FAILURES = new Set(['INVALID_BARCODE', 'NOT_FOUND', 'REVOKED']);
  function createFailureCache({ storage, crypto, now = Date.now, ttl = 24 * 60 * 60 * 1000, limit = 100 } = {}) {
    const storageKey = 'rc-barcode-failures-v1', memory = new Map();
    let entries = {};
    try { entries = JSON.parse(storage?.getItem(storageKey) || '{}'); } catch (_) {}
    if (!entries || typeof entries !== 'object' || Array.isArray(entries)) entries = {};
    function prune() {
      entries = Object.fromEntries(Object.entries(entries).reverse().filter(([, value]) => value && PERMANENT_FAILURES.has(value.code) && value.until > now()).sort((a, b) => b[1].until - a[1].until).slice(0, limit));
      for (const [key, value] of memory) if (value.until <= now()) memory.delete(key);
      while (memory.size > limit) memory.delete(memory.keys().next().value);
    }
    async function keyFor(type, format, raw) {
      // A different display format or name must not bypass a failed-number result.
      const key = `${type}:${normalize(raw)}`;
      if (!crypto?.subtle) return { key, persistent: false };
      try {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
        return { key: Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join(''), persistent: true };
      } catch (_) { return { key, persistent: false }; }
    }
    function persist() { try { storage?.setItem(storageKey, JSON.stringify(entries)); } catch (_) {} }
    return {
      async get(type, format, raw) {
        prune(); persist();
        const { key, persistent } = await keyFor(type, format, raw);
        return (persistent ? entries[key] : memory.get(key)) || null;
      },
      async record(type, format, raw, result) {
        if (result?.ok !== false || !PERMANENT_FAILURES.has(result.code)) return;
        const { key, persistent } = await keyFor(type, format, raw);
        const value = { code: result.code, until: now() + ttl };
        if (persistent) entries[key] = value; else memory.set(key, value);
        prune(); persist();
      }
    };
  }
  return { FORMATS, normalize, validate, validGTIN, createFailureCache };
});
