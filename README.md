구글 캘린더의 [주별 화면]을 클론하여 구현하였습니다.

---

## 📝 설명

- 구글 캘린더의 [주별 보기] 화면을 클론합니다.
- 이벤트(일정) 추가/삭제 및 달력 반영 기능을 구현합니다.
- 서버와의 통신 없이, 프론트엔드에서만 동작합니다.

---

## ✅ 구현 범위

- 좌측 date-picker와 상단 <, > 버튼을 통한 날짜 이동
- date-picker와 주별 달력이 함께 이동 (redux로 상태 동기화)
- 달력 이동 시 기존 추가된 이벤트가 유지됨 (redux로 상태 관리)
- 주별 보기 화면만 구현 (월별/일별은 선택 사항)
- date-picker에서 날짜 선택 시, 주별 달력이 해당 주로 이동
- 일정(이벤트) 추가/삭제 (모달 창 사용, 제목/시간 입력)
- 날짜 이동 후, 일정이 있는 주간에 돌아오면 기존 일정이 표시됨
- (가산점) 반복 일정, 이벤트 중첩 구현

---

## 🛠️ 기술 스택

- React (TypeScript)
- Redux Toolkit
- SCSS (Sass)
- react-day-picker
- Prettier, ESLint

---

## 📁 폴더 구조

```
src/
  components/      # 재사용 컴포넌트 (DatePicker 등)
  features/        # Redux slice 등 상태 관리
  store/           # Redux store 설정
  styles/          # SCSS 스타일
  App.tsx
  index.tsx
```

---

## 🚀 실행 방법

1. 패키지 설치
   ```
   npm install
   ```
2. 개발 서버 실행
   - 아래 두 명령어 중 하나를 사용하세요.
   ```
   npm run dev
   ```
   또는
   ```
   npm start
   ```
   > `npm run dev`와 `npm start` 모두 개발 서버를 실행합니다. (둘 중 아무거나 사용 가능)

---

## ✨ 주요 기능

- 주간 캘린더(Week View) UI
- 좌측 DatePicker로 날짜 이동
- 상단 <, > 버튼으로 주간 이동
- 일정(이벤트) 추가/삭제 (모달)
- Redux로 상태 관리(이벤트, 날짜 등)

---

## 📋 요구사항 체크리스트

- [ ] 주간 보기 달력 구현
- [ ] DatePicker와 주간 달력 연동
- [ ] Redux로 상태 관리
- [ ] 이벤트 추가/삭제 및 유지
- [x] SCSS, Prettier 적용
- [ ] (선택) 월간 보기, 반복 일정 등
