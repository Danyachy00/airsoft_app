# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A React 19 + Vite frontend for an airsoft game sign-up app, designed to run as a **Telegram Mini App** (`index.html` loads the Telegram WebApp JS SDK, and `App.jsx` auto-logs-in via `window.Telegram.WebApp.initData` on mount). UI text is in Ukrainian. Styling is Tailwind CSS v4 (via `@tailwindcss/vite`) combined with hand-written BEM-ish classes in `src/App.css`.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview a production build
npm run lint      # run ESLint over the project
```

There is no test runner configured in this repo.

Backend API base URL is read from `VITE_API_URL` (set in `.env`, currently `https://airsoft.loc/api`). The Vite dev server allows `.ngrok-free.dev` / `.ngrok-free.app` hosts (see `vite.config.js`) for tunneling during Telegram Mini App testing, since Telegram requires an HTTPS URL.

## Architecture

- **Routing** (`src/App.jsx`): `react-router-dom` with routes `/` (Preload/splash) → `/games` (HomePage) → `/games/:id` (GameDetails) → `/games/:id/register` (Register) → `/profile` (Profile). `App.jsx` fires the Telegram login attempt unconditionally on every render (not gated in an effect), so watch for duplicate-call issues when modifying it.
- **API layer** (`src/helpers/`):
  - `axios.js` creates the shared `axios` instance, attaches `Authorization: Bearer <token>` from `localStorage` via a request interceptor, and logs failed responses via a response interceptor.
  - `auth.js` handles email/password login, Telegram login (`loginTelegram`), logout, and `isAuthenticated()`. Token is persisted to `localStorage` under the `token` key.
  - `games.js` wraps the `/game` endpoints: list, get one, create, delete, sign-up, cancel sign-up. All responses are unwrapped from a `{ data: { data: ... } }` envelope.
- **Components** (`src/components/`) are route-level pages plus shared UI:
  - `Preload.jsx` — splash/loading screen, auto-navigates to `/games` when its fake progress bar completes.
  - `HomePage.jsx` / `GameCard.jsx` — game list and card, fetch via `getGames()`.
  - `GameDetails.jsx` — single game view; note it reads fields from the live API shape (`total_to_rent`, `total_players`, `is_registered`), which differs from the shape in `src/data/data.js` (`totalSpots`/`freeSpots`/`isRegistered`) — that file is legacy/mock data, not the current API contract.
  - `Register.jsx` — sign-up form for a game; currently the form inputs are uncontrolled/not wired to state or an API call yet (confirmation just navigates back).
  - `Profile.jsx` — profile summary using real API data via `getGames()`.
  - `ProfilePage.jsx` — a separate, more built-out profile/edit UI still using local `MOCK_USER`/`MOCK_GAMES` data and inline SVG icons instead of `lucide-react`; not wired into the router yet. Treat `Profile.jsx` as the active page and `ProfilePage.jsx` as in-progress/experimental when making changes.
  - `BottomNav.jsx` — shared bottom navigation between `/games` and `/profile`.
  - `TestLoginButton.jsx` — dev/testing helper for the email/password login flow; not part of the main navigation flow.
- **Styling**: Tailwind utility classes are used inline in JSX; larger structural/page styles live in `src/App.css` as custom classes (e.g. `.game-card`, `.details-page`, `.register-form`, `.bottom-nav`). When adding UI, prefer following this existing split (Tailwind for small utility tweaks, a named class in `App.css` for a new page/section layout) rather than introducing a new styling approach.

## Known inconsistencies to be aware of

- `src/data/data.js` mock data uses a different field naming convention than the real API (see `GameDetails.jsx` note above). Don't assume the mock shape matches live data.
- `ProfilePage.jsx` duplicates functionality found in `Profile.jsx` with mock data and is not routed — confirm which one the user means before editing "the profile page".
