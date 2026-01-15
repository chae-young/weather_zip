# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**weather_zip**: 날씨 정보 + 코디 추천 + 기록을 동시에 할 수 있는 모바일 퍼스트 웹 애플리케이션

주요 기능:
- 현재 날씨 정보 및 온도별 옷차림 추천
- 사용자의 옷차림 기록 저장 및 관리
- 다른 유저들과 옷차림 기록 공유
- 온도별 기록 필터링
- 이미지 태그 등록 기능

## 주요 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드 (번들 분석 포함)
npm run build

# 번들 분석 없이 빌드
ANALYZE=false npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 기술 스택 및 구조

### 프레임워크 및 라이브러리
- **Next.js 13**: App Router 사용 (SSR + CSR 하이브리드 패턴)
- **React 18**: 클라이언트 컴포넌트
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 스타일링
- **Recoil**: 전역 상태 관리
- **SWR**: 데이터 페칭 및 캐싱
- **Firebase**: 백엔드 (Firestore + Authentication)
- **Firebase Admin SDK**: 서버 측 인증 및 데이터 접근

### 핵심 아키텍처 패턴

#### 1. Server/Client 컴포넌트 분리
- **서버 컴포넌트**: 초기 데이터 페칭 및 레이아웃 구성 (`page.tsx`)
- **클라이언트 컴포넌트**: 상호작용이 필요한 컴포넌트 (`'use client'` 지시어)
- 로직은 서버에서 초기 데이터를 받고, 하위 컴포넌트를 클라이언트로 만들어 필요시 상태 관리

#### 2. SSR + CSR 인피니트 스크롤 패턴
- 서버 컴포넌트에서 초기 데이터 10개 페칭
- 클라이언트 컴포넌트에서 인터섹션 옵저버로 추가 데이터 페칭
- 예: `(share)/weatherLogs/` 페이지 구조 참고

#### 3. Firebase 인증 흐름
- 클라이언트에서 Firebase 토큰 획득
- `/api/login` 엔드포인트로 토큰 검증 후 세션 쿠키 생성
- 세션 쿠키는 httpOnly, secure 플래그로 보호
- 보호된 페이지 접근시 `middleware.ts`에서 검증

## 폴더 구조

```
src/
├── app/
│   ├── (account)/              # 인증 관련 페이지 (그룹)
│   │   ├── login/
│   │   └── join/
│   ├── (share)/                # 커뮤니티 페이지 (그룹)
│   │   └── weatherLogs/        # 다른 사용자들의 기록
│   ├── user/                   # 로그인 사용자 전용 페이지 (미들웨어 보호)
│   │   ├── collection/         # 사용자의 기록 모음
│   │   ├── mypage/             # 프로필 정보
│   │   ├── profile/            # 프로필 수정
│   │   ├── recordDetail/       # 특정 기록 상세
│   │   └── write/              # 새 기록 작성
│   ├── home/                   # 메인 페이지
│   ├── api/                    # API 엔드포인트
│   │   ├── login/              # 세션 쿠키 생성
│   │   ├── logout/
│   │   └── auth/               # 인증 관련
│   ├── _components/            # 모든 페이지에서 사용되는 공통 컴포넌트
│   │   ├── common/             # Nav, InfiniteScroll 등
│   │   ├── Button/
│   │   ├── collection/
│   │   └── ...
│   └── providers/              # 컨텍스트/제공자 (Recoil, Toast)
├── hooks/
│   ├── swr/                    # SWR 데이터 페칭 훅
│   └── ...                     # 커스텀 훅
├── recoil/
│   └── atom/                   # 전역 상태 (사용자, 온도, 태그 등)
└── middleware.ts               # Next.js 미들웨어 (user/ 경로 보호)
```

## 데이터 페칭 패턴

### Server Component 데이터 페칭
```typescript
// 서버 컴포넌트에서 초기 데이터 페칭
const MyComponent = async () => {
  const data = await fetchWeatherLogs({ dataLimit: 10, lastDoc: null })
  return <LoadMoreLogs initialData={data} />
}
```

### Client Component SWR 훅
- `src/hooks/swr/` 디렉토리의 훅들 사용
- 추가 데이터는 클라이언트에서 페칭
- 예: `useGetCurrentWeather`, `useGetCollection`

## 상태 관리

### Recoil Atoms
- `userAtom`: 현재 사용자 정보 (uid, email, nickname)
- `currentTempAtom`: 현재 기온
- `imageTagsAtom`: 이미지 태그 위치
- `collectionAtom`: 사용자 컬렉션

### 사용 패턴
```typescript
import { useRecoilState } from 'recoil'
import userAtom from '@/recoil/atom/userAtom'

const MyComponent = () => {
  const [user, setUser] = useRecoilState(userAtom)
  // ...
}
```

## 스타일링

- **Tailwind CSS** 사용
- 커스텀 색상: `pointColor`, `pointBg` 등 (tailwind.config에 정의)
- 기본 폰트: G Market Sans (로컬 폰트 - `src/app/fonts/`)
- 반응형: 2칸 들여쓰기, 모바일 퍼스트 설계

## 중요한 개발 고려사항

### Next.js 13 App Router 특성
- 서버/클라이언트 컴포넌트의 경계를 명확히
- 데이터 페칭은 가능한 서버에서
- 인터랙션이 필요한 부분만 클라이언트 컴포넌트로 분리

### Firebase 보안
- 환경변수: `NEXT_PUBLIC_*`는 클라이언트에 노출됨
- API 키, 시크릿은 `.env.local` (Git 무시)
- 세션 쿠키는 httpOnly로 설정되어 XSS 공격 방지

### 성능 최적화
- 이미지 도메인: `firebasestorage.googleapis.com` (next.config에 설정)
- 이미지 포맷: AVIF, WebP 지원
- 번들 분석: `npm run build`로 실행 가능

### 코드 스타일
- ESLint: airbnb-typescript 규칙
- Prettier: 세미콜론 제거, 싱글 쿼트, 탭 2칸
- 코드 주석, 커밋 메시지: 한국어

## 디버깅 팁

### 미들웨어 문제
- `/user/` 경로는 세션 쿠키가 필수 (`middleware.ts` 참고)
- 쿠키 만료: 5일 (`api/login/route.tsx`)

### 데이터 페칭 문제
- SWR 훅은 자동 재검증 비활성화 설정 (`revalidateOnFocus: false`)
- 초기 데이터는 서버에서 페칭, 추가 데이터는 클라이언트에서

### 이미지 태그 기능 (Drag & Drop)
- 마우스 이벤트: `useImageMouseEvent`
- 터치 이벤트: `useImageTouchEvent`
- 두 훅 모두 구현되어 있음 (PC + 모바일 지원)
