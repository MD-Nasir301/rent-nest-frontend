# 🏡 RentNest Frontend

RentNest Frontend is a modern property and rental management web application built with Next.js. It allows users to browse available properties, submit rental requests, make payments, and manage role-based dashboards for tenants, landlords, and administrators.

## ✨ Features

- 🔐 User authentication with login and registration
- 👥 Role-based access for tenants, landlords, and admins
- 🏠 Property listing with search and filtering options
- 📄 Property details page for viewing amenities, price, and availability
- 📝 Rental request submission and request tracking
- 💳 Payment flow for tenant payments
- 🧑‍💼 Landlord dashboard for managing properties and rental requests
- 🛡️ Admin dashboard for user management, moderation, and request review
- 🚫 Ban and unban support for users and content moderation

## 🛠️ Tech Stack

- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS, shadcn/ui components
- Icons: Lucide React
- Forms & Validation: React Hook Form, Zod
- Notifications: Sonner and toast-based UI feedback
- Backend Integration: Fetch-based API calls to a backend service
- Auth & Session Handling: Next.js server actions with cookies

## ▶️ Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn
- A running backend API for the project

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd rent_nest_frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a local environment file

   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local`

5. Start the development server

   ```bash
   npm run dev
   ```

6. Open your browser and visit
   ```text
   http://localhost:3000
   ```

## 🌐 Environment Variables

Create a `.env.local` file in the project root and add the following variable:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Replace the URL with the address of your backend API.

## 📁 Project Structure

A simplified overview of the main folders:

```text
app/               # Main Next.js app routes and page layouts
components/       # Reusable UI components and shared layouts
services/         # API service functions for auth, properties, rentals, payments, and admin actions
types/            # TypeScript types used across the project
lib/              # Utility and helper functions
public/           # Static assets
schema/           # Validation schemas
```

## ℹ️ Notes

This frontend is designed to work with a separate backend service. Make sure your backend is running and reachable through the `NEXT_PUBLIC_BACKEND_URL` value.
