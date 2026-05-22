# 🌍 GlobeScope – Country Info App

> **IT 301 – Web and Mobile Application Development | Final Group Project**

A full-stack web application for exploring, comparing, and saving information about countries worldwide. Built with **React** (frontend) and **Node.js/Express** (backend), powered by the [REST Countries API](https://restcountries.com/v3.1/).

---

## 📸 Features

| Feature | Description |
|---|---|
| 🔍 **Explore** | Browse all 195+ countries with search and region filter |
| 🗺️ **Country Detail** | View full info: flag, capital, population, currency, languages, borders |
| ⚖️ **Compare** | Side-by-side comparison of any two countries |
| ★ **Favorites** | Save countries, add personal notes (requires login) |
| 🔐 **Auth** | JWT-based registration and login |
| 📱 **Responsive** | Mobile-first design, works on all screen sizes |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + Vite
- **React Router v6** for client-side routing
- **Axios** for HTTP requests
- **CSS Variables** for theming (no external UI library)

### Backend
- **Node.js** + **Express.js**
- **LowDB** (flat-file JSON database — no setup required)
- **JWT** (jsonwebtoken) for authentication
- **bcryptjs** for password hashing
- **UUID** for unique IDs

### External API
- [REST Countries API v3.1](https://restcountries.com/v3.1/) — no API key required

---

## 📁 Project Structure

```
country-info-app/
├── client/                     # React Frontend (Vite)
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route-level page components
│       ├── context/            # React Context (Auth, Favorites)
│       ├── services/           # API call functions
│       └── utils/              # Formatter helpers
└── server/                     # Node.js/Express Backend
    ├── controllers/            # Route logic
    ├── middleware/             # JWT auth, error handler
    ├── routes/                 # Express routers
    ├── config/                 # DB setup
    └── data/db.json            # Flat-file database
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required | Success Code |
|--------|----------|-------------|---------------|--------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ | `201 Created` |
| `POST` | `/api/auth/login` | Login and get JWT token | ❌ | `200 OK` |
| `GET`  | `/api/auth/me` | Get current user info | ✅ | `200 OK` |

### Favorites (CRUD)

| Method | Endpoint | Description | Auth Required | Success Code |
|--------|----------|-------------|---------------|--------------|
| `GET`    | `/api/favorites` | Get all favorites for user | ✅ | `200 OK` |
| `POST`   | `/api/favorites` | Add a country to favorites | ✅ | `201 Created` |
| `PATCH`  | `/api/favorites/:id` | Update a favorite's note | ✅ | `200 OK` |
| `DELETE` | `/api/favorites/:id` | Remove a favorite | ✅ | `200 OK` |

### External REST Countries API (called from frontend)

| Method | Endpoint | Used For |
|--------|----------|---------|
| `GET` | `/v3.1/all` | Load all countries for Explore page |
| `GET` | `/v3.1/name/:name` | Search by country name |
| `GET` | `/v3.1/region/:region` | Filter by region |
| `GET` | `/v3.1/alpha/:code` | Get full country detail |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/country-info-app.git
cd country-info-app
```

### 2. Set up the Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
```

Start the server:
```bash
npm run dev    # Development with nodemon
# OR
npm start      # Production
```

The API will run at **http://localhost:5000**

### 3. Set up the Frontend
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_COUNTRIES_API=https://restcountries.com/v3.1
```

Start the dev server:
```bash
npm run dev
```

The app will run at **http://localhost:5173**

---

## 🔐 Authentication Flow

1. User registers → password is bcrypt-hashed → stored in `db.json`
2. User logs in → server validates credentials → returns a **JWT token**
3. Token is stored in `localStorage` and sent as `Authorization: Bearer <token>` header
4. Protected routes verify the token via `authMiddleware.js`
5. Token expires after 7 days

---

## 📋 HTTP Methods & Status Codes

| Scenario | Method | Status Code |
|---|---|---|
| Register (success) | POST | 201 Created |
| Register (duplicate email) | POST | 409 Conflict |
| Login (success) | POST | 200 OK |
| Login (wrong password) | POST | 401 Unauthorized |
| Missing fields | POST | 400 Bad Request |
| Unauthorized request | ANY | 401 Unauthorized |
| Resource not found | GET/PATCH/DELETE | 404 Not Found |
| Favorite added | POST | 201 Created |
| Already favorited | POST | 409 Conflict |
| Note updated | PATCH | 200 OK |
| Favorite removed | DELETE | 200 OK |
| Server error | ANY | 500 Internal Server Error |

---

## 🧩 React Components

| Component | Purpose |
|---|---|
| `Navbar` | Navigation bar with auth state and mobile hamburger |
| `CountryCard` | Flag card with name, region, population, capital + favorite toggle |
| `CountryDetail` | Full country info (general, culture, borders panels) |
| `ComparePanel` | Side-by-side table comparison of two countries |
| `SearchBar` | Controlled search input with clear button |
| `FilterDropdown` | Region filter select |

### Pages

| Page | Route | Description |
|---|---|---|
| `HomePage` | `/` | Landing page with hero, stats, features |
| `ExplorePage` | `/explore` | Search & browse all countries |
| `CountryPage` | `/country/:code` | Full detail view |
| `ComparePage` | `/compare` | Select & compare two countries |
| `FavoritesPage` | `/favorites` | View/edit/remove saved favorites |
| `LoginPage` | `/login` | JWT login form |
| `RegisterPage` | `/register` | Registration form |

---

## 🌐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Client (Vite)                   │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Pages   │  │  Components  │  │  Context/Hooks    │  │
│  └────┬─────┘  └──────────────┘  └────────┬──────────┘  │
│       │                                    │             │
│  ┌────▼───────────────────────────────────▼──────────┐  │
│  │              Services Layer (Axios)                │  │
│  └──────────┬─────────────────────────┬──────────────┘  │
└─────────────┼─────────────────────────┼─────────────────┘
              │                         │
              ▼                         ▼
  ┌───────────────────┐     ┌───────────────────────┐
  │  Express Backend  │     │  REST Countries API   │
  │  localhost:5000   │     │  restcountries.com    │
  │                   │     │  (External, no key)   │
  │  /api/auth        │     └───────────────────────┘
  │  /api/favorites   │
  │                   │
  │  ┌─────────────┐  │
  │  │  db.json    │  │
  │  │  (LowDB)    │  │
  │  └─────────────┘  │
  └───────────────────┘
```

---

## 👥 Group Members

| Name | Role |
|---|---|
| [Member 1] | Frontend – Explore & Compare pages |
| [Member 2] | Frontend – Auth, Favorites, Components |
| [Member 3] | Backend – Express API, Auth, CRUD |
| [Member 4] | Documentation, Testing, README |

---

## 📝 License

This project is for academic purposes – IT 301, Web and Mobile Application Development.
