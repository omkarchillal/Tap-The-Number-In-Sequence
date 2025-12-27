# Tap The Number In Sequence

A fast-paced, brain-training React Native mobile game where players must tap numbers in ascending order before time runs out. Test your reflexes and cognitive speed across increasingly difficult levels!

## 🎮 Game Description

**Tap The Number In Sequence** challenges players to find and tap numbers (e.g., 1, 2, 3...) scattered randomly across the screen.

*   **Core Gameplay**: Tap numbers in correct ascending order (1 -> 2 -> 3...).
*   **Levels**: Each level increases the number of tiles and imposes a stricter time limit.
*   **Timer**: A dynamic time bar shrinks as you play. If it hits zero, it's Game Over.
*   **Verification**: Tapping the wrong number results in an "invalid sequence" strike (shaking animation).
*   **Power-ups / Ads**: Watch a rewarded video ad to continue if you fail a level.

## ✨ Features

*   **Google Sign-In**: Secure authentication to save your high scores.
*   **Leaderboard**: Compete with other players and see top scores (synced via Backend).
*   **Cloud Assets**: High-quality assets loaded for optimal app size (Cloudinary).
*   **Dynamic Audio**: Sound effects for taps, level ups, and game over, with volume controls in Settings.
*   **AdMob Integration**: Banner ads and Rewarded Video ads for "Continue" functionality.

## 🛠️ Tech Stack

*   **Frontend**: React Native (0.83.0), TypeScript
*   **Auth**: React Native Firebase (Auth & Google Sign-In)
*   **Ads**: React Native Google Mobile Ads
*   **Backend**: Node.js (for user/score syncing - separate `Backend` folder)
*   **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
*   **Navigation**: React Native State-based navigation (Custom Router)

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: >= 20.0.0
*   **JDK**: JDK 17 or newer
*   **Android Studio**: With SDK platforms and Virtual Device (Emulator) installed.
*   **Google Service Keys**: You need `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) for Firebase/Auth to work.

### Installation

1.  **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd Tap-The-Number-In-Sequence
    ```

2.  **Install Dependencies**:
    ```sh
    npm install
    ```

3.  **Backend Setup** (Optional for local dev, but required for Leaderboard):
    Navigate to the `Backend` folder and install dependencies:
    ```sh
    cd Backend
    npm install
    # Start the backend server
    nodemon index.js
    ```
    *Note: Ensure your MongoDB connection string is set up in the backend.*

## 🏃‍♂️ Running the App

### Step 1: Start Metro
Start the JavaScript bundler:
```sh
npm start
```

### Step 2: Run on Android
In a separate terminal, build and launch the Android app:
```sh
npm run android
```

### Step 3: Run on iOS
(Requires macOS)
1.  Install CocoaPods: `cd ios && pod install && cd ..`
2.  Run the app:
    ```sh
    npm run ios
    ```

## 📱 Troubleshooting

*   **"Current activity is null"**: This usually happens if `GoogleSignin` or `Ads` are initialized too early. The app has been patched to handle this, but if it reoccurs, ensure you are running the latest version.
*   **Missing Assets**: If backgrounds don't load, ensure your internet connection is active as assets are fetched from Cloudinary.
*   **Build Errors**: Try cleaning the build cache:
    ```sh
    cd android
    ./gradlew clean
    cd ..
    npm start -- --reset-cache
    ```
