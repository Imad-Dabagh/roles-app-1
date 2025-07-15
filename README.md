# 🔐 Role-Based Access Control App

A secure full-stack app built with **React (Vite)** and **Express.js**, implementing modern **Role-Based Access Control (RBAC)** with token-based authentication, reusable architecture, and clean state management.

---

## 🚀 Features

✅ **User Roles** — Admin & Customer  
✅ **JWT Auth** — Access Token in `localStorage`, Refresh Token in `HttpOnly Cookie`  
✅ **Protected Routes** — AuthContext + React Router-based route protection  
✅ **Reusable Axios Instance** — With interceptors for automatic token refresh  
✅ **Account Management** — Signup, login, edit, delete, all securely handled  
✅ **Backend Middleware** — Modular auth & role checks  
✅ **Responsive UI** — Bootstrap 5 + custom CSS  
✅ **MongoDB Integration** — Fast and scalable NoSQL backend  
✅ **Clean Project Structure** — Organized for clarity and scalability  

---

## 📂 Tech Stack

**Frontend**  
- React + Vite  
- React Router DOM  
- Bootstrap + CSS  
- Axios with Interceptors  
- `AuthContext` for global auth state  
- useSWR (from Vercel) for revalidation & caching  
- Role-based UI & navigation logic

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Auth (access + refresh token strategy)  
- bcrypt for password hashing  
- cookie-parser for secure refresh token handling  
- Modular Middleware for auth and role-checking  

---

## 🧪 Admin Capabilities

- 🔍 View all users  
- ➕ Create new user accounts  
- 📝 Edit user roles/info  
- ❌ Delete user accounts  

## 👤 Customer Capabilities

- 🔍 View users (read-only)

---

## 🛡️ Security Highlights

- ✅ Hashed passwords using **bcrypt**  
- ✅ Refresh tokens stored in **HttpOnly cookies**  
- ✅ Access tokens stored in **localStorage**  
- 🔄 **Axios interceptors** auto-refresh access tokens on expiry  
- 🔐 **Protected frontend routes** with React Router + AuthContext  
- 🧩 Clean separation of concerns in backend logic  

---

## 💡 Inspiration & Use Case

This project serves as a strong foundation for apps like:  
Admin Panels • Internal Dashboards • CRMs • Multi-role SaaS Platforms • Secure Portals

---

## 🛠️ Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Imad-Dabagh/roles-app-1.git
   ```

2. Backend setup:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Frontend setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🔧 Environment Setup

Create a `.env` file in the `/backend` folder using the provided `.env.example`:

---
