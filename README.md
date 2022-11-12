# slack 클론코딩

인프런 ZeroCho 리액트 슬랙 클론코딩 강의를 바탕으로 진행합니다

## 학습목표

1. CRA을 사용하지 않고 처음부터 간단하게라도 eslint, prettier, babel, webpack 셋팅을 따라하면서 이해
2. typescript 기초는 학습한 상태인데 프로젝트에서 어떻게 적용하는지 학습
3. 강좌에서는 SWR을 사용하고 있는데 tanstack-query(react-query)로 진행해보기
4. 버전 변화에 따른 에러 공식문서보면서 해결하기 (ex: react-router 등)
5. 모든 라이브러리들이 시간이 지나면서 바뀌기 때문에 강의를 따라하면서 공식문서를 같이 보는 습관 기르기
6. 폴더구조, 커스텀 훅 작성 등 리액트 학습

## 폴더구조

```폴더구조
📦front
 ┣ 📂components
 ┣ 📂hooks
 ┃ ┗ 📜useInput.ts
 ┣ 📂layouts
 ┃ ┗ 📜App.tsx
 ┣ 📂pages
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.tsx
 ┃ ┣ 📂SignUp
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.tsx
 ┣ 📂types
 ┣ 📂utils
```

## 버전변화에 따른 수정사항

1. react-router v6 업데이트에 따른 코드 수정
  `<Switch>` 를 `<Routes>` 으로 변경
  경로에 맞는 컴포넌트를 등록할 때 속성 값이 `componet` 에서 `element`으로 변경
  v5에선 정확한 경로를 지정하기 위해 exact 을 사용했지만 v6 에서는 default로 exact가 적용
  v6에선 Redirect를 삭제하고 Navigate를 사용하여 리다이렉트가 이뤄지도록 변경 default, push의 속성 값이 replace, default로 변경됨

## 진행기록

11/11 : MAC환경에서 back(MySQL), front(eslint, webpack, babel, preittier) 기본 셋팅 후 폴더 생성<br>
11/12 : 코드스플리팅, react-router v6 에 맞춰서 바뀐 부분 수정, 회원가입부분구현 & 중복부분 useInput 훅으로 빼기, axios proxy설정
