---
name: testing-velocitydrive
description: End-to-end test the VelocityDrive car-rental app (this client + the b11a11-server-side-mdhossain-2437 server). Use when verifying booking flows, search/sort, responsive layout, or any change to the auth-protected dashboards.
---

# Testing VelocityDrive locally

Vercel preview URLs are gated behind Vercel SSO and almost always return HTTP 401
for an agent without a Vercel session. Test against `localhost` instead — both repos
run cleanly side-by-side.

## Boot the full stack

1. **Mongo** (the server's only runtime dep besides Node):
   ```bash
   docker run -d --name velocity-mongo -p 27017:27017 mongo:7
   ```
2. **Server** (`b11a11-server-side-mdhossain-2437`) — write `.env` with these and run `npm run start`:
   ```
   PORT=5000
   NODE_ENV=development
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   MONGO_URI=mongodb://localhost:27017
   ACCESS_TOKEN_SECRET=<long random string>
   SEED_KEY=local-test-seed-key
   ```
   Wait for `Connected to MongoDB Atlas` and `VelocityDrive API listening at http://localhost:5000`.
3. **Seed 8 demo cars**:
   ```bash
   curl -X POST 'http://localhost:5000/seed?key=local-test-seed-key'
   ```
   Expected response: `{"insertedCount":8}`. The seed includes Lamborghini Aventador SVJ ($1499/d), Porsche 911 Turbo S ($599), Tesla Model S Plaid ($449), Mercedes G63 AMG ($549), Jeep Wrangler ($199), Honda Civic Type R ($149), Land Rover Defender ($379), BMW M4 ($429).
4. **Client** (`b11a11-client-side-mdhossain-2437`) — `npm install --legacy-peer-deps` (React 19 vs `lenis` peer range), then `npm run dev`. Vite serves on `http://localhost:5173/`.

## Driving the UI

The Chrome instance on this VM exposes CDP on `http://localhost:29229`. Some interactions
are flaky via `xdotool` (notably HTML5 `<input type="date">` — typing produces values
like `mm/06/12026`). Prefer Playwright over CDP whenever the input is a date, file picker,
or anything that needs precise control:

```bash
mkdir -p /tmp/pw && cd /tmp/pw && npm init -y >/dev/null && npm i --no-audit --no-fund playwright-core@1
```

Then attach with the React-aware native setter (controlled inputs ignore plain `el.value =`):

```js
const { chromium } = require('playwright-core')
const browser = await chromium.connectOverCDP('http://localhost:29229')
const ctx = browser.contexts()[0]
const page = ctx.pages().find(p => p.url().includes('/car/')) || ctx.pages()[0]
await page.evaluate(() => {
  const setNative = (el, v) => {
    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')
    desc.set.call(el, v)
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const dates = document.querySelectorAll('input[type=date]')
  setNative(dates[0], '2026-06-01')
  setNative(dates[1], '2026-06-04')
})
```

For responsive testing, **don't try to resize the OS window** — the window manager on
this VM rejects xdotool/wmctrl resize and `F11` doesn't help either. Use CDP's
`Emulation.setDeviceMetricsOverride` and clear it when you're done:

```js
const cdp = await ctx.newCDPSession(page)
await cdp.send('Emulation.setDeviceMetricsOverride',
  { width: 375, height: 720, deviceScaleFactor: 2, mobile: true })
await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true })
// … assertions …
await cdp.send('Emulation.clearDeviceMetricsOverride')
```

If the Chrome window is taller than the visible 1024×768 desktop and the page bottom is
off-screen, send `Ctrl+-` to Chrome via xdotool to zoom out the page (`xdotool key --window
<id> ctrl+minus ctrl+minus ctrl+minus`). The screenshot tool's foreground check is
strict — re-activate the window with `xdotool windowactivate --sync` immediately before
any screenshot if console calls return "Chrome is not in the foreground".

## Auth: bypassing Firebase to test protected APIs

The client uses Firebase Auth (`AuthProvider.jsx`) and the server uses an HTTP-only `token`
cookie minted at `POST /jwt`. **You can fully test the server's protected routes without
any Firebase credentials** by minting the JWT yourself with the dev `ACCESS_TOKEN_SECRET`:

```bash
node -e "const j=require('jsonwebtoken'); console.log(j.sign({email:'demo@velocitydrive.app'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'7d'}))"
```

Inject that as the `token` cookie via Playwright before clicking `Book Now`:

```js
await ctx.addCookies([
  { name: 'token', value: TOKEN, url: 'http://localhost:5173', sameSite: 'Lax' },
  { name: 'token', value: TOKEN, url: 'http://localhost:5000', sameSite: 'Lax' },
])
```

The Book Now → Confirm flow will then succeed (`POST /bookings` returns 201) and you can
verify the row server-side with `curl -b 'token=…' http://localhost:5000/my-bookings`.

**What this DOES test:** booking creation, server-side `days × dailyPrice` math, owner
scoping, regex-escaped car search, partial-date PATCH validation, all CRUD endpoints.

**What this does NOT test:** the `/my-bookings`, `/my-cars`, `/add-car` rendered UI, because
`<ProtectedRoute>` checks the React `user` from `AuthProvider` (Firebase), not the cookie.
Report these as **untested** unless you have real Firebase creds. Don't try to hack around
it — that's a load-bearing piece of the auth model and faking it past `<ProtectedRoute>`
gives a misleading test result.

## Smoke-test checklist

1. Anonymous home: navbar = `Home / Available Cars / Log-in / Get Started`, hero text `Drive Your Dreams Today`, Recent Listings shows 6+ seeded cars.
2. `/available-cars`: search `tesla` → 1 card (Model S Plaid); `Sort: Price high → low` → first card Aventador SVJ $1499/d; toggle list view → cards render full-width.
3. Car details: pick `2026-06-01` → `2026-06-04` (use the Playwright snippet above) → totals row shows `Days 3 / Daily rate $1499 / Total $4497`.
4. Click `Book Now` → confirm modal restates the values → `Confirm Booking` → toast appears (UI then redirects to `/login` if no Firebase user — that's expected; verify the booking server-side via `GET /my-bookings`).
5. `/this-route-does-not-exist` → 404 page with `Back to Home` and `Browse Cars` CTAs.
6. CDP override to 375×720 → only the hamburger button is visible; click it → stacked menu appears.

## Devin Secrets Needed

- None for the local smoke test described above.
- For full UI coverage (login form, `/my-bookings` UI, `/my-cars` CRUD, modify/cancel modals): Firebase web config (`VITE_FIREBASE_*` 6 keys + `VITE_API_URL`) at `repo` scope on the client repo. Without these, the affected flows must be reported as **untested** in the test report — do not pretend to test them.
- For testing the production Vercel previews instead of localhost: a Vercel session/token. The previews return HTTP 401 without it.

## Cleanup

When done, clear the CDP viewport override (the agent's Chrome session persists between
tasks — leaving mobile emulation on will surprise the next run):

```js
await cdp.send('Emulation.clearDeviceMetricsOverride')
await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false })
```

And if you started Mongo just for the test, `docker rm -f velocity-mongo`.
