# FactoryOS AI — Sales & Operations Platform for Manufacturers

This document provides a comprehensive technical overview of **FactoryOS AI** as implemented in this codebase.

---

## 1. Technological Stack & Integrations

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, and Framer Motion.
- **Backend**: Next.js Route Handlers (API folder routes).
- **Database & Auth**: Supabase client (`src/lib/supabaseClient.ts`) mapped with PostgreSQL database schemas and Supabase Auth.
- **Visual Theme**: Enterprise Light Theme (`#F8FAFC` slate background, `#FFFFFF` cards, `#2563EB` blue primary color, and `#7C3AED` purple AI accents).

---

## 2. Directory Structure & Key Files

Here is the exact structure of files created/modified for this feature set:

```text
├── app/
│   ├── api/
│   │   └── leads/
│   │       ├── route.ts                 # GET leads (filters/search) & POST leads
│   │       └── [id]/
│   │           ├── route.ts             # GET individual lead details
│   │           └── timeline/
│   │               └── route.ts         # GET chronological activities/chat timelines
│   ├── dashboard/
│   │   ├── layout.tsx                   # Sidebar navigation, navbar shell & top headers
│   │   ├── page.tsx                     # Overview counters & metrics dashboard
│   │   └── leads/
│   │       └── page.tsx                 # Command center: table, drawer & timeline UI
│   ├── login/
│   │   └── page.tsx                     # Public signIn form using Supabase Auth
│   ├── register/
│   │   └── page.tsx                     # Public tenant/business setup sign up form
│   ├── pricing/
│   │   └── page.tsx                     # Subscription tiers comparison cards
│   └── AppShell.tsx                     # Conditional navbar mounts & preloader checks
├── src/
│   ├── lib/
│   │   └── supabaseClient.ts            # Supabase JS connection initializer
│   ├── components/
│   │   └── NavBar.jsx                   # High contrast styling configurations
│   └── constants/
│       └── index.js                     # Global navLinks constants
```

---

## 3. Database Schema Blueprint (Supabase/PostgreSQL)

If using Supabase database tables directly, this matches the layout blueprint:

1. **`businesses`**: Handles isolated tenant profiles (`id`, `name`, `subdomain`, timestamps).
2. **`users`**: Profiles linked via `business_id` (RLS security isolation).
3. **`contacts`**: Stores name, phone number, and email.
4. **`companies`**: Industry and GST details linked to contacts.
5. **`leads`**: Centralized inquiry cards (`title`, `description`, `intent`, `priority`, `status`, `score`, linked IDs).
6. **`timeline_events`**: Messaging records from WhatsApp, email logs, call summaries, and system activity logs.

---

## 4. API Endpoints Reference

### `GET /api/leads`
- **Purpose**: Fetch filtered lead items.
- **Parameters**: `search` (keyword), `source` (IndiaMART, WhatsApp, etc.), `priority` (urgent/high/medium/low), `status` (inquiry lifecycle state).
- **Fallback**: Automatically falls back to high-fidelity mock leads if Supabase connection is offline.

### `POST /api/leads`
- **Purpose**: Submit manual lead inputs. Parses and automatically maps company names and contact info in a transaction block.

### `GET /api/leads/[id]`
- **Purpose**: Fetch the profile data of a specific lead.

### `GET /api/leads/[id]/timeline`
- **Purpose**: Merges WhatsApp records, Call logs, and Activity audits into a single chronological array.

---

## 5. UI Features & Design Specifications

### A. Dashboard Shell (`/app/dashboard/layout.tsx`)
- Contains a sticky left sidebar listing **Overview, Unified Inbox, Hot Leads, Customers, Companies, Quotations, Orders, Automation, Campaigns, Knowledge Base, Analytics, Compliance, Team, Billing, and Settings**.
- Workspace switch panel displaying active organization and user details.
- Clean white backdrop (`#FFFFFF`) with thin borders (`#E5E7EB`).

### B. Lead Command Center (`/app/dashboard/leads/page.tsx`)
- **Advanced Filters**: Real-time filtering by channel source, status stages, and search query.
- **Intelligent Detail Drawer**: Slides in from the right to show AI Intent Predictions (e.g. `high-purchase-intent`, `information-query`), AI Lead Scores (0-100), and Contact coordinates.
- **Purple Timeline Path**: Accents AI conversation summaries and automated follow-ups with a subtle purple layout (`#7C3AED`) to set it apart from human logs.

### C. Onboarding Screens (`/login`, `/register`, `/pricing`)
- Premium cards designed with white backgrounds, slate gray text inputs, and blue actions.
- Built-in connection interceptors: If a developer tests locally without configuring `.env` variables or encounters network errors, the forms automatically transition to a mock session and guide the user directly to the `/dashboard`.
- Global `<NavBar />` is hidden automatically on dashboard paths, preventing layout overlap.
