# BharatStore – Complete E-commerce for India

A full-stack responsive e-commerce website built with **React + TypeScript + Tailwind CSS** (frontend) and **Express + Prisma + SQLite** (backend).

## Features

- Homepage with categories & featured products
- Product listing with search, category/price filters, sorting, pagination
- Product detail pages
- Cart (persisted in localStorage via Zustand)
- Checkout with shipping address (Indian states + PIN)
- **Cash on Delivery (COD)**
- **Razorpay** payments (UPI, Cards, Net Banking) – **test mode**
- Server-side **Razorpay signature verification** before confirming orders
- Customer registration / login (JWT)
- Order history
- Admin dashboard: stats, order status updates, inventory/stock management
- All prices in **Indian Rupees (₹)**
- Responsive design (mobile-first)

## Project structure

```
ecommerce-india/
├── backend/          # Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── routes/   # auth, products, orders, payments, admin
│   │   ├── middleware/
│   │   └── utils/
│   └── .env.example
└── frontend/         # Vite + React + Tailwind
    └── src/
        ├── components/
        ├── pages/
        ├── store/
        └── lib/
```

## Prerequisites

- Node.js 18+
- npm or pnpm

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env – set JWT_SECRET and Razorpay test keys
npm install
npm run db:setup
npm run dev         # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

## Demo accounts (seeded)

| Role     | Email                 | Password      |
|----------|-----------------------|---------------|
| Admin    | admin@store.in        | Admin@12345   |
| Customer | customer@example.com  | Customer@123  |

## Deploy live

See **DEPLOY.md** for Neon + Render + Vercel free-tier guide.
