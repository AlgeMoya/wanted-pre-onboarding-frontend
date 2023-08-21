# 원티드 프론트엔드 프리온보딩 인턴십 선발과제

- https://www.wanted.co.kr/events/pre_ob_fe_12?t=1692094248252#noticeContainer <br />
- https://github.com/walking-sunset/selection-task

프로젝트의 실행 방법
- `git clone https://github.com/AlgeMoya/wanted-pre-onboarding-frontend.git`
- `cd wanted-pre-onboarding-frontend`
- `npm install`
- `npm start`

데모 영상
<br />
<br />
<img src="https://github.com/AlgeMoya/wanted-pre-onboarding-frontend/assets/8746067/17da9a00-28f8-41a1-ac48-dd097cbc0ebd" width=50%/>

배포 링크
- https://wanted-pre-onboarding-frontend-pi-one.vercel.app/

구현 사항
- JWT 토큰을 사용한 로그인, 회원가입 로직 개발
  - 회원가입, 로그인 폼 작성 시 이메일 조건, 비밀번호 조건 등의 유효성 검사
  - 유효성 검사 여부에 따른 가입 및 로그인 버튼 비활성화
  - 응답받은 JWT 토큰을 localStorage에 저장하여 관리
  - React Router를 사용한 로그인 여부에 따른 페이지 리다이렉팅
- React Router를 사용한 라우팅
  - 로그인 여부에 따른 페이지 리다이렉팅
  - 토큰이 없는 상태에서의 Todo List 페이지 접속, 토큰이 있는 상태에서의 회원가입, 로그인 페이지 접속 등을 차단 후 리다이렉트
- API 스펙에 따른 Todo 애플리케이션 기능 개발
  - 페이지 마운트 시 서버로부터 회원의 Todo List를 불러와 State에 저장한 다음, 이를 렌더링하도록 구현
  - 페이지 마운트 시 회원의 Todo List를 렌더링하도록 구현
  - 추가 버튼을 눌러 새로운 Todo를 리스트에 추가
  - Todo 수정 시 input형태의 컴포넌트로 변경하여 수정 및 취소 기능 구현
  - 취소버튼을 누르면 수정한 내용을 초기화하고 수정모드 비활성화
  - 체크박스 체크를 통한 Todo 완료 여부 구현
  - 삭제 버튼을 눌러 Todo 삭제 기능 구현
  - 추가, 수정, 삭제 등의 CRUD 작업 시 클라이언트 상의 Todo List를 관리하는 State를 함께 조작하는 방식이 아닌, API 통신이 성공적으로 완료될 때마다 서버로부터 새로 갱신된 Todo List를 불러와 기존 State를 대체하는 방식으로 서버와 클라이언트 간 일관성 유지와 코드 간결화
 
Tech Stack
- React
- axios
- react-router-dom

API
- [https://github.com/walking-sunset/selection-task#api](https://github.com/walking-sunset/selection-task#api)


