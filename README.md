# 🎬 FlixFlex - Mobile Movies App

A **React Native (Expo)** application developed as part of the **technical test** for the **Mobile Developer** role at <img src="https://temtemone.com/_next/static/media/Logo-temtemOne.15009a93.svg" alt="Temtem" height="24" style="vertical-align: middle;" />

FlixFlex allows users to **browse movies and series**, check details, and watch trailers — all powered by **The Movie Database (TMDb) API**.

[![Watch Demo](https://img.shields.io/badge/▶️%20Watch%20Demo-purple?style=for-the-badge)](https://naviresto-api.s3.eu-west-1.amazonaws.com/flix-flex.mp4)

---

## ✨ Features

- 🔐 **Authentication** with Clerk (Signup / Signin).
- 🎞️ **Browse Movies & Series** in dedicated tabs.
- ⭐ **Top 5 rated** movies & series highlighted in each section.
- 📜 **Paginated lists** (10 items per page).
- 🔍 **Search** for movies and TV shows by title.
- 📖 **Detailed view** of each movie/series (rating, overview, genres, cast, production, etc.).
- ▶️ **Trailer playback** directly in the app.
- 📱 **Modern UI/UX** with TailwindCSS (via NativeWind).
- ⚡ State management with hooks & contexts (genre mapping, TMDb queries).

---

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) (React Native)
- [Clerk](https://clerk.dev/) - Authentication
- [TMDb API](https://www.themoviedb.org/documentation/api) - Movies/Series data
- [React Hook Form + Zod](https://react-hook-form.com/) - Form validation
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS styling
- TypeScript for strong typing

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/oussamabng/flix-flex
cd flix-flex
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup environment variables

1. Copy the `.env.example` file to create your own `.env` file:

   ```bash
   cp .env.example .env
   ```

2. Open the new `.env` file and fill in your API keys:

   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   EXPO_PUBLIC_TMDB_KEY=your_tmdb_key_here
   ```

3. **Get your keys**:
   - **Clerk**:
     - Go to [Clerk.dev](https://clerk.dev/)
     - Create an account and a new project
     - Copy the **Publishable Key** from your project dashboard
     - Paste it into `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`

   - **TMDb**:
     - Create a free account at [The Movie Database](https://www.themoviedb.org/documentation/api)
     - Go to **Settings → API → Create API Key**
     - Copy your API key
     - Paste it into `EXPO_PUBLIC_TMDB_KEY`

4. Restart your Expo project after saving the `.env` file so the new variables take effect.

### 4. Run the project

1. Start the Expo development server:

   ```bash
   npx expo start
   ```

2. You can then choose how to run the app:
   - Press `i` to launch it on **iOS Simulator** (Mac only).
   - Press `a` to launch it on **Android Emulator**.
   - Scan the QR code in the terminal (or Expo Go app) to run it on a **real device**.

### 5. Project structure

The project follows a modular structure for clarity and scalability:

```
├── api
│   ├── fetcher.ts                # Generic fetch wrapper
│   ├── tmdb-client.ts            # TMDb API client with typed requests
│   └── tmdb.ts                   # TMDb endpoints and helpers
├── app
│   ├── (auth)                    # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   ├── (media)                   # Media details & trailer screens
│   │   ├── [mediaType]
│   │   │   └── [id].tsx
│   │   └── trailer.tsx
│   ├── (tabs)                    # Main tab navigation
│   │   ├── _layout.tsx
│   │   ├── movies.tsx
│   │   └── series.tsx
│   ├── +html.tsx                 # Expo Router required files
│   ├── +not-found.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry redirect (auth vs app)
├── assets                        # App assets (icons, splash, adaptive icons)
├── components
│   ├── auth                      # Auth UI components (header, footer, fields)
│   ├── layouts                   # Layout components (header, container, etc.)
│   ├── ui                        # Reusable UI primitives (button, input, etc.)
│   ├── media-card.tsx            # Card for media items
│   ├── media-list-screen.tsx     # Generic screen for Movies/Series
│   ├── horizontal-list.tsx       # Horizontal list for top 5 items
│   └── skeleton-box.tsx          # Skeleton loaders
├── contexts
│   └── genre-context.tsx         # Provides TMDb genres globally
├── hooks                         # Custom React hooks for TMDb queries
│   ├── use-tmdb.tsx
│   ├── use-tmdb-search.ts
│   └── use-tmdb-details.ts
├── schemas                       # Zod schemas for form validation
│   └── auth
│       ├── signin-schema.ts
│       └── signup-schema.ts
├── types
│   └── media.ts                  # Shared types for TMDb and media items
├── utils                         # Utility functions
│   ├── clerk.ts                  # Clerk helpers
│   ├── config.ts                 # Centralized config
│   ├── get-api-error.ts          # Error normalizer
│   ├── helpers.ts                # Helpers (e.g., format runtime)
│   └── tmdb.mapper.ts            # Maps TMDb responses → MediaItem
```
