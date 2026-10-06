<div align="left">

  <h1>💳 ReCatch (리캐치)</h1>
  <h3><font color="#2B6CB0">"놓친 카드 혜택, 더 유리한 조건으로 다시 캐치하다!"</font></h3>
  <p>결제 내역 분석 기반 맞춤형 재결제 할인 알림 및 혜택 비교 서비스</p>

  <br>

  <a href="https://seungbeenyoo.github.io/Recatch-APP/">
    <img src="https://api.microlink.io?url=https%3A%2F%2Fseungbeenyoo.github.io%2FRecatch-APP%2F&screenshot=true&meta=false&embed=screenshot.url&ttl=0&force=true" alt="Recatch Interactive Demo Page" width="100%" style="border-radius: 16px;">
  </a>
  <p>▲ <b>위 이미지를 클릭하면 실제 배포된 <u>[리캐치 웹사이트 데모]</u>로 이동합니다.</b></p>

  <br>

  <a href="https://youtube.com/shorts/UQjN98hyi2g">
    <img src="https://img.youtube.com/vi/UQjN98hyi2g/maxresdefault.jpg" alt="Recatch Introduction Video" width="100%" style="border-radius: 16px;">
  </a>
  <p>▲ <b>위 이미지를 클릭하면 <u>[소개 영상(YouTube Shorts)]</u>으로 이동합니다.</b></p>

  <br>

  <p>
    <img src="https://img.shields.io/badge/Service-Recatch-blue?style=for-the-badge" alt="Service"/>
    <img src="https://img.shields.io/badge/Domain-Fintech%20%2F%20AI-green?style=for-the-badge" alt="Domain"/>
    <img src="https://img.shields.io/badge/Platform-Mobile-orange?style=for-the-badge" alt="Platform"/>
  </p>

</div>

<hr>

<h2>📌 Project Overview (프로젝트 개요)</h2>

<p>
  <b>ReCatch</b>는 카드 결제 후 더 높은 할인이나 포인트 적립 혜택을 받을 수 있는 수단(타 카드, 이벤트, 재결제 혜택 등)이 있을 때, 이를 실시간으로 분석하여 <b>최적의 재결제 시점과 변경 혜택</b>을 안내해 주는 금융 ICT 프로토타입 서비스입니다.
</p>

<ul>
  <li><b>개발 기간</b>: 2026.09 - 진행 중</li>
  <li><b>주요 대상</b>: 여러 카드를 소지하고 있으나 결제 시점마다 최적의 혜택을 놓치는 모바일 결제 사용자</li>
  <li><b>핵심 가치</b>: 결제 후 손실되는 혜택 최소화, 복잡한 카드 조건 자동 파싱 및 추천</li>
</ul>

<hr>

<h2>✨ Key Features (주요 기능)</h2>

<ol>
  <li><b>실시간 결제 내역 분석</b>: 결제 승인 알림/가맹점 정보를 기반으로 기존 결제 건 탐지</li>
  <li><b>최적 혜택 카드 비교</b>: 사용자가 보유한 타 카드 및 진행 중인 카드사 이벤트 데이터와 비교</li>
  <li><b>재결제 혜택 알림</b>: 기존 결제 취소 후 재결제 시 얻을 수 있는 순이익(할인 금액 - 수수료/시간 비용) 추천</li>
  <li><b>마이 혜택 대시보드</b>: 월별 재결제로 절약한 누적 금액 및 카드별 실적 충족 현황 안내</li>
</ol>

<hr>

<h2>🔄 How It Works</h2>

<pre><code>1. 결제 완료  ──►  2. 1초 내 혜택 분석  ──►  3. 푸시 알림 발송  ──►  4. 바코드 팝업  ──►  5. 취소 후 재결제</code></pre>

<hr>

<h2>🛠 Tech Stack (기술 스택)</h2>

<table>
  <thead>
    <tr>
      <th align="left">구분</th>
      <th align="left">기술 스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Frontend</b></td>
      <td><code>React Native</code> / <code>Flutter</code> (모바일 앱)</td>
    </tr>
    <tr>
      <td><b>Backend</b></td>
      <td><code>Node.js (NestJS)</code> / <code>Python (FastAPI)</code></td>
    </tr>
    <tr>
      <td><b>Database</b></td>
      <td><code>PostgreSQL</code>, <code>Redis</code> (알림 큐 및 세션 관리)</td>
    </tr>
    <tr>
      <td><b>AI / Data Processing</b></td>
      <td><code>OpenAI</code> / <code>Claude API</code> (카드 혜택 데이터 파싱 & 규격화)</td>
    </tr>
    <tr>
      <td><b>Infrastructure</b></td>
      <td><code>AWS</code> / <code>Supabase</code>, <code>Docker</code>, <code>GitHub Actions</code></td>
    </tr>
  </tbody>
</table>

<hr>

<h2>⚠️ Known Limitations & Roadmap (한계점 및 해결 방안)</h2>

<blockquote>
  <i>프로토타입(MVP) 단계에서 도출된 기술적/비즈니스적 한계점과 이를 단계적으로 극복하기 위한 로드맵입니다.</i>
</blockquote>

<br>

<h4>1. [Data / API] 카드사별 혜택 데이터의 비표준화 및 수집 한계</h4>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 카드사마다 혜택 표기 방식(전월 실적 조건, 할인 한도, 제외 가맹점 등)이 상이하여 자동화된 데이터 구조화가 어려움.</li>
  <li><b><code>원인 (Root Cause)</code></b>: 표준화된 카드 혜택 공공 API의 부재 및 카드 상품 약관 웹페이지 구조의 빈번한 변경.</li>
  <li><b><code>해결 방안 (Solution)</code></b>:
    <ul>
      <li><b>[단기 - MVP Stage]</b>: <i>주요 카드사 Top 10 인기 카드의 혜택 데이터를 JSON 규격으로 가공하여 반자동 구축.</i></li>
      <li><b>[장기 - Scale-up Stage]</b>: <i>LLM 기반 카드 약관 OCR/파싱 파이프라인을 구축하여 신규 카드 데이터 자동 업데이트 구현.</i></li>
    </ul>
  </li>
</ul>

<hr>

<h4>2. [Business Logic] 재결제 시 전월 실적 변동 위험성</h4>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 기존 결제건을 취소하고 타 카드로 재결제할 경우, 기존 카드의 전월 실적 미달로 인한 2차 혜택 손실 발생 가능.</li>
  <li><b><code>원인 (Root Cause)</code></b>: 마이데이터 연동 전 단계에서는 사용자의 실시간 카드별 월 누적 실적 데이터를 완벽히 추적하기 어려움.</li>
  <li><b><code>해결 방안 (Solution)</code></b>:
    <ul>
      <li><b>[단기 - MVP Stage]</b>: <i>단순 결제건 대비 할인 차액만 표시하되, "전월 실적 차감 유의" 경고 문구 및 조건 선택 폼 제공.</i></li>
      <li><b>[장기 - Scale-up Stage]</b>: <i>금융 마이데이터 API 연동을 통해 사용자의 실시간 카드 실적 충족률을 고려한 종합 알고리즘 적용.</i></li>
    </ul>
  </li>
</ul>

<hr>

<h4>3. [UX / System] 알림 수신 후 사용자 재결제 이행률 (Drop-off Rate)</h4>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 오프라인 매장 결제 직후 알림을 받더라도, 사용자가 매장에 다시 방문하여 결제를 취소/재결제할 유인이 떨어짐.</li>
  <li><b><code>원인 (Root Cause)</code></b>: 재결제 과정에서의 물리적/시간적 번거로움.</li>
  <li><b><code>해결 방안 (Solution)</code></b>:
    <ul>
      <li><b>[단기 - MVP Stage]</b>: <i>온라인 결제(쇼핑몰, 배달 앱, 예매 등 취소가 용이한 건) 중심으로 알림 시나리오 최적화.</i></li>
      <li><b>[장기 - Scale-up Stage]</b>: <i>간편결제 PG사 연동 및 앱 내 원클릭 온라인 재결제 변경 UX 구축.</i></li>
    </ul>
  </li>
</ul>

<hr>

<h4>4. [Monetization] 리캐치 앱 없이도 적용 가능한 기본 할인에 대한 수수료 부과 문제</h4>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 사용자가 리캐치 앱의 추천이나 가이드 없이도 원래 받을 수 있었던 기본 할인(카드사 자체 기본 혜택, 매장 자동 할인 등)까지 리캐치가 창출한 성과로 인식되어 수수료가 부과될 경우 사용자 반발 발생.</li>
  <li><b><code>원인 (Root Cause)</code></b>: '사용자의 기존 결제 혜택'과 '리캐치 재결제 알림을 통해 추가로 얻은 순수 혜택 차액'을 명확히 구분하여 정산하는 로직의 미비.</li>
  <li><b><code>해결 방안 (Solution)</code></b>:
    <ul>
      <li><b>[단기 - MVP Stage]</b>: <i>기존 결제 수단으로 이미 적용된 기본 혜택을 기준선(Baseline)으로 설정하고, 리캐치 알림을 통해 재결제하여 발생한 '순수 추가 할인액(Incentive Delta)'에 대해서만 수수료 산정.</i></li>
      <li><b>[장기 - Scale-up Stage]</b>: <i>사용자의 기존 카드 혜택 데이터베이스 기반으로 '기본 제공 혜택'과 '리캐치 개입 혜택'을 정교하게 분리 검증하는 자동 정산 엔진 구축.</i></li>
    </ul>
  </li>
</ul>

<hr>

<h4>5. [Platform / OS] OS별 내역 수집 방식 차이 (Android 알림파싱 vs iOS CODEF API 비용)</h4>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 안드로이드와 iOS의 결제 내역 감지 구현 방식 차이로 인해 유저 경험의 불균형 및 운영 비용 부담 발생.</li>
  <li><b><code>원인 (Root Cause)</code></b>:
    <ul>
      <li><b>Android</b>: <i>알림 파싱(Notification Listener) 기술을 활용해 추가 비용 없이 실시간으로 카드 승인 알림 수집 가능.</i></li>
      <li><b>iOS</b>: <i>애플의 보안 및 샌드박스 정책상 앱 외부 알림 파싱이 불가능하여 CODEF API 등 외부 금융 API 연동이 필수적이며, 이로 인해 API 호출당 단가가 발생함.</i></li>
    </ul>
  </li>
  <li><b><code>해결 방안 (Solution)</code></b>:
    <ul>
      <li><b>[단기 - MVP Stage]</b>: <i>안드로이드는 알림 파싱 모듈을 통해 실시간 무료 수집을 진행하고, iOS는 결제 발생 예상 시간대나 앱 진입 시점에만 핀포인트로 CODEF API를 호출하여 호출 단가 및 비용 부담 최소화.</i></li>
      <li><b>[장기 - Scale-up Stage]</b>: <i>금융 마이데이터 API 직접 연동 및 iOS 전용 백그라운드 동기화 로직 최적화를 통해 OS 간 기능 격차와 API 연동 비용 정산 구조를 일원화.</i></li>
    </ul>
  </li>
</ul>

<hr>

<h2>📁 Project Structure (프로젝트 구조)</h2>

<pre><code>recatch-app/
├── src/
├── assets/
├── docs/
└── README.md</code></pre>
