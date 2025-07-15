# 🔐 Role-Based Access Control App

A secure full-stack app built with **React (Vite)** and **Express.js**, implementing modern **Role-Based Access Control (RBAC)** with token-based authentication and clean backend architecture.

---

## 🚀 Features

✅ **User Roles** — Admin & Customer  
✅ **JWT Auth** — Access Token in `localStorage`, Refresh Token in `HttpOnly Cookie`  
✅ **Role-Protected Routes** — Admin can **Create, Read, Update, Delete** users. Customer can only view.  
✅ **Middleware Security** — Auth & Role checks handled via Express middleware  
✅ **Account Management** — Secure Signup/Login with password hashing  
✅ **Modern React Stack** — React + Vite + Axios + useSWR (Vercel Hook)  
✅ **MongoDB Integration** — Lightweight and scalable NoSQL database  
✅ **Clean Folder Structure** — Backend & frontend organized for clarity and scalability  

---

## 📂 Tech Stack

**Frontend**  
- React + Vite  
- TailwindCSS (or your choice of styling)  
- Axios for API communication  
- useSWR for revalidation & caching  
- Role-based UI rendering

**Backend**  
- Node.js + Express.js  
- JWT (access + refresh token flow)  
- bcrypt for password hashing  
- Cookie-parser for refresh token handling  
- MongoDB + Mongoose  
- Custom Auth & Role Middleware  

---

## 🧪 Admin Capabilities

- View all users  
- Create new user accounts  
- Edit any user’s role/info  
- Delete user accounts  

## 👤 Customer Capabilities

- View user list (read-only)
---

## 🛡️ Security Highlights

- 🔐 Hashed passwords using bcrypt  
- 🧾 Refresh tokens stored in HttpOnly cookies  
- 🔁 Auto token refresh logic with interceptors  
- 🧩 Separation of concerns: clean middleware structure  
- ⚙️ Role checks enforced both on API and UI levels  

---

## 💡 Inspiration & Use Case

This is a foundational pattern for real-world apps such as:  
Admin panels, SaaS dashboards, CRMs, internal tools, or any multi-role application needing secure access management.

---

## 🛠️ Setup

1. `cd backend && npm install && npm run dev`  
2. `cd frontend && npm install && npm run dev`  
3. Configure your `.env` in `backend` with Mongo URI and JWT secrets

---

## 📸 Preview



---
