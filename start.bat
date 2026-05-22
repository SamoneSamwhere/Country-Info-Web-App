@echo off
echo Starting GlobeScope...

set ROOT=%~dp0

start "Backend" cmd /k "cd /d "%ROOT%server" && npm start"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "cd /d "%ROOT%client" && npm run dev"
timeout /t 3 /nobreak >nul

start http://localhost:5173
