Project overview
Tech stack
Directory structure
Setup instructions
Features & screenshots

# AI Trip Planner

An AI-powered trip planning application that helps users create personalized travel itineraries.

## 🚀 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand for state management

### Backend
- Bun
- Hono.js
- MongoDB
- JWT Authentication

## 📁 Directory Structure
AI_tripPlanner/
├── frontend/ │ ├── app/ │ ├── components/ │
├── providers/ │ └── public/
└── backend/ ├── routes/ ├── models/ ├── controllers/ └── middleware/


## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Bun runtime
- MongoDB

### Backend Setup
```bash
cd backend
bun install
bun dev



Frontend Setup
cd frontend
npm install
npm run dev


Environment Variables
Backend (.env)

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8080


🎯Features
AI-powered trip recommendations
Interactive trip planning interface
User authentication & authorization
Personalized trip itineraries
Budget management
Weather preferences
Activity scheduling
Transportation planning

🔐 Security
JWT authentication
HTTP-only cookies
CORS protection
Input validation
Secure password hashing

🌐 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
