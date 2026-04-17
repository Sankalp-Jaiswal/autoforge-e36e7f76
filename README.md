# Doctor Booking Application

## Overview
A modern Single Page Application (SPA) for a doctor's profile and appointment booking. Built with React (Vite), Tailwind CSS, Node.js, Express, and PostgreSQL via Prisma.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
Ensure you have PostgreSQL running. Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/clinic_db?schema=public"
PORT=3001
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### 3. Running the Application

**Start the Backend Server:**
```bash
npm run start:server
```

**Start the Frontend Development Server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:3001`.

## Deployment
- **Frontend:** Deployed on Vercel. Run `npm run build` to generate the `dist` folder. The `vercel.json` ensures that client-side routing works while keeping `/api` intact.
- **Backend:** Can be deployed on Render, Railway, or Heroku. Ensure `FRONTEND_URL` is set in production to restrict CORS.
