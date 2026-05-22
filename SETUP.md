# Quick Setup Guide

## Step 1 – Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

## Step 2 – Environment files

**server/.env** (already included, edit JWT_SECRET before deploying):
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

**client/.env** (already included):
```
VITE_API_URL=http://localhost:5000/api
VITE_COUNTRIES_API=https://restcountries.com/v3.1
```

## Step 3 – Run the app

Open **two terminals**:

**Terminal 1 – Backend:**
```bash
cd server
npm run dev
# Server runs at http://localhost:5000
```

**Terminal 2 – Frontend:**
```bash
cd client
npm run dev
# App runs at http://localhost:5173
```

## Step 4 – Open the app

Visit **http://localhost:5173** in your browser.

---

## Postman Testing

1. Import `GlobeScope_Postman_Collection.json` into Postman
2. Run **POST /api/auth/register** — token is auto-saved to collection variable
3. All Favorites requests will use the token automatically
4. Replace `REPLACE_WITH_FAVORITE_ID` in PATCH/DELETE with a real ID from GET /api/favorites

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `EADDRINUSE: port 5000` | Another process is on port 5000. Change `PORT` in `server/.env` |
| CORS error in browser | Make sure backend is running on port 5000 |
| `Cannot find module 'lowdb'` | Run `npm install` inside the `server/` folder |
| Countries not loading | Check internet connection (REST Countries API is external) |
