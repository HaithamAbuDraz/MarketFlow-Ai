# MarketFlow AI — Next-Gen SaaS E-Commerce Platform

<div align="center">

  <img src="frontend/public/logo.svg" alt="MarketFlow AI Logo" width="100" height="80" />

  <h3>AI-Powered Store Management, Real-Time Analytics & High-Converting Storefronts</h3>

  <p>
    An intelligent, multi-tenant SaaS e-commerce solution engineered for SME merchants and modern digital retail.
  </p>

  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
  [![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel&logoColor=white&style=for-the-badge)](https://laravel.com/)
  [![Sanctum](https://img.shields.io/badge/Auth-Sanctum-F59E0B?style=for-the-badge)](https://laravel.com/docs/11.x/sanctum)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Design Implementation (Figma to Pure Code)](#-design-implementation-figma-to-pure-code)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup (Laravel API)](#1-backend-setup-laravel-api)
  - [2. Frontend Setup (React + Vite)](#2-frontend-setup-react--vite)
- [Environment Configuration](#-environment-configuration)
- [API Endpoints](#-api-endpoints)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

**MarketFlow AI** bridges data intelligence and seamless merchant operations. Built with a decoupled architecture featuring a reactive **React 18 + Vite + Tailwind CSS v4** frontend and a robust **Laravel 11 + Sanctum** RESTful API backend, it delivers lightning-fast performance, granular role-based security, and actionable AI insights.

---

## ✨ Key Features

- **🎨 Pixel-Perfect Figma-to-Code Implementation**:
  - Pure React and SVG vector reconstruction of the Figma 3D Hero banner ([Node 94:126](https://www.figma.com/design/hiDQ4W4ijBLTIyHFiKYTHz/MarketFlow-AI?node-id=94-126&m=dev)) without raster images.
  - Dedicated mobile interface matching Figma Mobile ([Node 404:282](https://www.figma.com/design/hiDQ4W4ijBLTIyHFiKYTHz/MarketFlow-AI?node-id=404-282&m=dev)).
- **🔐 Secure Multi-Tenant Authentication**:
  - Full Laravel Sanctum token-based authentication.
  - Role-based authorization (`seller`, `customer`, `admin`).
  - Seamless offline mock fallback mode for client-side development.
- **📈 Interactive AI Analytics Visualizations**:
  - Live revenue trajectory sparklines, holographic neural network brain animation, circular inventory gauges, and KPI cards.
- **📱 Fluid Responsiveness**:
  - Adaptive layout transitions from multi-column desktop dashboards to native-feeling mobile views.
- **🧩 Clean & Modular Architecture**:
  - Atomic UI design system (`InputField`, `Button`, `Logo`, `PasswordStrengthIndicator`).
  - Strict separation of concerns with reusable hooks and context providers.

---

## 🎨 Design Implementation (Figma to Pure Code)

| Viewport | Figma Reference | Implementation Highlights |
| :--- | :--- | :--- |
| **Desktop / Tablet** (`>= 1024px`) | [Node 94:126](https://www.figma.com/design/hiDQ4W4ijBLTIyHFiKYTHz/MarketFlow-AI?node-id=94-126&m=dev) | 3D Hero banner, multi-layered glowing SVG sparkline charts, AI synaptic brain, live inventory meter. |
| **Mobile** (`< 1024px`) | [Node 404:282](https://www.figma.com/design/hiDQ4W4ijBLTIyHFiKYTHz/MarketFlow-AI?node-id=404-282&m=dev) | Auto-hidden Hero banner, native top vector logo, 48px touch inputs, streamlined single-column layout. |

---

## 🛠 Tech Stack & Architecture

### **Frontend**
- **Framework**: [React 18.3](https://react.dev/) + [Vite 6.4](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Inter* & *Outfit*)

### **Backend**
- **Framework**: [Laravel 11.x](https://laravel.com/)
- **Authentication**: [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum)
- **Database**: MySQL / SQLite (with Eloquent ORM migrations & seeders)
- **Architecture**: REST API Controllers, Form Requests, API Resources, Middleware guards

---

## 📂 Repository Structure

```text
MarketFlow-Ai/
├── .github/                     # GitHub Actions CI/CD workflows and issue templates
│   ├── workflows/
│   │   └── ci.yml               # Automated build & test verification
│   ├── ISSUE_TEMPLATE/          # Bug report & feature request templates
│   └── pull_request_template.md # PR guidelines template
├── backend/                     # Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Auth, Analytics, Store, Product controllers
│   │   ├── Models/              # User, Store, Product, Order models
│   │   └── Http/Middleware/     # Role checking and Sanctum guards
│   ├── config/                  # Sanctum, auth, database configs
│   ├── database/
│   │   ├── migrations/          # 35+ relational database schema tables
│   │   └── seeders/             # Initial admin and demo merchant seeders
│   └── routes/
│       └── api.php              # RESTful API route definitions
├── frontend/                    # React 18 + Vite SPA
│   ├── public/
│   │   └── logo.svg             # Canonical vector SVG favicon
│   └── src/
│       ├── assets/              # Branding SVGs, icons, illustrations
│       ├── components/
│       │   ├── auth/            # RegisterForm, EmailVerification, Modals
│       │   ├── common/          # InputField, Button, Logo components
│       │   └── hero/            # Pure vector coded HeroBanner (Node 94:126)
│       ├── context/             # AuthContext with Sanctum & mock handling
│       ├── pages/auth/          # LoginPage, RegisterPage
│       ├── services/            # API client wrapper & auth service methods
│       ├── App.jsx              # Main routes configuration
│       └── main.jsx             # React DOM root entry
├── .gitignore                   # Comprehensive root gitignore rules
├── LICENSE                      # MIT License
├── package.json                 # Workspace helper scripts
└── README.md                    # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **PHP**: `v8.2` or higher
- **Composer**: `v2.0` or higher
- **MySQL** / **MariaDB** (or SQLite for local development)

---

### 1. Backend Setup (Laravel API)

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install PHP dependencies
composer install

# 3. Create your local environment configuration
cp .env.example .env

# 4. Generate application encryption key
php artisan key:generate

# 5. Run database migrations and seed default data
php artisan migrate --seed

# 6. Start the Laravel backend server
php artisan serve
# Backend will be active at http://localhost:8000
```

---

### 2. Frontend Setup (React + Vite)

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. Create your local environment configuration
cp .env.example .env

# 4. Start the Vite development server
npm run dev
# Frontend will be active at http://localhost:5173 (or next open port)
```

---

## 🔐 Environment Configuration

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (`backend/.env`)
```env
APP_NAME=MarketFlow-AI
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=marketflow_ai
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:5174,127.0.0.1:5173
SESSION_DOMAIN=localhost
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register store owner & create store | ❌ |
| `POST` | `/api/auth/login` | Authenticate merchant and issue Sanctum token | ❌ |
| `POST` | `/api/auth/forgot-password` | Send password reset link | ❌ |
| `POST` | `/api/auth/reset-password` | Set new password with reset token | ❌ |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | ✅ |
| `POST` | `/api/auth/logout` | Revoke active Sanctum token | ✅ |

> **Note**: If the Laravel backend is not running, the frontend automatically falls back to an intelligent mock mode for rapid UI testing and verification.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a descriptive feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add awesome feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/HaithamAbuDraz">Haitham Abu Draz</a> and the MarketFlow AI Team.</sub>
</div>
