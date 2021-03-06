import { MdTitle } from "react-icons/md";

export const API = "http://172.21.71.162:8000";
export const LOCALHOST = "http://localhost:3000";
export const LIBRARY = "http://172.21.71.162:8000/library";
export const BEAPIROOT = "http://172.21.71.162:8000";
export const API_BOOK = "http://172.21.71.162:8000/book";
export const API_SAVE_BOOK = "http://172.21.71.162:8000/library/mybook";
export const TOKEN = localStorage.getItem("Authorization");

export const LIBRARY_MENU = [
  { id: 0, content: "도서" },
  { id: 1, content: "책장" },
  { id: 2, content: "포스트" },
  { id: 3, content: "통계" },
];

export const BOOKLIST_SORT_TYPE = [
  {
    type: "register",
    name: "서재등록 순으로 정렬",
  },
  {
    type: "title",
    name: "제목 순으로 정렬",
  },
  {
    type: "published",
    name: "발행 순으로 정렬",
  },
];

export const BOOKLIST_SORT_READ = [
  {
    type: "",
    name: "전체 도서",
  },
  {
    type: "read",
    name: "읽은 도서",
  },
];

export const DEFALT_MYBOOKS_BACKGROUND =
  "https://images.unsplash.com/photo-1493219686142-5a8641badc78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

export const COMPLETED_BTN_IMG = "https://i.ibb.co/wSDskYv/shhhh.png";

export const SAVE_BTN_IMG =
  "https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Download-256.png";

export const DEFAULT_IMG =
  "https://secure.gravatar.com/avatar/64c49b6f852ad598fd9f6ad571a663a8?s=1024&d=mm&r=g";

export const VALIDATE_LOGIN_API = "http://172.21.71.162:8000/user/login";
export const VALIDATE_SIGNUP_API = "http://172.21.71.162:8000/user/signup";
export const USER_CELL_CHECK_API = "http://172.21.71.162:8000/user/message";
export const PHONE_VALIDATE_CODE_CHECK_API =
  "http://172.21.71.162:8000/user/messagecheck";
export const SUBSCRIPTION_API = "http://172.21.71.162:8000/user/subscription";
export const CHECK_NICKNAME_API =
  "http://172.21.71.162:8000/user/check?nickname=";
export const VALIDATE_SOCIAL_LOGIN_API =
  "http://172.21.71.162:8000/user/login/social";
export const VALIDATE_SOCIAL_SIGNUP_API =
  "http://172.21.71.162:8000/user/signup/social";
