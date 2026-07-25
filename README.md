# 라온이의 독서 노트 📚

라온이가 가진 전집/시리즈 도서 목록(아우라 한국사, 인물 세미나, 자연이랑, 요술 항아리 등)과
필독서 리스트를 기반으로 만든 독서 체크 앱입니다. 책을 읽으면 체크하고 별점을 매기고,
시리즈에 없는 책은 자유 독서 일지에 자유롭게 기록할 수 있어요.

## 로컬에서 실행하기

```bash
npm install
npm run dev
```

`http://localhost:5173` 접속. 기본적으로는 **이 브라우저(이 기기)에만** 기록이 저장됩니다
(localStorage). 여러 기기(엄마 폰, 아빠 폰, 태블릿)에서 같은 기록을 보려면 아래 Firebase
설정이 필요해요.

## 여러 기기 동기화 설정 (선택, Firebase)

1. https://console.firebase.google.com 에서 새 프로젝트를 만듭니다 (무료 Spark 요금제로 충분).
2. 왼쪽 메뉴 **Authentication → Sign-in method** 에서 **익명(Anonymous)** 로그인을 사용 설정합니다.
3. **Firestore Database** 를 만듭니다 (프로덕션 모드로 시작해도 됨). 규칙(Rules) 탭에서 아래처럼
   설정하세요 (익명 로그인만 확인, 특정 가족 코드를 아는 사람만 접근한다고 가정한 간단한 규칙):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /rooms/{roomId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
4. 프로젝트 설정(⚙️) → **일반** → 내 앱 → **웹 앱 추가**. 표시되는 `firebaseConfig` 값을
   복사합니다.
5. 로컬 개발: `reading-app/.env.example` 을 복사해 `.env.local` 로 저장하고 값을 채웁니다.
6. 배포본(GitHub Pages): 저장소 **Settings → Secrets and variables → Actions** 에서 아래 6개
   시크릿을 등록합니다 (이름은 `.env.example`과 동일):
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
   `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.
   등록 후 Actions 탭에서 워크플로를 다시 실행(재배포)하면 반영됩니다.
7. 앱 오른쪽 위 동기화 배지를 눌러 **가족 코드**를 만들고, 다른 기기에서도 같은 코드를 입력하면
   기록이 함께 보여요. 코드는 비밀번호가 아니라 "같은 방을 찾는 이름표" 역할이라, 짧고 고유한
   문자열을 추천해요 (예: `raon-family-2026`).

Firebase를 설정하지 않아도 앱은 정상적으로 동작합니다 (기기별 로컬 저장).

## 배포 (GitHub Pages)

`main` 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로가 자동으로 빌드하고
GitHub Pages에 배포합니다. 저장소 **Settings → Pages → Build and deployment → Source** 를
**GitHub Actions** 로 설정해야 최초 1회 활성화됩니다.

## 데이터 출처

- `src/data/catalog.json` 은 `라온이 독서노트.pptx` 와 `basic_book_list.csv` 에서 추출한
  도서 목록입니다. 아직 도착하지 않은 책(제목 미정)은 앱에서 "+ 책 도착하면 제목 입력" 버튼으로
  나중에 채울 수 있어요.
