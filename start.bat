@echo off
cd /d "C:\Users\msi\Desktop\githubprro\phone-encyclopedia"

echo Starting backend...
start "Backend" /MIN node server.js

echo Starting frontend...
start "Frontend" /MIN npx vite --host

echo Both servers started!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop both servers...
pause >nul

taskkill /FI "WINDOWTITLE eq Backend*" /F
taskkill /FI "WINDOWTITLE eq Frontend*" /F
