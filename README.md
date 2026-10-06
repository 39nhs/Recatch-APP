<div align="center">

  <h1>💳 Recatch (리캐치)</h1>
  <h3><font color="#2B6CB0">결제 직후 1초 만에 혜택을 찾아주는 초개인화 재결제 알림 서비스</font></h3>

  <a href="https://seungbeenyoo.github.io/Recatch-APP/">
    <img src="https://api.microlink.io?url=https%3A%2F%2Fseungbeenyoo.github.io%2FRecatch-APP%2F&screenshot=true&meta=false&embed=screenshot.url" alt="Recatch Interactive Demo Page" width="100%">
  </a>
  <p>▲ <b>위 이미지를 클릭하면 실제 배포된 <u>[리캐치 웹사이트 데모]</u>로 이동합니다.</b></p>

  <br>

  <a href="https://youtube.com/shorts/UQjN98hyi2g">
    <img src="https://img.youtube.com/vi/UQjN98hyi2g/maxresdefault.jpg" alt="Recatch Introduction Video" width="100%">
  </a>
  <p>▲ <b>위 이미지를 클릭하면 <u>[소개 영상(YouTube Shorts)]</u>으로 이동합니다.</b></p>

  <br>

  <p align="left">
    <img src="https://img.shields.io/badge/Service-Recatch-blue?style=for-the-badge" alt="Service"/>
    <img src="https://img.shields.io/badge/Domain-Fintech%20%2F%20AI-green?style=for-the-badge" alt="Domain"/>
    <img src="https://img.shields.io/badge/Platform-Mobile-orange?style=for-the-badge" alt="Platform"/>
  </p>

</div>

<hr>

<h2>📌 Overview</h2>

<p>
  <b>Recatch</b>는 결제 승인 순간, 사용자가 가진 <b><u>카드·통신사·멤버십 혜택</u></b>을 실시간으로 분석하여 
  <b><font color="#D69E2E">소비자가 놓친 최적의 할인 정보와 바코드를 결제 직후 1초 만에 팝업 알림</font></b>으로 챙겨주는 핀테크 서비스입니다.
</p>

<hr>

<h2>✨ Key Features</h2>

<ul>
  <li>
    ⚡ <b><font size="3">1초 실시간 혜택 트리거</font></b><br>
    <i>결제 승인 내역 수신 즉시 해당 매장에서 적용 가능한 최적의 할인을 자동 분석합니다.</i>
  </li>
  <br>
  <li>
    🎯 <b><font size="3">100% 초개인화 매칭</font></b><br>
    <i>보유 카드, 전월 실적, 통신사 멤버십 등 내 프로필 기반의 맞춤형 혜택만 정밀 추출합니다.</i>
  </li>
  <br>
  <li>
    🚀 <b><font size="3">Zero-Depth 바코드 팝업</font></b><br>
    <i>앱 실행 및 복잡한 이동 경로 없이, 알림을 터치하는 즉시 할인 바코드가 전체 화면으로 팝업됩니다.</i>
  </li>
</ul>

<hr>

<h2>🔄 How It Works</h2>

<pre><code>1. 결제 완료  ──►  2. 1초 내 혜택 분석  ──►  3. 푸시 알림 발송  ──►  4. 바코드 팝업  ──►  5. 취소 후 재결제</code></pre>

<hr>

<h2>⚠️ Known Limitations & Roadmap (한계점 및 해결 방안)</h2>

<blockquote>
  <i>프로토타입(MVP) 단계에서 도출된 기술적/비즈니스적 한계점과 이를 단계적으로 극복하기 위한 로드맵입니다.</i>
</blockquote>

<br>

<h3>1. [Data / API] 카드사별 혜택 데이터의 비표준화 및 수집 한계</h3>
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

<h3>2. [Business Logic] 재결제 시 전월 실적 변동 위험성</h3>
<ul>
  <li><b><code>현상 (Problem)</code></b>: 기존 결제건을 취소하고 타 카드로 재결제할 경우, 기존 카드의 전월 실적 미달로 인한 2차 혜택 손실 발생 가능.</li>
  <li><b><code>원인 (Root Cause)</code></b>: 마이데이터 연동 전 단계에서는 사용자의 실시간 카드별 월 누적 실적 데이터를
