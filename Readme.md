# 🛠️ IT Ticketing System

A full-stack IT support ticket management system built with **React (Frontend)**, **FastAPI + Python (Backend)**, and **Supabase PostgreSQL (Database)**.  

Role-based dashboards for **Admins**, **Staff**, and **Clients** allow secure authentication, ticket management, and structured workflows.

---

## 📌 Features

- 👤 **Clients:** Create and track support tickets  
- 🛠 **Staff:** Update, comment on, and resolve assigned tickets  
- 🧑‍💼 **Admins:** Manage users, assign tickets, and oversee workflows  
- 🔐 **Secure authentication** with hashed passwords  
- 🎯 **Role-based dashboards** with controlled permissions  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)  
- Axios (HTTP client)  
- Component-based architecture & modern dark UI  

### Backend
- Python + FastAPI  
- Pydantic for data validation  
- Cookie-based session authentication  
- Passlib + bcrypt for password hashing  

### Database
- Supabase (PostgreSQL)  
- Tables: `users`, `tickets`, `comments`  

---

## 🚀 How It Works (High-Level)

1. Frontend sends requests via Axios.  
2. Backend validates, authenticates, and processes requests.  
3. Backend communicates securely with Supabase (PostgreSQL).  
4. Database returns JSON data.  
5. Backend sends structured JSON back to frontend for UI updates.  

> For a detailed step-by-step architecture explanation, see [ARCHITECTURE.md](ARCHITECTURE.md)  

---

## 📝 Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/it-ticketing-system.git
cd it-ticketing-system

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
