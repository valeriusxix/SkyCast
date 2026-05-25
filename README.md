# ⛅ SkyCast — Weather App

A real-time weather app built with React + Vite, featuring glassmorphism UI and live data from OpenWeatherMap.

## Features
- 🔍 Search any city worldwide
- 📍 Geolocation support (use your current location)
- 🌡️ °C / °F toggle
- 🕐 48-hour hourly forecast (scrollable)
- 📅 5-day daily forecast
- 💨 Weather details: humidity, wind, pressure, visibility, cloud cover
- 🌅 Sunrise / sunset times
- 🎨 Glassmorphism UI with your custom sky background

---

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## Deployment

### Vercel (Recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** — done!

The `vercel.json` file already handles SPA routing.

### Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Create Static Site**

---

## Project Structure

```
skycast/
├── public/
│   ├── bg.jpg              ← Your background image (the sky photo)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx       ← Glassmorphism navbar + unit toggle
│   │   ├── SearchBar.jsx    ← City search + geolocation
│   │   ├── WeatherMain.jsx  ← Hero weather card (temp, icon, sunrise/set)
│   │   ├── WeatherDetails.jsx ← Stats grid (humidity, wind, pressure…)
│   │   ├── HourlyForecast.jsx ← 48h horizontal scroll timeline
│   │   ├── ForecastSection.jsx ← 5-day forecast cards
│   │   └── ErrorCard.jsx    ← Error state display
│   ├── App.jsx              ← Root app + API logic + state
│   ├── main.jsx
│   └── index.css            ← Global styles + glassmorphism base
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## API

Uses **OpenWeatherMap** free tier:
- Current weather: `/data/2.5/weather`
- 5-day forecast (3h steps): `/data/2.5/forecast`

Replace the API key in `src/App.jsx` if needed:
```js
const API_KEY = 'your_key_here'
```

---

## Customizing the Background

The background image is `public/bg.jpg`. Replace it with any image you like — just keep the filename the same, or update the reference in `src/index.css`:

```css
background: url('/bg.jpg') center / cover no-repeat;
```
