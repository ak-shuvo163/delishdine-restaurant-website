@echo off
echo 🚀 Starting DelishDine Development Server...
echo.
echo 📦 Installing dependencies...
npm install
echo.
echo 🔨 Building Tailwind CSS...
npm run build:prod
echo.
echo 🌐 Starting development server...
echo 📱 Open http://localhost:3000 in your browser
echo 🔄 Press Ctrl+C to stop the server
echo.
npm run serve
pause 