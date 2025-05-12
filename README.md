# 模法師 - 社群交流平台
[![Vite](https://img.shields.io/badge/Vite-6.2.0-magenta)](https://vitejs.dev/)  [![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)  [![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1.5-teal)](https://tailwindcss.com/)  [![Supabase](https://img.shields.io/badge/Supabase-2.49.4-green)](https://supabase.com/)  

[👉進入網站體驗](https://johnnyhsiehtw.github.io/Social_Media_Platform/)

## 簡介
專為模型玩家開創的社群交流平台，玩家可以在此盡情發表模型相關的內容。  
未來將會結合購物商城，交流的同時享受購買模型的樂趣！  

<img style='width:1000px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/readme.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL3JlYWRtZS5qcGciLCJpYXQiOjE3NDcwMzcxNzQsImV4cCI6MTc3ODU3MzE3NH0.8awZO8UdtpozL-z1-GEXOidkjFaFNDxrV12NhDTo3ec'/>

## 目錄  
- [功能特性](#功能特性)
- [技術棧](#技術棧)
- [更新計畫](#更新計畫)
- [聯絡資訊](#聯絡資訊)


## 功能特性
- 帳號註冊／登入／編輯個人檔案／登出

註冊 & 登入  
<img style='width:300px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/Register.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL1JlZ2lzdGVyLmdpZiIsImlhdCI6MTc0NzA2MzM3MSwiZXhwIjoxNzc4NTk5MzcxfQ.JEc-7NhULSbEZ_S71QAWHqde4Kkh1A2xh3g1KJK--HU'/> <img style='width:300px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/Login.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL0xvZ2luLmdpZiIsImlhdCI6MTc0NzA2MzcwMCwiZXhwIjoxNzc4NTk5NzAwfQ.Qg9KgxMagSvwAN4nrB_0gEFIZDts_nAq9nkz8DVD-NE'/>  

編輯個人檔案 & 登出  
<img style='width:300px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/Edit_MemberInfo.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL0VkaXRfTWVtYmVySW5mby5naWYiLCJpYXQiOjE3NDcwNjM3MjEsImV4cCI6MTc3ODU5OTcyMX0.OAczivAZVheS-9VWVyCX4GU2MVqCI_YqMhXfsTTzACk'/>  

- 貼文發布／圖片上傳及預覽（Supabase Storage)
<img style='width:300px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/Posting.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL1Bvc3RpbmcuZ2lmIiwiaWF0IjoxNzQ3MDY1ODQ0LCJleHAiOjE3Nzg2MDE4NDR9.YyplxX48dJ-GqN22rPF2oh5_4Wl7C-jxARo49rAL-E0'/>

- 按讚／留言
<img style='width:300px' src='https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/project-screenshots/Like_Comments.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9qZWN0LXNjcmVlbnNob3RzL0xpa2VfQ29tbWVudHMuZ2lmIiwiaWF0IjoxNzQ3MDY2Njg3LCJleHAiOjE3Nzg2MDI2ODd9.dyuSSR3eHn72BUwBR0WCPGXV_ZQZqB8FY170KZdJVb0'/>


## 技術棧
### 前端
- 環境：Vite + React  
建置快速、支援 HMR 快速熱更新，是 SPA 的最佳選擇！

- 樣式框架：Tailwind  
接近原生 CSS 的邏輯，對於客製化樣式有足夠的彈性。

- 路由管理：React Router  
Router 採用 **Object 型式**撰寫，相較於 Component 型式，視覺上更為一目瞭然，對於維護及開發更加友善。

- UI資源庫：shadcn  
shadcn 提供預設樣式，可快速建置各項元件，並加以客製化以符合使用需求。

- 表單套件：React Hook Form  
功能完整且豐富的表單套件，可輕易達成網站表單需求。
  
- 表單驗證：zod  
與 React Hook Form 結合使用，針對輸入內容進行驗證，有效引導使用者輸入符合格式的內容。

- 輪播套件：React Swiper  
顯示貼文圖片，以及上傳時預覽圖片

- 虛擬滾動：Virtuoso
使用於留言區塊，當留言較多時可以先隱藏部分留言，再由使用者控制加載更多留言顯示。


### 後端
- Supabase
1.  

## 更新計畫  
1. 商城購物功能  
   新增購物區塊，包含完整購物流程：加入購物車、結帳、交易紀錄。
2. 文章分類及搜尋篩選功能  
   將文章新增分類，以便使用者尋找及篩選想看的內容。

## 聯絡資訊  
作者：[JohnnyHsiehTW](https://github.com/JohnnyHsiehTW)  
Email：<johnnyhsieh0419@gmail.com>
