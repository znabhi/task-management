# Task Management System

A modern, full-stack task management application built with Node.js, Next.js, and MySQL. Features secure authentication, task CRUD operations, pagination, filtering, and a beautiful responsive UI.

🎥 **Demo Video:** [Watch on Loom](https://www.loom.com/share/472883d5a7794948bffcb4728b0ecf17)

## 🚀 Features

### Backend
- ✅ User authentication with JWT (Access & Refresh tokens)  
- ✅ Password hashing with bcrypt  
- ✅ Task management (Create, Read, Update, Delete, Toggle)  
- ✅ Pagination, filtering by status, and search by title  
- ✅ MySQL database with Prisma ORM  
- ✅ Clean layered architecture (Controller → Service → Repository)  
- ✅ Input validation and error handling  

### Frontend
- ✅ Modern UI with shadcn/ui and Tailwind CSS  
- ✅ Responsive design for all devices  
- ✅ JWT authentication with automatic token refresh  
- ✅ Task dashboard with search, filter, and pagination  
- ✅ Real-time updates with React Query  
- ✅ Form validation with Zod  
- ✅ Toast notifications for user feedback  
- ✅ Gradient backgrounds and micro-interactions  

## 📋 Prerequisites

- Node.js (v18 or higher)  
- MySQL (v8 or higher)  
- npm or yarn  

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```
### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

# Update .env with your database credentials
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
```

### 4. Database
```bash
CREATE DATABASE task_management_db;
```

### 5. Environment Variables

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:password@localhost:3306/task_management_db"
JWT_ACCESS_SECRET="your-super-secret-access-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
``` 

### 6. Running the Application
### Backend
cd backend
npm run dev

### Server runs at http://localhost:5000

### Frontend
cd frontend
npm run dev
### App runs at http://localhost:3000

```bash
task-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── config/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── frontend/
    ├── app/
    │   ├── (auth)/
    │   ├── (protected)/
    │   └── layout.tsx
    ├── components/
    │   ├── tasks/
    │   └── ui/
    ├── lib/
    ├── types/
    └── package.json