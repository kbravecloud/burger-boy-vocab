@echo off
title Burger Boy Vocab Web App
setlocal enabledelayedexpansion

set "PATH=C:\Users\Lenovo\AppData\Local\Programs\nodejs;%PATH%"

echo ========================================================
echo   🍔 Burger Boy Vocab - Starting Web Application...
echo ========================================================
echo.

:: Open browser in background after 2 seconds
start /b "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Start Next.js server on all network interfaces (port 3000)
call npm.cmd run dev -- -H 0.0.0.0 -p 3000

if %errorlevel% neq 0 (
    echo.
    echo [Error] Dev server stopped. Trying production start...
    call npm.cmd start -- -p 3000
)

pause
