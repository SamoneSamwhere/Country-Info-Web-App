@echo off
echo Starting GlobeScope...

start "Backend" cmd /k "cd /d D:\country-info-app\server && npm start"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "cd /d D:\country-info-app\client && npm run dev"
timeout /t 3 /nobreak >nul

start http://localhost:5173
