# Habitual

A minimal, offline-first habit tracker built for simplicity, consistency, and privacy.

Habitual works entirely on your device, so your habits are available even when you're offline. Install it as a Progressive Web App or use the Android app powered by Trusted Web Activity.

## Features

* Create, edit, and delete habits
* Track daily habit completion
* Check or clear all habits at once
* View progress by day and week
* Browse past and upcoming days
* Daily history snapshots
* Offline-first experience
* Local data storage with IndexedDB
* Installable as a PWA
* Android app through Trusted Web Activity
* Light and dark mode
* Responsive mobile-first interface
* No account required
* No backend required
* No data leaves your device

## Demo

**Web App:**
[Habitual](https://habitual-tracer.vercel.app)

## 📱 Android App

Habitual is also available as an Android app through a Trusted Web Activity (TWA), providing the same fast, offline-first experience as the PWA.

**Download on Android:** [Habitual.apk](https://drive.google.com/file/d/1VnD7dwKdgSeAPGTK-GKYx4NyP3wr63IO/view?usp=sharing)

> Requires Android 7.0 or later.

## Tech Stack

* **Next.js 16** — App Router
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide**
* **Dexie** — IndexedDB wrapper
* **Serwist** — Service Worker & PWA
* **Vercel** — Web deployment
* **Trusted Web Activity** — Android application

## Architecture

Habitual is designed as a local-first application.

```text
UI
 ↓
Service Layer
 ↓
Dexie
 ↓
IndexedDB
```

The application does not require an API or remote database.

Habit data is stored locally using IndexedDB, while Serwist handles the service worker and offline capabilities.

### Data Model

Habitual uses two main stores:

```text
habits
 └── Current/master habit data

history
 └── Daily habit snapshots
```

A habit's completion status belongs to a specific day, not to the habit itself. This allows Habitual to preserve historical progress independently from the current state of a habit.

## Offline First

Habitual is designed to work without an internet connection.

Once the application has been loaded and installed:

* Habits remain available offline
* Habit changes are stored locally
* Daily history persists across reloads
* The application can be launched from the device home screen
* No network connection is required for normal habit tracking

## Privacy

Habitual does not require an account.

Your habit data is stored locally on your device using IndexedDB.

There is currently:

* No authentication
* No user tracking
* No cloud database
* No habit data sent to a backend

Your data stays on your device.

## Installation

### Web

Open the Habitual web app in a supported browser and install it from the browser's install prompt.

### iOS

Open Habitual in Safari:

```text
Share
  ↓
Add to Home Screen
```

### Android

Habitual can be installed as a PWA directly from a supported browser.

An Android version is also planned using Trusted Web Activity (TWA).

## Android / TWA

The Android version uses Trusted Web Activity to provide a native Android package around the Habitual PWA.

The goal is to keep a single web application while making it available through Google Play.

```text
Habitual Web App
       │
       ├── Browser
       │
       ├── PWA
       │
       └── Android TWA
```

The Android application does not introduce a separate backend or duplicate application logic.

## Development

### Requirements

* Node.js
* pnpm

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

### Production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## Project Structure

```text
habitual/
├── app/
├── components/
├── lib/
├── services/
├── types/
├── public/
├── sw.ts
├── next.config.ts
└── package.json
```

## Roadmap

* [x] Habit management
* [x] Daily habit tracking
* [x] Weekly calendar
* [x] Historical snapshots
* [x] IndexedDB storage
* [x] Offline-first architecture
* [x] PWA support
* [x] Install experience
* [x] Dark mode
* [ ] Android TWA
* [ ] Google Play release
* [ ] App screenshots & store listing
* [ ] Optional data export/import

## Contributing

Contributions, bug reports, and feature requests are welcome.

If you find a bug or have an idea that could improve Habitual, open an issue or submit a pull request.

## License

This project is currently not licensed for redistribution.

A public license will be added when the project is ready for open-source contributions.
