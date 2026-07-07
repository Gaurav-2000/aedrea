# Aedrea AI Receptionist SaaS — Project Log & Roadmap

Welcome to the development workspace for the **Aedrea AI Receptionist SaaS** platform. This document tracks exactly **what has been completed**, **what is currently pending**, and **what the step-by-step next actions are**.

---

## 🎨 Theme Overview: "Enterprise Blue"
The AI Receptionist portal pages utilize a professional, clean enterprise slate and blue layout:
* **Background**: `#F8FAFC` (Light Slate)
* **Sidebar**: `#0F172A` (Dark Slate)
* **Cards**: `#FFFFFF` (White)
* **Primary Elements / Buttons**: `#2563EB` (Blue)
* **Hover State**: `#1D4ED8` (Darker Blue)
* **Borders**: `#E5E7EB` (Light Gray)

---

## ✅ 1. What We Completed

We successfully solved critical layout constraints, hydration bugs, and authentication skeletons:

### 🎨 Theme & Layout Scoping
* **Scoped CSS Themes**: Restored the main landing page to its original dark mode design. Confined the new light slate `Enterprise Blue` theme exclusively to `/dashboard`, `/login`, `/register`, and `/pricing` routes using the `.theme-enterprise-blue` wrapper scope.
* **Pricing NavBar Visibility**: Configured the pricing page header to render with a dark background immediately on page load, keeping the light-colored navbar navigation links fully legible.

### 🐛 Bug Fixes & Interactivity
* **Console Hydration Errors**: Fixed double-rendering of `<NavBar />` on the pricing page by removing redundant imports.
* **Button Hover States**: Swapped out broken custom color tokens for Tailwind's compiled hover colors (`hover:bg-blue-700` and `hover:text-blue-700`), restoring hover animations.
* **Card Dismiss Buttons**: Added an absolute-positioned dismiss "X" close icon on the **Login** and **Register** form cards, allowing users to return to the landing page.
* **Dashboard & Sidebar Scrolling**: Prevented the smooth scroll library `Lenis` from intercepting nested scrolling on the left sidebar navigation and the main dashboard content panel using `data-lenis-prevent` attributes.
* **Next.js Video Mismatch warning**: Fixed the empty string `""` source hydration console warning on the homepage reel elements by parsing `src={videoSrc || undefined}`.
* **Logout Redirection**: Programmed the user logout button inside the sidebar to automatically clear local storage sessions and redirect to `/login`.

### 🔑 Module 2: Authentication (Database Framework)
* **Database Pool Config**: Developed a direct PostgreSQL pool helper ([db.ts](file:///e:/new%20projects%20for%20site/Aedrea-main/Aedrea-main/server/src/config/db.ts)) inside the Express backend to manage queries.
* **Express Session Middleware**: Implemented `requireAuth` middleware to screen Bearer tokens against the Supabase Client Auth database.
* **Auth Routers**: Built signup (`POST /register`), signin (`POST /login`), and session profile (`GET /me`) transactional routes.
* **Frontend Authentication Engine**: Integrated React context `AuthProvider`, route guards (`ProtectedRoute.tsx`), and hooked submit actions in the login/register views.

---

## 📋 2. What is Currently Pending

### A. Environment Credentials & Database Setup
To activate the coded authentication, the following credentials must be set:
* **Frontend Config**: [.env](file:///e:/new%20projects%20for%20site/Aedrea-main/Aedrea-main/.env)
  * Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
* **Backend Config**: [server/.env](file:///e:/new%20projects%20for%20site/Aedrea-main/Aedrea-main/server/.env)
  * Fill `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `DATABASE_URL` (direct Postgres URL).
* **Database Initialization**: 
  * Run [schema.sql](file:///e:/new%20projects%20for%20site/Aedrea-main/Aedrea-main/server/src/database/schema.sql) in your Supabase SQL Editor to build the necessary PostgreSQL tables (`businesses`, `users`, `employees`, `customers`).

### B. Functional Dashboard Skeletons
The main dashboard pages currently display placeholder cards. The following features need backend connections and UI components:
* **Module 3: Clinic Onboarding Wizard** (Initial clinic configuration setup).
* **Module 5: Interactive Calendar & Bookings** (Dynamic slots and schedules).
* **Module 6: Services Catalogue** (Treatment procedure CRUD lists).
* **Module 7: CRM Customer Management** (Database of patient records).
* **Module 8: Employees & Rostering** (Staff availability rosters).
* **Module 9: AI Receptionist Configuration** (Greeting settings, FAQ RAG uploads).
* **Module 10: Call Logs & Transcripts** (AI voice calls player and histories).
* **Module 11: Real-time WhatsApp Chats** (AI WhatsApp chat records view).
* **Module 12: Analytics Reports** (Uptime, missed calls, and estimated revenue plots).
* **Module 13: Stripe Subscriptions** (Payment tier configurations).
* **Module 14: Super Admin Panel** (Tenant account overrides).

---

## 🚀 3. What We Will Do Next (Next Coding Session)

Here is the step-by-step implementation plan for our next pairing session:

1. **Step 1: Connection Verification**
   * Plug in the actual Supabase database connection details.
   * Run the Express backend server with `npm run dev` in the `server` folder.
   * Verify that signup and signin form submissions successfully save user records inside the Postgres database.
2. **Step 2: Module 3 Onboarding Wizard Setup**
   * Build the step-by-step onboarding screen to populate clinic operating hours, add procedures, and initialize doctor schedules.
3. **Step 3: Module 5 Calendar Integration**
   * Connect the scheduling database to a visual Calendar page to enable manual appointment booking, slot reservation, and drag-and-drop rescheduling.
