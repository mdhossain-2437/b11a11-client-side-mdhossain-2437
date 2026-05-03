# VelocityDrive · Client

A premium, dark-themed car-rental experience built with **React 19**, **Tailwind CSS**,
**GSAP** animations, **Firebase Auth**, and **TanStack Query**. Companion frontend for
`b11a11-server-side-mdhossain-2437`.

> _“Drive the moment. Own the road.”_

---

## ✨ Highlights

- 🌑 **Luxury dark UI** — gold (`#D4AF37`) + silver (`#C0C0C0`) accents over a near-black canvas
- 📱 **Fully responsive** — fluid grids and tested at 320 / 768 / 1024 / 1440 px
- 🎬 **GSAP-powered motion** — banner reveal, scroll-triggered cards, marquee strips, animated counters
- 🔐 **Firebase Auth** — email/password + Google OAuth, JWT cookie sync with the backend
- 🛡️ **Persistent sessions** — `onAuthStateChanged` resolves before private routes render so reloads never bounce to `/login`
- 🚘 **Browse, search, sort, grid/list toggle** on the Available Cars page
- 📅 **Booking flow** with date picker, automatic days × price total, and a confirmation modal
- 🛠️ **My Cars** dashboard with inline edit modal and delete confirmation
- 📊 **My Bookings** with Recharts spend visualization, modify-date and cancel modals
- ✨ **Reusable design system** — `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.input`, `.glass`, `.section`
- 🔔 **Toast feedback** via `react-hot-toast` for every async action
- 🚧 **Stylish 404** with hero photo and clear back-to-home CTA

---

## 🧩 Pages

| Path                | Component         | Auth      |
|---------------------|-------------------|-----------|
| `/`                 | `Home`            | public    |
| `/available-cars`   | `AvailableCars`   | public    |
| `/car/:id`          | `CarDetails`      | public    |
| `/login`            | `Login`           | public    |
| `/register`         | `Register`        | public    |
| `/add-car`          | `AddCar`          | private   |
| `/my-cars`          | `MyCars`          | private   |
| `/my-bookings`      | `MyBookings`      | private   |
| `*`                 | `Error404`        | public    |

The navbar is conditionally rendered: signed-out users see **Home / Available Cars / Log in**,
signed-in users see **Home / Available Cars / Add Car / My Cars / My Bookings / Logout**.

---

## 🧰 Tech Stack

| Layer        | Tools |
|--------------|-------|
| Framework    | React 19, Vite (rolldown) |
| Styling      | Tailwind CSS 3, custom design tokens, Syne + Inter fonts |
| Routing      | react-router-dom 7 |
| State        | TanStack Query 5, React Context for auth |
| Animation    | GSAP 3 (`ScrollTrigger`, `Flip`), Lenis-style smooth feel |
| Auth         | Firebase Auth (email/password + Google) |
| Forms        | react-hook-form |
| Icons        | lucide-react, react-icons |
| Charts       | recharts |
| HTTP         | axios with `withCredentials` |
| UX           | react-hot-toast |

---

## 🚀 Getting Started

```bash
git clone https://github.com/mdhossain-2437/b11a11-client-side-mdhossain-2437.git
cd b11a11-client-side-mdhossain-2437
npm install --legacy-peer-deps
cp .env.example .env       # then fill in Firebase + API URL
npm run dev
```

The dev server runs at <http://localhost:5173>. The companion API is expected at
the URL set in `VITE_API_URL` (default `http://localhost:5000`).

### Environment variables

| Key                                | Required | Description                              |
|------------------------------------|----------|------------------------------------------|
| `VITE_API_URL`                     | yes      | Base URL of the VelocityDrive backend     |
| `VITE_FIREBASE_API_KEY`            | yes      | Firebase web API key                      |
| `VITE_FIREBASE_AUTH_DOMAIN`        | yes      | Firebase auth domain                      |
| `VITE_FIREBASE_PROJECT_ID`         | yes      | Firebase project id                       |
| `VITE_FIREBASE_STORAGE_BUCKET`     | yes      | Firebase storage bucket                   |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| yes      | Firebase messaging sender id              |
| `VITE_FIREBASE_APP_ID`             | yes      | Firebase app id                           |

> **Never commit `.env`.** A `.env.example` is included.

---

## 📁 Project Structure

```
client/
├── public/                       # static assets, favicon
├── src/
│   ├── components/
│   │   ├── CarCard/              # grid + list car card
│   │   ├── Footer/               # global footer
│   │   ├── Layout/               # Layout + ScrollToTop
│   │   ├── Loader/               # Loader + PageSpinner
│   │   ├── Navbar/               # sticky scroll-aware navbar
│   │   └── ProtectedRoute/       # auth-gated routes
│   ├── context/
│   │   ├── AuthProvider.jsx      # Firebase + JWT cookie sync
│   │   └── auth-context.js       # Context object (separate file for fast refresh)
│   ├── hooks/
│   ├── pages/
│   │   ├── Home/                 # Banner, Stats, Testimonials, FAQ…
│   │   ├── AvailableCars/
│   │   ├── CarDetails/
│   │   ├── AddCar/
│   │   ├── MyCars/
│   │   ├── MyBookings/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── Error404/
│   ├── services/
│   │   ├── axios.js              # axiosSecure with withCredentials
│   │   └── firebase.js           # Firebase config from env
│   ├── styles/
│   │   └── globals.css           # Tailwind layers + design tokens
│   ├── utils/
│   │   └── date.js               # formatDateTime, daysBetween, formatDistance
│   ├── App.jsx                   # routes
│   └── main.jsx                  # providers (Query, Auth, Router)
├── tailwind.config.js
├── eslint.config.js
└── package.json
```

---

## 📦 npm Packages

`react`, `react-dom`, `react-router-dom`, `@tanstack/react-query`, `axios`, `firebase`,
`gsap`, `lenis`, `lucide-react`, `react-icons`, `react-hook-form`, `react-hot-toast`,
`recharts`, `prop-types`, `tailwindcss`, `postcss`, `autoprefixer`.

---

## 🧪 Quality Gates

```bash
npm run lint     # eslint .
npm run build    # vite build
```

Both run clean on every commit.

---

## 🚢 Deployment

The app deploys cleanly to Vercel, Netlify, or any static host:

```bash
npm run build      # outputs ./dist
```

Set the same `VITE_*` environment variables in your hosting provider, point the
backend to `CORS_ORIGINS=<your-frontend-url>`, and you’re live.

---

## 📜 License

MIT © DELOWAR
