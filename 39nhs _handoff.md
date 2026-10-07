# 39nhs 공동 수정 인계

`index.html`이 기본 데모이며 최신 버전 `index_V6.html`에 같은 내용을 유지합니다. 두 파일을 함께 수정하세요. `index_V5.html`과 이전 버전은 보존합니다. 최신 파일의 `app-version` 메타데이터는 `6`입니다. `fix/mobile-interactions` 브랜치에 커밋하면 원본 저장소 PR #1에 이어서 반영됩니다.

## 현장 지도와 사진이 필요한 위치

홈 마지막 부분의 **영남대 주변 혜택 거점** 섹션이 교체 위치입니다.

| 위치 | 현재 상태 | 실제 자료가 준비되면 필요한 변경 |
| --- | --- | --- |
| `#demoCampusMap` | 축척 없는 예시 SVG 개념도 | 실제 거점 좌표, 매장명, 지도 출처·기준일이 있는 지도 이미지 또는 지도 컴포넌트로 교체 |
| `#campusProofMedia` | 현장 사진·제휴 자료 준비 중 문구 | 동의받은 현장 사진, 촬영일, 지점명, 검증 내용과 근거 링크 삽입 |
| `CAMPUS_POINTS` | 예시 설명, `verified: false`, 빈 사진·근거 목록 | 거점별 설명, `photos`, `evidenceURLs` 입력. 근거가 있는 거점만 검증 상태 변경 |
| 지도 핀 `data-campus="0/1/2"` | 개념도상의 예시 위치 | `CAMPUS_POINTS`와 인덱스를 맞추고 실제 좌표에 맞게 변경 |

HTML과 데이터 정의 바로 위에 교체 주석을 남겼습니다. 현재 지도·사진·제휴 여부는 현장 검증 결과가 아니며, 실제 검증으로 표시하지 않습니다.

사진은 `assets/campus/` 등에 저장하고 설명 데이터는 다음 형태로 넣습니다.

```js
{
  name: '실제 확인한 지점명',
  guide: '방문일·확인 담당자·검증한 혜택 조건',
  verified: true,
  photos: [
    { src: 'assets/campus/store-entrance.jpg', caption: 'YYYY-MM-DD 촬영 · 지점 입구 (사용 동의 확인)' }
  ],
  evidenceURLs: [
    { url: 'https://실제-근거-주소', label: '검증 기록 / 제휴 확인 자료' }
  ]
}
```

`verified`만 바꾸지 마세요. 근거 링크가 있어야 상세창에 확인 자료 연결 상태가 표시됩니다. 얼굴·차량번호·영수증 개인정보가 담긴 사진은 게시 전에 사용 동의와 가림 처리를 확인하세요.

## 공동 기획서·발표자료에도 필요한 내용

공유 문서 링크는 전달받지 않아 외부 문서는 수정하지 않았습니다. 공동 기획서나 발표자료의 **영남대 상권 / 거점 현장검증** 부분에 아래 내용이 필요합니다.

- 지도 그림 위치: 현장검증 개요 바로 아래. 실제 좌표·거점명·지도 출처·확인 날짜를 포함합니다.
- 현장 이미지 위치: 지도 아래 또는 거점별 설명 옆. 실제 방문 사진과 촬영일·지점명을 붙입니다.
- 검증 표 위치: 현장 이미지 다음. 혜택 종류, 적용 조건, 확인 방법, 확인 담당자, 검증일, 근거 링크를 기록합니다.
- 실제 자료가 준비되기 전에는 ‘예시 안내 / 현장 검증 전’으로 표기합니다. 이 데모의 개념도를 실제 방문 결과로 옮겨 적지 않습니다.

## 금액과 수수료

홈은 데모 혜택 합계 **203,500원**, 성공 수수료 **40,700원(20%)**, 쿠폰 적용 전 순절약 **162,800원**을 표시합니다. 기존 시연 거래의 결제금액·혜택금액을 함께 10배로 확대했으며 실제 사용자 기록이나 확인된 카드 상품 한도가 아닙니다. `DEMO_SCALE`, `TX`, `SCEN`, `PREV`와 데모 카드 한도는 실제 데이터 연동 시 교체해야 합니다.

수수료는 `FEE = 0.2`, `feeFor`, `feeRate`를 공통으로 사용합니다. 완료 건에만 부과하며 확인 중·놓친 혜택에는 부과하지 않습니다. 카드별 내역은 혜택 출처(`srcKey`)를 기준으로 집계합니다. 첫 달 1,000원 쿠폰은 별도 할인으로 유지하고, 할인액이 실제 수수료를 넘지 않게 제한합니다.

## 카드사 로고

로고는 원본을 변형하지 않고 흰색 바탕 위에 원본 비율로 표시합니다.

| 카드사 | 로컬 파일 | 공식 원본 | 참고 페이지 |
| --- | --- | --- | --- |
| KB국민카드 | `assets/brands/kb-logo.png` | [공식 헤더 로고](https://img1.kbcard.com/LT/images_r/common/kbcard_Logo_v3.png) | [공식 CI 안내](https://card.kbcard.com/SVC/DVIEW/HSJMCXCROCIC0025) |
| 신한카드 | `assets/brands/sh-logo.png` | [공식 국문 시그니처](https://www.shinhancard.com/pconts/company/images/contents/shc_ci_basic_00.png) | [공식 CI 안내](https://www.shinhancard.com/pconts/company/html/promotion/CI/ci_basic.html) |
| 현대카드 | `assets/brands/hd-logo.svg` | [공식 헤더 로고](https://www.hyundaicard.com/docfiles/resources/pc/images/common/logo/logo_HC.svg) | [공식 사이트](https://www.hyundaicard.com/main/main.hc) |

`BRAND_ASSETS`와 `bankLogo`가 홈·지갑·카드 상세에 로고를 표시합니다. 새 카드의 로고는 원본 파일을 저장하고 카드 ID와 경로를 등록합니다.

## 유지할 스와이프 동작

작은 탭·결제 목록·목록 아래 빈 공간의 스와이프를 유지해야 합니다. `전체`에서 오른쪽으로 더 밀면 홈으로, `놓친 혜택`에서 왼쪽으로 더 밀면 분석으로 넘어갑니다. 항목이 없어도 `#historySwipe`가 하단까지 펼쳐지고 ‘아무것도 없어요’를 표시해야 합니다. 하단 메뉴는 별도로 주요 화면 스와이프를 처리합니다.

## 확인 방법

`node --test tests/wallet-validation.test.cjs`와 Playwright가 준비된 환경에서 `node tests/browser.test.cjs`를 실행합니다. 기본 화면과 V6의 일치, 작은 탭 및 큰 탭 스와이프, 빈 내역 영역, 수수료·카드별 집계, 큰 금액 배치, 로고 로딩과 기존 재결제 기능을 확인합니다.
