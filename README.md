# 🏡 RentNest – Rental Property Management Platform

RentNest is a modern rental property marketplace designed to connect tenants with landlords. It simplifies property discovery, rental requests, payment management, and property administration through a user-friendly web application.

The platform provides dedicated dashboards for tenants, landlords, and administrators, making the rental process more organized, transparent, and convenient.

---

## 🚀 Features

### 🏠 Public Website
- Responsive homepage with an image carousel.
- Featured properties section displaying available properties.
- Property categories including houses, apartments, offices, and rooms.
- Browse and explore available rental properties.
- Property details with pricing, location, bedrooms, and bathrooms.
- Search and filtering capabilities.
- Responsive design for desktop, tablet, and mobile devices.

### 👤 Authentication & User Management
- User registration and login.
- Role-based access control.
- Secure authentication using access and refresh tokens.
- Protected dashboard routes.
- Profile management.

### 🔑 Tenant Dashboard
- Browse available properties.
- Submit rental requests.
- Track rental request status.
- View payment history.
- Make rental payments through the integrated payment gateway.

### 🏢 Landlord Dashboard
- Add new rental properties.
- Update existing property information.
- Manage property listings.
- Monitor rental requests.
- Manage property availability.

### 🛡️ Admin Dashboard
- Manage users and platform activities.
- Monitor properties and rental requests.
- Manage property categories.
- Oversee platform operations.

### 💳 Payment Management
- SSLCommerz payment gateway integration.
- Payment initiation and gateway redirection.
- Payment validation and confirmation.
- Transaction history.
- Automatic property status updates after successful payment.

---

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner
- Embla Carousel

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Payment Integration
- SSLCommerz

### Deployment
- Vercel

---

## 📁 Project Structure

```text
rent_nest_client/
│
├── app/
│   ├── (MainGroup)/
│   │   ├── _components/
│   │   ├── _actions/
│   │   └── page.tsx
│   │
│   ├── (DashboardGroup)/
│   │   ├── dashboard/
│   │   └── _actions/
│   │
│   ├── api/
│   │   └── revalidate/
│   │
│   ├── login/
│   ├── register/
│   ├── properties/
│   ├── payment/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── ui/
│
├── lib/
│
├── public/
│   └── images/
│
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Navigate to the Project

```bash
cd rent_nest_client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=YOUR_BACKEND_API_URL
```

Replace the placeholder with your deployed backend URL or local backend URL.

Example:

```env
BACKEND_API_URL=http://localhost:5000
```

Do not add `/api` to this URL because API actions already append the `/api` prefix.

### 5. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🌐 Backend Configuration

RentNest uses a separate Express.js backend.

Configure the backend environment variables according to your backend setup, including:

- PostgreSQL database connection.
- JWT access and refresh token secrets.
- Frontend and backend URLs.
- SSLCommerz credentials.
- Payment gateway configuration.

Refer to the backend repository's README for its complete setup instructions.

---

## 🔄 Property Data & Caching

RentNest uses Next.js server-side data fetching with tagged caching.

- Property data is cached for improved loading performance.
- Homepage displays up to three featured available properties.
- Properties page displays the complete available property listing.
- Property cache is invalidated after successful property creation or payment-related status changes.
- Property listing data can be refreshed without unnecessarily disabling caching across the application.

---

## 🔐 Security

- JWT-based authentication.
- Role-based authorization.
- Protected dashboard access.
- Server-side API requests.
- Environment-based secret management.
- Payment validation through the payment gateway.

Never commit `.env.local`, API credentials, database passwords, or authentication secrets to GitHub.

---

## 🚀 Deployment

The frontend can be deployed using Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the `BACKEND_API_URL` environment variable.
4. Deploy the project.
5. Configure the backend's `FRONTEND_URL` with the deployed frontend domain.
6. Configure the cache revalidation secret on both frontend and backend if using the revalidation endpoint.

---

## 🎯 Project Objective

The goal of RentNest is to provide a centralized rental property management platform that makes finding, listing, requesting, and managing rental properties easier for tenants, landlords, and administrators.

---

## 👨‍💻 Developer

**Developed as a Full-Stack Web Development Project**

**Project:** RentNest  
**Category:** Rental Property Marketplace & Management System

---

*Making property rental simpler, smarter, and more convenient.* 🏡