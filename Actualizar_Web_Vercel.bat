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
npx vercel --prod

echo.
echo ====================================================================
echo ¡Tu sitio web ha sido actualizado con exito en internet!
echo ====================================================================
pause
