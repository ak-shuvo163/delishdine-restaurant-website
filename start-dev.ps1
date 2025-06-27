Write-Host "🚀 Starting DelishDine Development Server..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🔨 Building Tailwind CSS..." -ForegroundColor Yellow
npm run build:prod

Write-Host ""
Write-Host "🌐 Starting development server..." -ForegroundColor Green
Write-Host "📱 Open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host "🔄 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run serve 