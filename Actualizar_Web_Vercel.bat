@echo off
title DC Analytics - Actualizar Sitio en Vercel
chcp 65001 >nul
cls
echo ====================================================================
echo        DC ANALYTICS - ACTUALIZAR SITIO WEB EN PRODUCCION
echo ====================================================================
echo.
echo Subiendo tus ultimos cambios a internet...
echo.

cd /d "%~dp0"
git add .
git commit -m "Actualizacion automatica del sitio web"
git push origin main

echo.
echo ====================================================================
echo ¡Tu sitio web ha sido sincronizado con GitHub y actualizado en Vercel!
echo ====================================================================
pause
