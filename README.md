# 🌍 GlobeScope – Country Info App

> **IT 301 – Web and Mobile Application Development | Final Group Project**

A full-stack web application for exploring, comparing, and saving information about countries worldwide. Built with **React** (frontend) and **Node.js/Express** (backend), powered by the [REST Countries API](https://restcountries.com/v3.1/).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Explore** | Browse all 195+ countries with live search, active filter chips, and region filtering |
| 🗺️ **Country Detail** | View full info: flag, capital, population, currency, languages, borders, timezones, TLD, and continent |
| 🌐 **Interactive 3D Globe** | Each country page renders a real-time 3D Earth that zooms to the country's location |
| ⚖️ **Compare** | Side-by-side comparison of any two countries with an animated arc on the 3D globe connecting them |
| ★ **Favorites** | Save countries, add/edit personal notes, and manage your collection (requires login) |
| 🔐 **Auth** | JWT-based registration and login with protected routes |
| 📱 **Responsive** | Mobile-first design, works on all screen sizes |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + Vite
- **React Router v6** for client-side routing
- **Axios** for HTTP requests
- **react-globe.gl** + **Three.js** for interactive 3D globe rendering
- **Plus Jakarta Sans** + **Space Grotesk** fonts
- **CSS Custom Properties** design system (no external UI library)

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
├── start.bat                   # One-click launcher (Windows)
├── client/                     # React Frontend (Vite)
│   ├── index.html
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── CountryCard.jsx
│       │   ├── CountryDetail.jsx
│       │   ├── CountryGlobe.jsx   ← 3D interactive globe
│       │   ├── ComparePanel.jsx
│       │   ├── SearchBar.jsx
│       │   └── FilterDropdown.jsx
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

## 🚀 Getting Started

### Prerequisites
- **Node.js v18+** and npm — download at [nodejs.org](https://nodejs.org)

### Option A — One-click launch (Windows)
After installing Node.js, simply **double-click `start.bat`** in the project root. It will:
1. Start the backend server
2. Start the frontend dev server
3. Open the app in your browser automatically

### Option B — Manual setup

#### 1. Clone the repository
```bash
git clone https://github.com/SamoneSamwhere/Country-Info-Web-App.git
cd Country-Info-Web-App
```

#### 2. Set up the Backend
```bash
cd server
npm install
```

The `server/.env` file is already included with default values:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

Start the server:
```bash
npm start        # Production
npm run dev      # Development (auto-restarts with nodemon)
```

The API runs at **http://localhost:5000**

#### 3. Set up the Frontend
```bash
cd client
npm install
npm run dev
```

The `client/.env` file is already included:
```env
VITE_API_URL=http://localhost:5000/api
VITE_COUNTRIES_API=https://restcountries.com/v3.1
```

The app runs at **http://localhost:5173**

> ⚠️ **Both** the backend and frontend must be running at the same time. Open two terminal windows.

---

## 🌐 Interactive 3D Globe

The globe is powered by [`react-globe.gl`](https://github.com/vasturiano/react-globe.gl) (built on Three.js).

| Page | Globe Behavior |
|---|---|
| **Country Detail** | Globe loads and smoothly zooms to the selected country's coordinates |
| **Compare** | Globe shows both countries with glowing markers and an animated arc connecting them |

The globe uses the country's `latlng` coordinates from the REST Countries API. It requires an internet connection to load the Earth texture from a CDN.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| `POST` | `/api/auth/register` | Register a new user | ❌ | `201 Created` |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ | `200 OK` |
| `GET`  | `/api/auth/me` | Get current logged-in user | ✅ | `200 OK` |

### Favorites (CRUD)

| Method | Endpoint | Description | Auth Required | Status |
|--------|----------|-------------|---------------|--------|
| `GET`    | `/api/favorites` | Get all favorites for the user | ✅ | `200 OK` |
| `POST`   | `/api/favorites` | Add a country to favorites | ✅ | `201 Created` |
| `PATCH`  | `/api/favorites/:id` | Update a favorite's note | ✅ | `200 OK` |
| `DELETE` | `/api/favorites/:id` | Remove a favorite | ✅ | `200 OK` |

### REST Countries API (called from frontend)

| Method | Endpoint | Used For |
|--------|----------|---------|
| `GET` | `/v3.1/all?fields=...` | Load all countries (max 10 fields) |
| `GET` | `/v3.1/alpha/:code?fields=...` | Get full country detail including `latlng` |

> **Note:** The REST Countries API enforces a 10-field limit on `/all`. The app uses two separate field sets: a lightweight list set for cards and a full detail set for individual country pages.

---

## 🔐 Authentication Flow

1. User registers → password is **bcrypt-hashed** → stored in `db.json`
2. User logs in → server validates credentials → returns a **JWT token**
3. Token is stored in `localStorage` and sent as `Authorization: Bearer <token>`
4. Protected routes verify the token via `authMiddleware.js`
5. Token expires after **7 days**

---

## 📋 HTTP Status Codes

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

## 🧩 Components & Pages

### Components

| Component | Purpose |
|---|---|
| `Navbar` | Sticky navigation with gradient logo, active link indicator, user avatar pill, mobile hamburger |
| `CountryCard` | Flag card with region pill overlay, hover-reveal favorite button, population & capital stats |
| `CountryDetail` | Full country profile with hero banner, info grid (General + Culture), and borders section |
| `CountryGlobe` | Interactive 3D Earth globe — zooms to country or shows arc between two countries |
| `ComparePanel` | Side-by-side comparison table with embedded globe |
| `SearchBar` | Controlled search input with focus glow and clear button |
| `FilterDropdown` | Region filter select with styled appearance |

### Pages

| Page | Route | Description |
|---|---|---|
| `HomePage` | `/` | Hero landing page with animated glow, stats pills, feature cards, and CTA banner |
| `ExplorePage` | `/explore` | Search & filter all countries with dismissible filter chips |
| `CountryPage` | `/country/:code` | Full detail view with 3D globe |
| `ComparePage` | `/compare` | Select two countries and compare side-by-side with globe arc |
| `FavoritesPage` | `/favorites` | Manage saved countries and personal notes |
| `LoginPage` | `/login` | JWT sign-in form |
| `RegisterPage` | `/register` | Account creation form |

---

## 🌐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Client (Vite)                   │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Pages   │  │  Components  │  │  Context/Hooks    │  │
│  └────┬─────┘  └──────┬───────┘  └────────┬──────────┘  │
│       │               │                    │             │
│       │         ┌─────▼──────┐             │             │
│       │         │CountryGlobe│             │             │
│       │         │(Three.js)  │             │             │
│       │         └────────────┘             │             │
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
| **Fiona Estela** | Project Manager |
| **Prince Christian Parnada** | Developer / Technical Lead |
| **Samantha Cortes** | Developer / Technical (Co-Dev) |
| **Sean Xymoun Boniel** | UI/UX & Frontend |
| **Alexa Shane Adolfo** | QA & Testing |
| **Mild Disuyo** | Documentation & Presentation |

---

## 📝 License

This project is for academic purposes – IT 301, Web and Mobile Application Development.
