# Project Explanation: Tap The Number In Sequence

This document provides a comprehensive overview of the technologies, libraries, and architecture used in this React Native application.

## 1. Project Overview
**Tap The Number In Sequence** is a mobile game where players must tap numbers in ascending order within a time limit. The game features levels, scoring, leaderboards, authentication, and monetization via ads.

## 2. Technology Stack

### Frontend (Mobile App)
- **Framework**: [React Native](https://reactnative.dev/) (v0.83.0) - Cross-platform mobile development.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for better code quality and safety.
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`, custom hooks like `useGameLogic`).

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) - REST API handling.
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose) - User data and leaderboard storage.
- **Authentication**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Verify tokens from the frontend.

## 3. Key Libraries & Dependencies

### Core Functionality
- **@react-native-firebase/auth**: Handles Google Sign-In and user authentication management.
- **@react-native-google-signin/google-signin**: Native Google Sign-In integration.
- **axios**: HTTP client for communicating with the custom backend API.
- **lodash**: Utility library for game logic (shuffling, random number generation, array manipulation).
- **uuid**: Generates unique IDs for game tiles.
- **@react-native-async-storage/async-storage**: Persists local settings (Music/Sound volume).

### UI & Animations
- **react-native-animatable**: Easy declarative animations (used for board shake, bounces, entrance effects).
- **react-native-safe-area-context**: Handles safe area insets (notches, home indicators).
- **react-native-system-navigation-bar**: Controls Android system bars (immersive mode).
- **react-native-svg** (implied): Often used by UI libraries, though this project relies heavily on `Image` assets.

### Features
- **react-native-sound**: Handles game sound effects (button clicks, correct/incorrect taps, background music).
- **react-native-google-mobile-ads**: Monetization via AdMob (Banner and Rewarded Ads).
- **react-native-permissions**: Manages device permissions (though minimal are needed for this game logic).

## 4. Architecture & Project Structure

The project follows a standard React Native directory structure within `src/`:

- **`assets/`**: Local images and sound files.
- **`components/`**: Reusable UI elements (`BounceButton`, `Tile`, `TimeBar`, Modals).
- **`config/`**: App-wide configuration constants (`cloudinary.ts` for image URLs, `metrics.ts` for responsive sizing, `colors.ts`).
- **`hooks/`**: Custom hooks encapsulating business logic (`useGameLogic` handles all game rules).
- **`screens/`**: specific screen components (`GameScreen`, `HomeScreen`, `SettingsScreen`, `SplashScreen`).
- **`services/`**: Integration layers (`audioService` for sound, `adService` for ads, `auth` for firebase).
- **`utils/`**: Helper functions (`boardUtils` for generating non-overlapping tiles).

## 5. Key Features Implementation

### Game Logic (`useGameLogic.ts`)
- The core engine that generates levels.
- logic ensures tiles do not overlap using a recursive placement algorithm in `boardUtils`.
- Handles timer countdowns, score tracking, and "Next Level" progression.

### Audio Management (`audioService.ts`)
- A Singleton service class `SoundManager`.
- Preloads sounds on startup to minimize latency.
- Manages separate volume controls for Music and SFX.
- Persists user volume preferences using `AsyncStorage`.

### Custom Splash Screen (`SplashScreen.tsx`)
- A custom component that replaces the native splash screen after the app loads.
- Implements a multi-stage sequence:
  1.  **Logo Phase**: Shows the App Logo for 1.5s.
  2.  **Loading Phase**: Shows a custom animated progress bar over a background for 3s.

### Authentication Flow
1.  User signs in via Google (`LoginScreen`).
2.  Firebase token is obtained.
3.  Token is sent to the Node.js backend (`syncUser`).
4.  Backend verifies token and creates/updates the user in MongoDB.

### Monetization
- **Banner Ads**: Displayed on the Home screen (if enabled).
- **Rewarded Video**: Used in `GameScreen` to allow players to "Continue" after a game-over.

## 6. Cloudinary Integration
- Most large image assets/backgrounds are hosted on Cloudinary (`src/config/cloudinary.ts`).
- This minimizes the app bundle size (`.apk`/`.ipa`), ensuring the app downloads quickly.

## 7. File-by-File Explanation

### Config (\src/config/\)
- **\cloudinary.ts\**: Stores all external image URLs used in the app (e.g., backgrounds, buttons, icons). Directs the app to fetch assets from Cloudinary.
- **\piConfig.ts\**: Contains the base URL for the backend API (e.g., \http://10.0.2.2:5000\).
- **\metrics.ts\**: Provides responsive sizing utilities (\w\, \h\) to calculate width/height as percentages of the screen size.
- **\colors.ts\**: Defines the application's color palette (e.g., tiles, text, backgrounds).
- **\	imings.ts\**: Constants for animation durations and delays.

### Services (\src/services/\)
- **\udioService.ts\**: A Singleton class managing all sound playback. Handles preloading, playing/stopping music, and persisting volume settings to local storage.
- **\dService.ts\**: Manages AdMob integration. Handles loading and showing Rewarded Ads for the 'Continue' feature.
- **\uth.ts\**: Wraps Firebase and Google Sign-In logic. Configuring the provider and extracting ID tokens.
- **\userApi.ts\**: Axios service functions to communicate with the Node.js backend (e.g., \syncUser\, \updateScore\).

### Screens (\src/screens/\)
- **\SplashScreen.tsx\**: The first screen seen on launch. Handles the Logo -> Loading Bar sequence.
- **\LoginScreen.tsx\**: Handles Google Sign-In UI.
- **\HomeScreen.tsx\**: The main hub. Displays player stats, High Score, and navigation buttons. Handles 'Exit App' logic.
- **\GameScreen.tsx\**: The core gameplay loop. Renders the board, handles taps, timer, and game-over states.
- **\SettingsScreen.tsx\**: Allows users to adjust Music and SFX volume using custom sliders.
- **\LeaderboardScreen.tsx\**: Fetches and displays top scores from the backend.
- **\InstructionsScreen.tsx\**: Displays a static guide on how to play.
- **\EndGameScreen.tsx\**: Shown after Game Over. Displays final score and buttons to Restart or go Home.

### Logic & Hooks (\src/hooks/\, \src/utils/\)
- **\useGameLogic.ts\**: A custom React Hook containing the entire state machine for the game (score, level, timer, tile generation, validation).
- **\oardUtils.ts\**: The algorithm for generating random, non-overlapping tile positions and assigning numbers/colors.
- **\	imeUtils.ts\**: Helper to calculate total time available based on the current level.

### Components (\src/components/\)
- **\Tile.tsx\**: The interactive game piece. Handles display and tap events.
- **\TimeBar.tsx\**: Visual countdown timer at the top of the game screen.
- **\GlobalBannerAd.tsx\**: Wrapper for the AdMob Banner to display globally/conditionally.
- **\ExitConfirmationModal.tsx\**: Modal prompt asking 'Are you sure?' before exiting.
- **\ContinueModal.tsx\**: Modal offering a 'Watch Ad to Continue' option on game over.
- **\BounceButton.tsx\**: A wrapper component ensuring all buttons have a consistent 'bounce' animation on press.

