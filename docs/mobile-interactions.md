# 모바일 조작 개선

기존 정산 명세서, 카드 결제 바코드, 멤버십 패스, 배너, 내역 펼치기, 테마 전환, 재결제 완료·건너뛰기 체험을 유지합니다. 이전 버전 HTML 파일도 수정하지 않습니다.

## 화면 동작

- 분석의 업종, 혜택 순위, 월별 막대, 성공률, 놓친 혜택, 자주 놓치는 순간을 누르면 설명이나 관련 결제를 확인합니다. 개별 결제에서 혜택, 수수료, 순절약과 처리 상태를 확인합니다.
- 기존 기본 개수는 업종 4개, 혜택 순위 3개, 카드 3개, 멤버십 3개입니다. 초과하면 `전체보기 N개 · +M개`가 나타나며 높이 88%의 확장창에서 모든 항목에 접근합니다. 멤버십 바코드 패스에는 전체 멤버십을 유지합니다.
- 내역 목록과 필터 탭을 좌우로 밀면 전체 → 완료 → 확인 중 → 놓친 혜택 순으로 전환합니다. 하단 메뉴를 밀거나 다른 화면 본문을 밀면 홈 → 내역 → 분석 → 지갑으로 전환합니다. 경계에서는 멈춥니다. 세로 스크롤과 카드·멤버십·배너 레일은 별도로 처리합니다. 화살표 키와 기존 버튼도 사용할 수 있습니다.
- 조건 버튼은 추가된 이유, 변경 방법과 편집창을 제공합니다. 원래의 고정 예시 값은 자동 인증 정보로 표시하지 않습니다. 변경은 이 브라우저의 `localStorage`에 저장하며 카드·바코드와 과거 결제는 유지합니다.
- 홈 체험 패널의 문구·이미지·빈 공간은 체험을 시작하지 않습니다. 실제 체험 버튼만 동작하며 누르기 쉬운 44px 높이를 확보합니다.

## 바코드 형식

공백·하이픈만 제거해 숫자를 정규화합니다. 빈 번호, 문자 혼합, 길이 오류, 단일 숫자 반복, 이미 등록된 번호는 추가 전에 막습니다. 이름은 1~40자입니다. 번호를 비워두면 임의 번호를 생성하던 동작을 유효성 검사로 교체합니다.

기본 숫자형 8~24자리는 이 데모의 입력 정책이며 모든 멤버십의 공통 표준이라는 뜻은 아닙니다. 기존 예시의 16자리 멤버십과 12자리 학생증을 지원합니다. 서비스별 확정 길이·접두사 규칙은 실제 발급사 API가 연결될 때 추가해야 합니다.

16자리 형식의 참고 사례는 [스타벅스 공식 카드 등록 안내](https://www.starbucks.co.kr/upload/b2b/co_manual.pdf)의 16자리 카드 번호입니다. 상품용 바코드를 별도로 등록하려면 EAN-13 또는 UPC-A를 선택할 수 있으며, 이 경우에만 [GS1 검증 숫자 규칙](https://www.gs1.org/services/check-digit-calculator)을 적용합니다. 멤버십 번호에 상품 GTIN이나 은행 카드번호의 Luhn 규칙을 일괄 적용하지 않습니다. 기존 바코드 그림은 데모 표현을 그대로 유지합니다.

## 서버 연결과 실패 결과 캐시

백엔드는 아직 없습니다. 기본 동작은 형식만 확인해 데모 지갑에 추가하고 `형식 확인`으로 표시합니다. 서버 확인 완료로 표시하지 않습니다. 향후 앱 초기화 전에 아래 어댑터를 연결합니다. 반환 규약은 `{ok:true}` 또는 `{ok:false, code: ...}`입니다.

```js
window.RecatchMembershipAPI = {
  async validate({ type, name, number, format, signal }) {
    const response = await fetch('/api/wallet/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, number, format }),
      signal
    });
    // Only the API's documented definitive rejection can become a cacheable result.
    // Network errors, 5xx, rate limits and auth failures should throw or use other codes.
    if (!response.ok && response.status !== 422) throw new Error('Temporary failure');
    return response.json();
  }
};
```

`INVALID_BARCODE`, `NOT_FOUND`, `REVOKED`로 확정 거절된 결과만 24시간 동안 최대 100개 보관합니다. 같은 종류·정규화된 번호는 이름이나 표시 형식을 바꾸거나 새로고침해도 재요청하지 않습니다. 다른 종류는 별도로 처리합니다. 만료된 번호는 다시 확인할 수 있습니다. 번호의 SHA-256 해시와 실패 코드·만료 시간만 저장하며 서버 메시지·번호 원문은 저장하지 않습니다. Web Crypto가 없으면 메모리 캐시만 사용합니다. 서버 연결 실패·10초 타임아웃은 캐시하지 않아 재시도를 허용합니다. 요청 중에는 폼을 비활성화해 중복 제출을 막습니다.

인증 서버를 연결할 때는 사용자별 캐시 범위를 적용하거나 로그아웃 때 `rc-barcode-failures-v1`을 삭제해야 합니다. 데모에는 계정 기능이 없습니다. 기존 카드·멤버십 추가 데이터가 새로고침 때 초기화되는 동작은 유지합니다.

## 검증

```sh
node --test tests/wallet-validation.test.cjs
node tests/browser.test.cjs
```

브라우저 검증에는 Playwright가 필요합니다. `CHROME_PATH`로 Chrome 실행 경로를 지정할 수 있습니다. 설치한 Playwright가 외부 경로에 있으면 `NODE_PATH`를 지정합니다. `QA_OUTPUT`을 지정하면 검증 화면 PNG를 저장합니다. Windows 기본 Chrome 경로 외 환경에서는 `CHROME_PATH`를 설정합니다. 실제 서버 요청 대신 어댑터의 성공·확정 실패·연결 오류 응답을 사용해 검증합니다.
