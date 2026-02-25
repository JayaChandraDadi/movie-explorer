# Movie Explorer

A full-stack Movie Explorer application built using Next.js and the TMDB API.

Users can:
- Search movies by title
- View movie details
- Add/remove favorites
- Add personal rating (1–5)
- Add notes to favorites
- Persist favorites using LocalStorage

---

## 🌍 Live Demo

Hosted Application:
YOUR_VERCEL_URL

GitHub Repository:
YOUR_GITHUB_URL

---

## 🚀 Features

### 🔎 Search Movies
- Search movies by title
- Debounced search (400ms)
- Shows title, year, and short overview
- Handles empty results and errors

### 🎬 View Details
- Click a movie title
- Displays:
  - Poster
  - Release year
  - Runtime
  - Full overview

### ⭐ Favorites System
- Add / Remove favorites
- Rate from 1–5
- Add personal notes
- Stored in browser LocalStorage

### 💾 Persistence
- Favorites persist after page refresh

### ⚠ Error Handling
- Gracefully handles:
  - Network failures
  - API errors
  - No results found

---

## 🛠 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- TMDB API
- LocalStorage (for persistence)
- Vercel (deployment)

---

# ⚙️ Setup Instructions (Run Locally)

## 1️⃣ Clone the repository

```bash
git clone https://github.com/JayaChandraDadi/movie-explorer
cd movie-explorer

2️⃣ Install dependencies
npm install

3️⃣ Create environment variables

Create a file named:

.env.local

Add:

TMDB_API_KEY=YOUR_TMDB_API_KEY
TMDB_BASE_URL=https://api.themoviedb.org/3

⚠ Important:

Do NOT commit .env.local

This file is ignored by git

4️⃣ Run the development server
npm run dev

Open in browser:

http://localhost:3000

Deployment (Vercel)

Push project to GitHub

Import repository into Vercel

Go to:

Project → Settings → Environment Variables

Add:

TMDB_API_KEY=YOUR_TMDB_API_KEY
TMDB_BASE_URL=https://api.themoviedb.org/3

Redeploy

🔐 API Security Design

The frontend does NOT call TMDB directly.

Instead it calls internal API routes:

/api/tmdb/search?query=...
/api/tmdb/movie/:id

These routes:

Run server-side

Use environment variables

Keep the API key secure

Prevent exposing keys in client bundle

🧠 Technical Decisions & Tradeoffs
1️⃣ API Proxy (Security First)

Decision: Use Next.js API routes as a proxy
Reason: Protect TMDB API key
Tradeoff: Slight additional server hop

2️⃣ LocalStorage for Persistence

Decision: Store favorites in LocalStorage
Reason: Simple, fast implementation
Tradeoff: Data is browser-specific

If more time:

Add database

Add user accounts

Sync across devices

3️⃣ Simple State Management

Decision: React hooks + custom useFavorites hook
Reason: Clean and lightweight
Tradeoff: Not scalable for large apps

4️⃣ Debounced Search

Decision: 400ms debounce
Reason: Reduce unnecessary API calls
Tradeoff: Small delay before showing results

🚧 Known Limitations

No pagination for search results

No caching for repeated searches

No backend database

Minimal UI styling

No authentication

No automated tests

🔮 Improvements With More Time

Add pagination / infinite scroll

Add server-side database

Add caching layer

Improve UI responsiveness

Add dark/light mode toggle

Add unit & integration tests

Add accessibility improvements

📄 TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.


---

# ✅ What To Do Now

1. Open your project
2. Replace entire `README.md` with this
3. Replace placeholders
4. Commit & push:

```bash
git add .
git commit -m "Add final README"
git push