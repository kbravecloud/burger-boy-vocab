@echo off
title Push Burger Boy Vocab to GitHub
setlocal enabledelayedexpansion

set "PATH=C:\Users\Lenovo\AppData\Local\Programs\nodejs;C:\Users\Lenovo\AppData\Local\Programs\git\cmd;%PATH%"

echo ========================================================
echo   🍔 Burger Boy Vocab - Push to GitHub Helper
echo ========================================================
echo.
echo 1. ไปที่ https://github.com/new แล้วกดสร้าง Repository ใหม่ (Public หรือ Private ก็ได้)
echo 2. คัดลอกลิงก์ Repository ที่ได้มา เช่น:
echo    https://github.com/your-username/burger-boy-vocab.git
echo.
set /p REPO_URL="วางลิงก์ GitHub Repository ของคุณที่นี่: "

if "%REPO_URL%"=="" (
    echo ไม่ได้ระบุลิงก์ กรุณารันใหม่อีกครั้ง
    pause
    exit /b
)

echo.
echo กำลังเชื่อมต่อและอัปโหลดขึ้น GitHub...
git.exe remote remove origin 2>nul
git.exe remote add origin %REPO_URL%
git.exe branch -M main
git.exe push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   [Success] อัปโหลดขึ้น GitHub สำเร็จแล้ว!
    echo   ขั้นตอนต่อไป: นำขึ้น Vercel ได้ใน 1 คลิกที่:
    echo   https://vercel.com/new
    echo ========================================================
) else (
    echo [Error] ไม่สามารถ Push ได้ กรุณาตรวจสอบสิทธิ์และลองใหม่อีกครั้ง
)

pause
