# FinTrack — Personal Finance Tracker

A React app to track income and expenses, set category budgets, and see
monthly reports. Amounts are shown in Indian Rupees (₹).

This version is written with the simplest React patterns possible:
**no Context API, no custom hooks** — just `useState`, `useEffect`, and
data passed down through props from a single `App.jsx`.

## Run it locally

You need [Node.js](https://nodejs.org) installed (v18 or newer).

```bash
cd fintrack
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Log in with
any name/email — it's a demo login with no real backend, just enough to
demonstrate protected routes.

To create a production build:

```bash
npm run build
npm run preview
```

## Push it to GitHub

```bash
git init
git add .
git commit -m "FinTrack: personal finance tracker"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Project structure

```
src/
  App.jsx           ALL the app's state lives here (user, transactions,
                    budgets) as plain useState, saved to localStorage with
                    useEffect, and passed down to pages as props.
  routes/
    RequireAuth.jsx  Plain component: if no user prop, redirect to /login
  components/
    Layout/          Sidebar, Topbar, Layout (wraps a page with the sidebar)
    UI/              Button, Card, StatCard, EmptyState — small reusable pieces
    Transactions/    TransactionForm, TransactionItem, TransactionList
    Charts/          CategoryBarChart (plain-CSS bar chart, no library)
  pages/             One file per route: Dashboard, Transactions, AddTransaction,
                    Budget, Reports, Login, NotFound — each just receives
                    props and renders UI, no data-fetching logic of its own.
  utils/            format.js (INR + date helpers), categories.js
public/data/        sample-transactions.json — loaded once via fetch()
```

## How data flows (the whole app, in short)

1. `App.jsx` holds `user`, `transactions`, and `budgets` in `useState`.
2. Three `useEffect`s save each of those to `localStorage` whenever they change.
3. A fourth `useEffect` runs once on load: if there are no transactions yet,
   it `fetch`es `sample-transactions.json` and fills the list.
4. `App.jsx` passes the state and update functions (`addTransaction`,
   `deleteTransaction`, `setBudgetForCategory`, `handleLogin`, `handleLogout`)
   down to each page as props.
5. Pages pass what they need further down to smaller components (also as props).

No Context, no `useMemo`/`useCallback`/`useRef`, no `<Outlet />` — everything
is a plain function component reading its `props` and calling `useState`/`useEffect`
when it needs to.

## How the syllabus topics map to this project

| Topic | Where to find it |
|---|---|
| Semantic HTML, accessibility | `index.html`, visible focus states in `index.css` |
| CSS Box Model, Flexbox, Grid | `src/styles/layout.css`, `components.css` |
| Responsive / mobile-first | `@media` queries in `layout.css` (sidebar collapses on small screens) |
| Variables, functions, arrays, objects, loops | Throughout, e.g. `utils/format.js`, `.reduce()`/`.filter()` in `App.jsx` |
| let/const, arrow functions, destructuring, spread/rest | Every component, e.g. `{ ...transaction, id: ... }` in `App.jsx` |
| Modules, imports/exports | Every file uses ES module `import`/`export` |
| Promises, async/await, fetch API, JSON | `loadSampleData()` inside the `useEffect` in `App.jsx` |
| DOM/event handling, forms | `TransactionForm.jsx`, `Login.jsx`, `Budget.jsx` |
| Browser storage | The three `useEffect`s in `App.jsx` that call `localStorage.setItem` |
| useState, useEffect | Used throughout — `App.jsx`, `TransactionForm.jsx`, `Transactions.jsx`, `Reports.jsx` |
| Component composition, reusable UI | `components/UI/*`, `components/Transactions/*` |
| Lifting state up / prop drilling | This whole project is an example — state lives in `App.jsx` and flows down through props |
| React Router, protected routes, 404 | `App.jsx` (all `<Route>`s), `routes/RequireAuth.jsx`, `pages/NotFound.jsx` |
| Rendering lists, conditional rendering | `TransactionList.jsx`, `Budget.jsx`, empty states everywhere |

**Note:** the syllabus also lists `useMemo`, `useCallback`, `useRef`, and
Context/custom hooks — these are real React tools and worth learning, but
they're optimizations/abstractions on top of what's here, not required to
build the app. If your syllabus needs you to *show* them, the natural
places to add them are: `useMemo` around the totals calculation in
`App.jsx`, `useCallback` around `addTransaction`/`deleteTransaction`,
`useRef` to auto-focus the amount field in `TransactionForm.jsx`, and
`useContext` to avoid passing `user`/`transactions` through every page.

## Notes

- All data lives in the browser's `localStorage` — there's no real backend,
  so data stays on the device/browser you used.
- The login page is a demo (any name/email works) purely to show how
  protected routes and redirects work with React Router.
