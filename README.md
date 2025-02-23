# 📝 Todo List 기술과제

## 🛠️ 사용 라이브러리 및 스택

- Database : ![Supabase](https://img.shields.io/badge/Supabase-green)
- Framework & Language : ![React](https://img.shields.io/badge/React-blue), ![JavaScript](https://img.shields.io/badge/JavaScript-yellow)
- State Management : ![Recoil](https://img.shields.io/badge/Recoil-purple)
- Style :  ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-orange), ![MUI](https://img.shields.io/badge/MUI-pink)

> ⚡ **이 프로젝트는 Supabase를 사용하여 데이터를 관리합니다.**  
> 별도의 백엔드 서버 없이 Supabase 통해 데이터베이스와 직접 연결됩니다.

---

## ⚙️ 설정 & 실행

### 환경 변수 설정

Supabase 연결을 위해 프로젝트의 루트 디렉토리에 `.env` 파일을 생성하고 아래 정보를 추가해 주세요. <br/>
❗️Supabase API 키(SUPABASE_URL, ANON_KEY)는 **과제 제출 이메일에 첨부**하였습니다. <br/>
```
#Supabase
REACT_APP_SUPABASE_URL=supabase_url
REACT_APP_SUPABASE_ANON_KEY=supabase_anon_key
```

### 설치 및 실행
```
git clone
npm install
npm start
```

---

## 📍 구현

### 1) 회원가입, 로그인, 로그아웃
- Supabase에서 제공하는 이메일 인증을 통한 회원가입, 로그인, 로그아웃 구현

### 2) Todo CRUD
- Todo 항목 추가, 수정, 삭제
- 완료 여부 관리 (스위치 UI 사용)

### 3) 검색 기능 
- 내용으로 검색

### 4) 우선 순위 기능
- '최신순', '오래된 순' 별로 정렬

### 5) Recoil 전역 상태 관리
```javascript
// src/recoil/boardAtom.js

import { atom } from 'recoil';

export const boardAtom = atom({
key: 'boardAtom',
default: {
todoList: [],
selected: [],
select: { idx: 1, title: '최신 순', ascending: false },
search: '',
},
});
```
- 위 예시처럼 boardAtom.js에서는 Todo CRUD, 검색, 우선순위 기능 등의 상태를 관리
- 또한 Recoil을 사용하여 user, modal, alert 등 다양한 전역 상태를 관리
