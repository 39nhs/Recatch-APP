// QA에서 재현된 결함의 회귀 테스트.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import net from 'node:net';
import { createReCatch, parseNotification } from '../core/index.js';
import { createApp } from '../server/app.js';
import { memoryStore } from '../server/store.js';
import { loadCatalog } from '../server/catalog.js';

const catalog = loadCatalog();
const clone = o => JSON.parse(JSON.stringify(o));
const app = () => {
  const wallet = clone(catalog.defaultWallet);
  return { wallet, rc: createReCatch({ merchants: catalog.merchants, products: catalog.products, wallet }) };
};
const at = (h, m, s = 0) => new Date(2026, 9, 16, h, m, s);

const HD_APPROVE = '[현대카드]승인\n홍*동\n13,000원 일시불\n10/16 12:30\n스타벅스영남대정';
const HD_PUSH = '현대카드 승인 13,000원 일시불 10/16 12:30 스타벅스영남대정';
const HD_CANCEL = '[현대카드]취소\n홍*동\n13,000원\n10/16 12:31\n스타벅스영남대정';
const KB_REPAY = '[Web발신]\nKB국민체크(9421)\n홍*동님\n10/16 12:31\n13,000원\n스타벅스영남대정 사용';

async function boot() {
  let now = new Date(2026, 9, 16, 12, 30);
  const handle = createApp({ store: memoryStore(), catalog, clock: () => new Date(now) });
  const server = createServer(handle);
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  let token = null;
  const call = async (method, path, body) => {
    const res = await fetch(`http://127.0.0.1:${port}${path}`, {
      method,
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    return { status: res.status, body: await res.json() };
  };
  token = (await call('POST', '/api/register', {})).body.token;
  return { port, call, set: d => { now = d; }, close: () => new Promise(r => server.close(r)) };
}

const rawRequest = (port, target) => new Promise((resolve, reject) => {
  const c = net.connect(port, '127.0.0.1', () => c.write(`GET ${target} HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n`));
  let b = '';
  c.on('data', d => { b += d; });
  c.on('end', () => resolve(b.split('\r\n')[0]));
  c.on('error', reject);
});

test('회귀: 파싱할 수 없는 요청 주소는 400이고 서버는 계속 동작한다', async t => {
  const s = await boot(); t.after(s.close);
  assert.match(await rawRequest(s.port, '//'), / 400 /);
  assert.equal((await s.call('GET', '/api/health')).status, 200);
});

test('회귀: 정산 조회는 올바른 달과 이번 달까지만 받는다', async t => {
  const s = await boot(); t.after(s.close);
  for (const m of ['2026-13', '2026-00', '0000-00', '2026-11', '9999-12']) {
    assert.equal((await s.call('GET', `/api/statement?month=${m}`)).status, 400, m);
  }
  assert.equal((await s.call('GET', '/api/statement?month=2026-10')).status, 200);
  assert.equal((await s.call('GET', '/api/statement')).status, 200);
});

test('회귀: 재승인 알림이 취소보다 먼저 와도 재결제로 판정한다', () => {
  const { rc } = app();
  rc.onNotification(HD_APPROVE, { now: at(12, 30, 15) });
  assert.deepEqual(rc.onNotification(KB_REPAY, { now: at(12, 31) }).updates, []);
  const { updates } = rc.onNotification(HD_CANCEL, { now: at(12, 31, 20) });
  assert.equal(updates[0].status, 'pending');
  assert.equal(updates[0].delta, 2509);
});

test('회귀: 이중 결제 경고 뒤에 취소가 도착하면 바로잡는다', () => {
  const { rc } = app();
  rc.onNotification(HD_APPROVE, { now: at(12, 30, 15) });
  rc.onNotification(KB_REPAY, { now: at(12, 31) });
  assert.equal(rc.tick({ now: at(12, 33, 30) })[0].status, 'double_paid');
  const { updates } = rc.onNotification('[현대카드]취소\n홍*동\n13,000원\n10/16 12:34\n스타벅스영남대정', { now: at(12, 34) });
  assert.equal(updates[0].status, 'pending');
});

test('회귀: 경고가 확정되고 이벤트가 정리돼도 놓친 혜택으로 뒤집히지 않는다', () => {
  const { rc } = app();
  rc.onNotification(HD_APPROVE, { now: at(12, 30, 15) });
  rc.onNotification(KB_REPAY, { now: at(12, 31) });
  rc.tick({ now: at(12, 45) });
  rc.onParsed({ type: 'approve', issuer: 'hd', last4: '5530', amount: 1000, merchantRaw: '없는가게', at: null }, { now: new Date(2026, 9, 18, 12, 0) });
  assert.equal(rc.open[0].result.status, 'double_paid');
});

test('회귀: 같은 결제의 문자와 앱 푸시는 한 번만 처리한다', () => {
  const { rc, wallet } = app();
  const hd = wallet.cards.find(c => c.last4 === '5530');
  const before = hd.monthSpend;
  const first = rc.onNotification(HD_APPROVE, { now: at(12, 30, 5) });
  const second = rc.onNotification(HD_PUSH, { now: at(12, 30, 6) });
  assert.ok(first.recommendation);
  assert.equal(second.recommendation, null);
  assert.equal(second.reason, 'duplicate');
  assert.equal(rc.open.length, 1);
  assert.equal(hd.monthSpend - before, 13000);
});

test('회귀: 같은 이벤트를 재전송해도 실적과 추천이 늘지 않는다', async t => {
  const s = await boot(); t.after(s.close);
  const ev = { type: 'approve', issuer: 'hd', last4: '5530', amount: 13000, merchantRaw: '스타벅스영남대', receivedAt: at(12, 29, 50).toISOString() };
  const a = await s.call('POST', '/api/events', ev);
  const b = await s.call('POST', '/api/events', ev);
  assert.ok(a.body.recommendation);
  assert.equal(b.body.recommendation, null);
  assert.equal(b.body.reason, 'duplicate');
  const w = (await s.call('GET', '/api/wallet')).body;
  assert.equal(w.cards.find(c => c.last4 === '5530').monthSpend, 363000);
});

test('회귀: 같은 카드로 취소 후 다시 결제하면 중복으로 버리지 않는다', () => {
  const { rc, wallet } = app();
  const kb = wallet.cards.find(c => c.last4 === '9421');
  const before = kb.monthSpend;
  const text = kind => `[Web발신]\nKB국민체크(9421)\n홍*동님\n10/16 12:30\n13,000원\n스타벅스영남대정 ${kind}`;
  rc.onNotification(text('사용'), { now: at(12, 30, 0) });
  rc.onNotification(text('취소'), { now: at(12, 30, 10) });
  const third = rc.onNotification(text('사용'), { now: at(12, 30, 20) });
  assert.notEqual(third.reason, 'duplicate');
  assert.equal(kb.monthSpend - before, 13000);
});

test('회귀: 60초가 지난 같은 금액 결제는 별개 결제다', () => {
  const { rc, wallet } = app();
  const kb = wallet.cards.find(c => c.last4 === '9421');
  const before = kb.monthSpend;
  rc.onNotification('[Web발신]\nKB국민체크(9421)\n홍*동님\n10/16 12:30\n4,500원\n스타벅스영남대정 사용', { now: at(12, 30) });
  rc.onNotification('[Web발신]\nKB국민체크(9421)\n홍*동님\n10/16 12:32\n4,500원\n스타벅스영남대정 사용', { now: at(12, 32) });
  assert.equal(kb.monthSpend - before, 9000);
});

test('회귀: 광고와 대화는 결제로 처리하지 않는다', () => {
  for (const text of [
    '[광고] 신한카드 스타벅스 5,000원 결제 시 20% 할인',
    '(광고)현대카드 M포인트 올리브영 30,000원 결제하면 3,000원 캐시백',
    '(광고)현대카드 올리브영 30,000원 결제 10/16 12:30까지 무료수신거부 080-000-0000',
    '신한카드로 GS25에서 3만원 결제함 12,000원 나왔어',
    '오늘 현대카드 승인 났어 빕스 74,000원 ㅋㅋ'
  ]) assert.equal(parseNotification(text, { now: at(12, 30) }), null, text);
});

test('회귀: 상호에 광고가 들어가도 실제 승인 알림은 처리한다', () => {
  const p = parseNotification('현대카드 승인 13,000원 일시불 10/16 12:30 대구광고기획', { now: at(12, 30) });
  assert.equal(p.amount, 13000);
  assert.equal(p.merchantRaw, '대구광고기획');
});
