@echo off
chcp 65001 >nul
echo ============================================================
echo   TỰ ĐỘNG ĐẨY TOÀN BỘ WEBSITE LÊN GITHUB (THPT-NL3)
echo ============================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Máy tính của bạn chưa có Git.
    echo [*] Đang tự động cài Git qua Windows Winget, vui lòng chờ...
    winget install --id Git.Git -e --source winget
    echo.
    echo [*] Đã cài đặt xong Git. Vui lòng tắt cửa sổ này và bấm đúp lại file push-to-github.bat!
    pause
    exit /b
)

echo [*] Đang đồng bộ toàn bộ file và thư mục lên GitHub...
git init
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/phung232010-cloud/THPT-NL3.git
git add -A
git commit -m "Deploy full website with CSS, JS, images and club section"
git push -f origin main

echo.
echo ============================================================
echo [V] ĐÃ ĐẨY THÀNH CÔNG TOÀN BỘ 207 TỆP VÀ THƯ MỤC LÊN GITHUB!
echo ============================================================
echo Hãy mở lại link sau 1-2 phút: https://phung232010-cloud.github.io/THPT-NL3/
pause
