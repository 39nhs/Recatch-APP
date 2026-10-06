# 📱 Recatch (리캐치)

> **결제 직후 1초 만에 혜택을 찾아주는 초개인화 재결제 알림 서비스**

[![Recatch Interactive Demo Page](https://api.microlink.io?url=https%3A%2F%2Fseungbeenyoo.github.io%2FRecatch-APP%2F&screenshot=true&meta=false&embed=screenshot.url)](https://seungbeenyoo.github.io/Recatch-APP/)
▲ **위 이미지를 클릭하면 실제 배포된 리캐치 웹사이트 데모로 이동합니다.**

---

[![Recatch Introduction Video](https://img.youtube.com/vi/UQjN98hyi2g/maxresdefault.jpg)](https://youtube.com/shorts/UQjN98hyi2g)
▲ **위 이미지를 클릭하면 소개 영상(YouTube Shorts)으로 이동합니다.**[cite: 9]

<br/>

<p align="left">
  <img src="https://img.shields.io/badge/Service-Recatch-blue?style=for-the-badge" alt="Service"/>
  <img src="https://img.shields.io/badge/Domain-Fintech%20%2F%20AI-green?style=for-the-badge" alt="Domain"/>
  <img src="https://img.shields.io/badge/Platform-Mobile-orange?style=for-the-badge" alt="Platform"/>
</p>

---

## 📌 Overview
**Recatch**는 결제 승인 순간, 사용자가 가진 카드·통신사·멤버십 혜택을 실시간으로 분석하여 **소비자가 놓친 최적의 할인 정보와 바코드를 결제 직후 1초 만에 팝업 알림**으로 챙겨주는 핀테크 서비스입니다[cite: 1, 3].

---

## ✨ Key Features

* ⚡ **1초 실시간 혜택 트리거**  
  결제 승인 내역 수신 즉시 해당 매장에서 적용 가능한 최적의 할인을 자동 분석합니다[cite: 5].
* 🎯 **100% 초개인화 매칭**  
  보유 카드, 전월 실적, 통신사 멤버십 등 내 프로필 기반의 맞춤형 혜택만 정밀 추출합니다[cite: 3].
* 🚀 **Zero-Depth 바코드 팝업**  
  앱 실행 및 복잡한 이동 경로 없이, 알림을 터치하는 즉시 할인 바코드가 전체 화면으로 팝업됩니다[cite: 3].

---

## 🔄 How It Works
1. 결제 완료 ──► 2. 1초 내 혜택 분석 ──► 3. 푸시 알림 발송 ──► 4. 바코드 팝업 ──► 5. 취소 후 재결제

---

## ⚠️ Known Limitations & Roadmap (한계점 및 해결 방안)

프로토타입(MVP) 단계에서 도출된 기술적/비즈니스적 한계점과 이를 단계적으로 극복하기 위한 로드맵입니다.

### 1. [Data / API] 카드사별 혜택 데이터의 비표준화 및 수집 한계
* **현상 (Problem)**: 카드사마다 혜택 표기 방식(전월 실적 조건, 할인 한도, 제외 가맹점 등)이 상이하여 자동화된 데이터 구조화가 어려움.
* **원인 (Root Cause)**: 표준화된 카드 혜택 공공 API의 부재 및 카드 상품 약관 웹페이지 구조의 빈번한 변경.
* **해결 방안 (Solution)**:
  * **단기 (MVP Stage)**: 주요 카드사 Top 10 인기 카드의 혜택 데이터를 JSON 규격으로 가공하여 반자동 구축.
  * **장기 (Scale-up Stage)**: LLM 기반 카드 약관 OCR/파싱 파이프라인을 구축하여 신규 카드 데이터 자동 업데이트 구현.

---

### 2. [Business Logic] 재결제 시 전월 실적 변동 위험성
* **현상 (Problem)**: 기존 결제건을 취소하고 타 카드로 재결제할 경우, 기존 카드의 전월 실적 미달로 인한 2차 혜택 손실 발생 가능.
* **원인 (Root Cause)**: 마이데이터 연동 전 단계에서는 사용자의 실시간 카드별 월 누적 실적 데이터를 완벽히 추적하기 어려움.
* **해결 방안 (Solution)**:
  * **단기**: 단순 결제건 대비 할인 차액만 표시하되, "전월 실적 차감 유의" 경고 문구 및 조건 선택 폼 제공.
  * **장기**: 금융 마이데이터 API 연동을 통해 사용자의 실시간 카드 실적 충족률을 고려한 종합 알고리즘 적용.

---

### 3. [UX / System] 알림 수신 후 사용자 재결제 이행률 (Drop-off Rate)
* **현상 (Problem)**: 오프라인 매장 결제 직후 알림을 받더라도, 사용자가 매장에 다시 방문하여 결제를 취소/재결제할 유인이 떨어짐.
* **원인 (Root Cause)**: 재결제 과정에서의 물리적/시간적 번거로움.
* **해결 방안 (Solution)**:
  * **단기**: 온라인 결제(쇼핑몰, 배달 앱, 예매 등 취소가 용이한 건) 중심으로 알림 시나리오 최적화.
  * **장기**: 간편결제 PG사 연동 및 앱 내 원클릭 온라인 재결제 변경 UX 구축.

---

## 🛠️ Tech Stack
* **Language & Framework:** Flutter / React Native, Node.js / Python
* **Core Engine:** Real-time Notification Parsing Engine, Rule-based Matching Engine[cite: 5]
* **AI & Hardware:** Receipt OCR, NFC Proximity Detection Module[cite: 6, 8]


