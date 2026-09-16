@echo off
title DC Analytics - Subir a Vercel
chcp 65001 >nul
cls
echo ====================================================================
echo             DC ANALYTICS - SUBIR SITIO WEB A VERCEL
echo ====================================================================
echo.
echo PASO 1: Vamos a conectar tu cuenta de Vercel.
echo Se abrira tu navegador web. Si ya tienes cuenta, dale continuar.
echo (Puedes iniciar sesion con Google o con GitHub).
echo.
pause

cd /d "%~dp0"

echo.
echo [1/2] Iniciando sesion en Vercel...
call npx --yes vercel login

echo.
echo ====================================================================
echo PASO 2: Subiendo tu sitio web directamente a PRODUCCION...
echo ====================================================================
echo.

call npx --yes vercel --prod --yes

echo.
echo ====================================================================
echo ¡LISTO! Tu sitio web ya esta publicado en internet.
echo Copia el enlace que aparece arriba (ej: https://...vercel.app)
echo ====================================================================
pause
