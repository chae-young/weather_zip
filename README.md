<img src="https://github.com/chae-young/weather_zip/assets/28029685/86f1836b-71f9-4bdb-b59f-8c55133fcf09" width="300">
<img src="https://github.com/chae-young/weather_zip/assets/28029685/b883269f-1877-4321-8ef0-b6d4dc6a7782" width="1000">

**날씨 정보 + 코디 + 기록을 동시에 할 수 있는 하나의 웹어플리케이션**

**<span style="color:#ff8383">✨📱모바일 퍼스트로 구현 되어있습니다✨</span>**

[📗 프로젝트 노션](https://fixed-rubidium-143.notion.site/zip-65f6d8180154439d9b2e0a6b66cca371?pvs=4)  
[📗 백로그](https://fixed-rubidium-143.notion.site/324c268d222c43b39c19b23e184300b9?pvs=4)  
[📗 디자인](https://fixed-rubidium-143.notion.site/b8ae4f9e701d4337a32dd35d7887a9f6?pvs=4)

<br/>

## 목차

[1.프로젝트 소개](#프로젝트-소개)  
[2.주요 기능](#주요-기능)  
[3.기능 미리보기](#기능-미리보기)  
[4.구현 과정](#구현-과정)  
[5.트러블 슈팅](#트러블-슈팅)  
[6.스프린트](#스프린트)  
[7.기술 스택](#기술-스택)

<br/>

## 프로젝트 소개

오늘 날씨에는 뭘입어야해?? 내가 저번 날씨엔 뭘입었지??  
하나의 웹 어플리케이션으로 날씨 정보 + 코디 + 기록을 동시에!

🚩프로젝트 기간 : 2023.11.6 ~ 2023.12.1 (현재 최적화 진행중)

<br/>
<br/>

## 주요 기능

- ☀️ 현재 날씨 정보 ☁️
- 현재 날씨를 기준으로 옷차림 추천
- 현재 날씨를 기준으로 옷차림을 기록
- 현재 날씨를 기준으로 내가 기록했던 옷차림을 확인 할 수 있음.(10개 까지)
- 다른 유저들과 기록 공유 가능
- 온도별로 내 기록을 조회할 수 있는 필터기능
- 프로필 닉네임 수정
- 🏷️ new 12.22 이미지 업로드시 태그 등록 가능

<br/>
<br/>

## 기능 미리보기

|                                           이메일계정/소셜 로그인                                            |                                             프로필 닉네임 수정                                              |
| :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/chae-young/weather_zip/assets/28029685/9c982183-27f6-40b7-82a9-4c152fd91f4e"/> | <img src="https://github.com/chae-young/weather_zip/assets/28029685/39e5390b-642a-4191-843d-68242955d760"/> |
|                                         현재 날씨 기준 옷차림 추천                                          |                                     비슷한 온도 옷차림 안내 (로그인 후)                                     |
| <img src="https://github.com/chae-young/weather_zip/assets/28029685/0e9560b3-c397-474e-b744-853dc8ba6695"/> | <img src="https://github.com/chae-young/weather_zip/assets/28029685/b7e2e1c8-e50c-4d41-99be-1ef8df5c5422"/> |
|                                           다른 유저들과 피드 공유                                           |                                           필터 기능(온도별 기준 )                                           |
| <img src="https://github.com/chae-young/weather_zip/assets/28029685/6424670f-71ba-425a-b4d1-e2c1aa8d63c6"/> | <img src="https://github.com/chae-young/weather_zip/assets/28029685/be0c6b00-42a8-41aa-8aa5-33986e702648"/> |
|                                                 옷차림 기록                                                 |                                             현재 날씨 정보 조회                                             |
| <img src="https://github.com/chae-young/weather_zip/assets/28029685/1ef96dea-5ba4-4aaf-bbe0-6e5a9423fba8"/> | <img src="https://github.com/chae-young/weather_zip/assets/28029685/0e9560b3-c397-474e-b744-853dc8ba6695"/> |
|                                          이미지 업로드시 태그 등록                                          |                                                                                                             |
| <img src="https://github.com/chae-young/weather_zip/assets/28029685/0c571df1-2d93-4c89-906e-6b1c9c2fd69c"/> |                                                                                                             |

<br/>
<br/>

## 구현 과정

### 1. Next.js app router vs page router 고민

Next.js를 사용하게 되면서 어떤 라우터를 사용해야 할지 고민했다.
결과적으로 app router를 채택한 이유.

- getServerSideProps() getStaticProps() getStaticPaths()를 서버 컴포넌트와 fetch API로 대체 할 수 있다.
- 스트리밍 기능
  - 렌더링 전 모든 데이터를 가져오는게 아니라 각 컴포넌트가 준비 되는 즉시 각 컴포넌트를 렌더링 한다.
  - 최적화 및 상호작용에 좋다
- fetch API로 서버에서 데이터를 가져 올 수 있다.
- Next.js 에서 새로운 프로젝트는 App router를 사용 할 것을 권장.
- 많은 페이지나 복잡한 기능이 들어가지 않는 프로젝트라 안정성을 크게 고려하지 않음

사실 app router를 사용하면서 오류도 많고..나온지 얼마 안되서 레퍼런스도 많이 없다보니 프로젝트를 하면서 애를 먹었다.😢  
학습을 하면서 프로젝트를 만들다 보니 app router에 특화된 기능도 제대로 사용을 못한 것 같다.  
특히 제일 어려웠던 점이 서버컴포넌트 클라이언트 컴포넌트 중에 어떤걸 사용해야 하는 가? 다.  
결론적으로 로직을 서버컴포넌트에서 초기에 데이터를 받고 하위 컴포넌트를 클라이언트 컴포넌트로 만들어 데이터 가공이 필요할시 state를 사용하는 방벙으로 구현했다.  
추가적으로 계속 학습을 하면서 최적화를 시도해봐야 할 것 같다.
<br/>

### 2. 인피니트 스크롤은 SSR+CSR로 구현하기

초반에 인피니트 스크롤은 사용자의 상호작용에 의해서 발생하는 거기 때문에 swr의 useSWRInfinite를 사용했다.  
그런데 문득 드는 생각이 그러면 서버 컴포넌트를 쓸일이 없는거 아닌가..? 리액트아냐? 라는 생각이 들면서 써치를 하기 시작!!!  
SSR+CSR을 조합해서 인피니트 스크롤을 구현해야 하는것!!

```
const WeatherLogs = async () => {
  const weatherLogs = await fetchWeatherLogs({ dataLimit: 10, lastDoc: null })
```

서버 컴포넌트에서 초기에 데이터를 가져온다.

```
const LoadMoreLogs = ({ lastDoc, firstDataLength }: LoadMoreLogsProps) => {
 ... 로직 생략

  const fetchMoreData = async () => {
    if (loaedMoreLastDac) {

      fetchWeatherLogs({
        dataLimit: 10,
        lastDoc: lastDocTimestamp(loaedMoreLastDac),
      })
    ... 로직 생략
    }
  }

  return (
    <>
      <WeatherLogList weatherLogs={weatherLogs} />
      {!(dataLength < 10) && <InfiniteScroll fetchMoreData={fetchMoreData} />}
    </>
  )
}
```

LoadMoreLogs가 스크롤시 데이터를 불러오고 있는 클라이언트 컴포넌트다.  
InfiniteScroll 컴포넌트에서 화면 뷰포트에 닿을시 fetchWeatherLogs함수가 실행되면서 추가 데이터를 불러온다.  
프로젝트내 인피니트 스크롤이 들어가는 페이지는 위와 같은 로직으로 구현했다.
이런식으로 진행하면 초기에는 서버에서 10개의 데이터를 불러오고 사용자의 상호작용이 있을시 클라이언트에서 추가적으로 데이터를 불러오게 된다.
<br/>

### 3. drag and drop API로 라이브러리 최소화 하기

HTML5에서는 [drag and drop API](https://www.w3schools.com/html/html5_draganddrop.asp)를 제공한다. 별도의 라이브러리 필요없이 구현 할 수 있다.

```
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useImageTouchEvent(ref, imageSize, setTags)
  const { handleMouseMove, handleMouseDown, handleMouseUp } =
    useImageMouseEvent(ref, imageSize, setTags)
```

모바일과 pc에서 동시에 동작할 수 있도록 두개의 **hook** 으로 만들었다.

- useImageMouseEvent : pc에서 사용하는 mouse 이벤트
- useImageMouseEvent : 모바일에서 사용하는 touch 이벤트

<br/>

```
<li key={tag.id}>
    <button
    id={tag.id}
    onClick={handleClickTag}
    draggable
    onDragStart={handleMouseDown}
    onDragOver={(e) =>
        handleMouseMove && handleMouseMove(e, { x: tag.x, y: tag.y })
    }
    onDragEnd={handleMouseUp}
    onTouchStart={handleTouchStart}
    onTouchMove={(e: React.TouchEvent<HTMLButtonElement>) =>
        handleTouchMove && handleTouchMove({ x: tag.x, y: tag.y })(e)
    }
    onTouchEnd={handleTouchEnd}
    style={{
        left: tag.x,
        top: tag.y,
    }}
    className={`tag-button bg-pointColor absolute z-10 text-body3 py-1 px-2 rounded-lg -translate-x-1/2 -translate-y-1/2`}
    >
    {tag.name}
    </button>
</li>
```

드래그 대상인 button에 draggable을 넣고 이벤트를 넣어주면 된다.

> ~start: 사용자가 터치 또는 마우스를 놓는 순간  
> ~Move,over: 사용자가 터치 또는 마우스를 움직일때  
> ~End: 사용자가 터치 또는 마우스를 뗄떄

touch 조작은 쉽다. 구현하면서 오류가 크게 생기지 않았다.  
원레 onMouseMove를 사용했었는데 드래그가 이상하게 동작했다. 알고보니 onMouseMove는 커서의 움직임을 감지하는 이벤트이고 onDragOver는 드래그된 요소의 위치를 감지하는 동작 이벤트였다.  
이것땜에 시간을 꽤 잡아먹었다,,;;  
태그 위치가 움직이면 style에 position left, top이 바뀌도록 했고 해당 위치가 저장이 되면 db에 저장 되도록 태그 기능을 구현했다.
<br/>

### 4. 폴더 구조에 대해서...📁✏️

```
📦app
 ┣ 📂(account)
 ┃ ┣ 📂join
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂_conponents
 ┃ ┃ ┃ ┣ 📜AccountSignIn.tsx
 ┃ ┃ ┃ ┗ 📜SocialSiginIn.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜.DS_Store
 ┣ 📂(share)
 ┃ ┗ 📂weatherLogs
 ┃ ┃ ┣ 📂@logs
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜LoadMoreLogs.tsx
 ┃ ┃ ┃ ┗ 📜WeatherLogList.tsx
 ┃ ┃ ┣ 📜fetchWeatherLogs.ts
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜loading.tsx
 ┣ 📂_components
 ┃ ┣ 📂Recommend
 ┃ ┣ 📂Weather
 ┃ ┣ 📂collection
 ┃ ┃ ┗ 📂ImageFeed
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜InfiniteScroll.tsx
 ┃ ┃ ┣ 📜InnerCon.tsx
 ┃ ┃ ┣ 📜Nav.tsx
 ┃ ┃ ┣ 📜Spin.tsx
 ┃ ┃ ┗ 📜TopTitle.tsx
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜fetchRecommendList.ts
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂user
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂@userInfo
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜CategoryList.tsx
 ┃ ┃ ┃ ┗ 📜CollectionLengInfo.tsx
 ┃ ┃ ┣ 📜fetchCollectionLeng.ts
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜fetchUser.ts

```

\*대략적인 폴더구조

- Next.js 13 부터 라우트를 그룹화 할 수 있다.
- 계정관련은 account로 그룹화 하고 사용자들이 share하는 페이지는 share로 그룹화.
- 미들웨어를 사용중이기 때문에 로그인시 접근 가능한 페이지는 user 폴더에서 라우팅 관리.
- 페이지내에서 사용하는 컴포넌트들은 해당 페이지 폴더내 \_components 폴더로 따로 빼서 사용. 여러 페이지에서 사용 되거나 사용 될수 있는 컴포넌트들은 app/\_conponents에서 관리.  
  <br/>

### 5. 서버에서 로그인 하기

파이어베이스로 백엔드를 구현하고 있는데 로그인을 파이어베이스에서 제공하는 로그인으로 구현했었다.  
그런데 로그인후 데이터를 받아오려고 하니 로그인이 잘못됬는지 받아오지 못하고 있었다. 알고보니 파이어베이스에서 기본적으로 제공하는 로그인은 클라이언트측 로그인이었다.  
firebase의 admin을 사용해 서버에서 사용자를 인증후 데이터를 가져와야 했다.  
기본적으로 SSR 환경에서는 보안적인 측면으로 인해 세션 쿠키 방식의 로그인을 사용해야 한다고 함.

```
// 로그인
  const siginIn = async (e: React.FormEvent) => {

      const credential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await credential.user.getIdToken()
      const responsePromise = fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
  }

// api
export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization')

  if (authorization?.startsWith('Bearer')) {
    const idToken = authorization.split('Bearer ')[1]
    const decodedToken = await auth().verifyIdToken(idToken)

    if (decodedToken) {
      //세션 쿠키 생성
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      })
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      }
      //브라우저에 쿠키 추가
      cookies().set(options)
    }
  }

  return NextResponse.json({}, { status: 200 })
}
```

- 로그인시 파이어베이스가 사용자의 토큰을 제공.
- 토큰을 서버로 전달 -> 유효한지 확인후 쿠키에 저장
- 로그인 후 사용자의 접근이 필요한 데이터 요청시 사용자의 토큰을 확인.
- 유효하지 않은 토큰일시 로그인 페이지로 리다이렉트

위와 같이 구현했다. 사실 파이어베이스 admin으로 Next.js에서 로그인 구현하는게 처음이고 어렵기도 하고 헷갈려서 여러 블로그를 참고해서 코드를 작성했다.  
그래도 어떤 로직으로 로그인이 되고 있구나를 알게되서 꽤 흥미로운 구현 경험이었다.

<br/>
<br/>

## 트러블 슈팅

- [크롬에서 geolocation api로 현재 위치(위도 경도) 가져올때 3~5초 로딩이 느림 → 스켈레톤으로 UX 개선](https://fixed-rubidium-143.notion.site/geolocation-api-3-5-UX-eb35004197cb43d28fffcc184084fab2?pvs=4)
- [탭 클릭시 로딩이 3초~10초 까지 걸리는 이슈 → CSR 렌더링 방식으로 변경](https://fixed-rubidium-143.notion.site/3-10-CSR-2c0c6a7cf42b45449c94c7a55fbe6ba1?pvs=4)
- [이미지 최적화로 라이트하우스 LCP 개선](https://fixed-rubidium-143.notion.site/LCP-7295590eb7f44c86bb4978c3b548ecbf?pvs=4)
- [Next.js 13 클라이언트 컴포넌트에서 data fetch는 어떻게 해야 할까](https://chaeyoung2.tistory.com/127)
- [Next.js 13 로컬 폰트 사파리에서 적용 안되는 이슈 (+Tailwind와 함께 사용)](https://chaeyoung2.tistory.com/128)
- [parallel route 사용했더니 First Load JS가 🔴200kb -> 🟢80kb대로](https://chaeyoung2.tistory.com/130)

<br/>
<br/>

## 스프린트

<img src="https://github.com/chae-young/weather_zip/assets/28029685/72ca039a-58bc-4d74-88bc-afd643a7cb5e">

<br/>
<br/>

## 기술 스택

<img width="598"  src="https://github.com/chae-young/weather_zip/assets/28029685/46489f34-2137-41fe-8329-0fc58403535a">

\*open API: openweather
