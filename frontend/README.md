# CineStream Community - Frontend

CineStream is a modern movie discovery web application built with React and Vite. It allows users to browse popular movies, search for movies, save favorites, and experience seamless infinite scrolling powered by The Movie Database (TMDB) API.

---

## Features

### Phase 1 Features

* Browse Popular Movies from TMDB API
* Search Movies by Title
* Responsive Movie Grid Layout
* Movie Posters, Ratings, and Release Years
* Modern and Responsive UI

### Phase 2 Features

* Infinite Scroll using Intersection Observer API
* Debounced Search (500ms delay)
* Add/Remove Favorites
* Favorites Persistence using Local Storage
* Dedicated Favorites Page
* Lazy Loading Images for Performance Optimization

---

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* React Icons

### API

* TMDB (The Movie Database) API

### Browser APIs

* Intersection Observer API
* Local Storage API

---

## Project Structure

```text
cine-stream/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Favorites.jsx
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── README.md
└── Prompts.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd cine-stream
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### Start Development Server

```bash
npm run dev
```

---

## TMDB API Setup

1. Create a TMDB account.
2. Generate an API Key.
3. Add the key to the `.env` file.
4. Restart the development server.

---

## Performance Optimizations

### Infinite Scroll

Implemented using the native Intersection Observer API to dynamically load additional movie pages when the user reaches the bottom of the page.

### Debounced Search

Search requests are delayed by 500 milliseconds to prevent excessive API calls while typing.

### Lazy Loading

Movie poster images use native browser lazy loading to improve page performance and reduce bandwidth consumption.

---

## Favorites System

Users can:

* Add movies to favorites
* Remove movies from favorites
* Persist favorites across page refreshes
* Access favorites through a dedicated Favorites page

Favorites are stored using Local Storage.

---

## Screenshots

### Home Page
<img width="1913" height="1150" alt="Screenshot 2026-06-26 192900" src="https://github.com/user-attachments/assets/1381b1c0-61b9-42ac-a741-7b584936cea5" />

### Search Functionality
<img width="1912" height="1150" alt="image" src="https://github.com/user-attachments/assets/b31ae9f1-3aad-4afa-9870-810c03b584e4" />

### Favorites Page
<img width="1918" height="1137" alt="Screenshot 2026-06-26 192834" src="https://github.com/user-attachments/assets/cd555f9d-0dcf-4884-8d4f-f8ec294abf5c" />


### Infinite loop
<img width="1918" height="1131" alt="Screenshot 2026-06-26 193414" src="https://github.com/user-attachments/assets/4ca8725d-b3ce-4ef2-b39a-1c76dc4476ed" />

### Community
<img width="1918" height="1132" alt="Screenshot 2026-06-26 193302" src="https://github.com/user-attachments/assets/3155d947-129e-4666-ad88-ae1c2499c407" />

### Reviews
<img width="1918" height="1122" alt="Screenshot 2026-06-26 193324" src="https://github.com/user-attachments/assets/c8bbcc67-8775-4d27-aaf5-3849cf7c639b" />

---

## Live URL
https://vercel.com/kchakritha143s-projects/cine-stream-community/A1Ax6NGbSqY3h9SfdxKrnBjBCki9

## Future Improvements

* AI Mood-Based Movie Recommendations
* Movie Details Page
* Genre Filtering
* Dark/Light Theme Toggle
* Watchlist Feature
* User Authentication

---

