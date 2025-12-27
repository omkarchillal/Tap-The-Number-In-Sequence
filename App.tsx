import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, ImageBackground, AppState } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged as onFirebaseAuthStateChanged } from '@react-native-firebase/auth';
import { signOut, configureGoogleSignIn } from './src/services/auth';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import EndGameScreen from './src/screens/EndGameScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import { syncUser, saveScore } from './src/services/userApi';
import mobileAds from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { soundManager } from './src/services/audioService';
import { CLOUDINARY_URLS } from './src/config/cloudinary';

import SettingsScreen from './src/screens/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen';

type Screen = 'HOME' | 'GAME' | 'ENDGAME' | 'LEADERBOARD' | 'INSTRUCTIONS' | 'SETTINGS';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [adsInitialized, setAdsInitialized] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hideSystemBars = () => {
      // Enable full screen (immersive mode)
      // Hide both status bar and navigation bar
      SystemNavigationBar.stickyImmersive();
      StatusBar.setHidden(true);
    };

    hideSystemBars();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        hideSystemBars();
        soundManager.resumeBackgroundMusic();
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        soundManager.pauseBackgroundMusic();
      }
    });

    // Initialize Ads SDK
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Ads Initialized', adapterStatuses);
        setAdsInitialized(true);
      });

    // Initialize Google Sign-In
    configureGoogleSignIn();

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (user) {
      // Sync user with MongoDB backend
      syncUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }).then(userData => {
        if (userData) {
          if (userData.user && userData.user.highScore !== undefined) {
            setHighScore(userData.user.highScore);
          } else if (userData.highScore !== undefined) {
            setHighScore(userData.highScore);
          }
        }
      }).catch(err => console.error("Failed to sync user", err));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onFirebaseAuthStateChanged(auth, onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const startGame = () => {
    setCurrentScreen('GAME');
  };

  const endGame = (score: number, status: 'completed' | 'abandoned' = 'completed') => {
    setFinalScore(score);
    setCurrentScreen('ENDGAME');

    if (user) {
      saveScore({
        uid: user.uid,
        score,
        email: user.email,
        displayName: user.displayName,
        status
      }).then(data => {
        if (data && data.user && data.user.highScore !== undefined) {
          setHighScore(data.user.highScore);
        }
      }).catch(err => console.error("Failed to save score", err));
    }
  };

  const goHome = () => {
    setCurrentScreen('HOME');
  };

  const restartGame = () => {
    setCurrentScreen('GAME');
  };

  const handleLogout = async () => {
    soundManager.stopBackgroundMusic();
    await signOut();
  };

  const bgImage = (!user || currentScreen === 'HOME')
    ? { uri: CLOUDINARY_URLS.homeBg }
    : { uri: CLOUDINARY_URLS.otherBg };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ImageBackground source={bgImage} style={styles.container} resizeMode="cover">
        <StatusBar hidden translucent backgroundColor="transparent" />

        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : !user ? (
          <LoginScreen />
        ) : (
          <>
            {/* {adsInitialized && <GlobalBannerAd />} */}
            {currentScreen === 'HOME' && (
              <HomeScreen
                onStart={startGame}
                onLogout={handleLogout}
                highScore={highScore}
                playerName={user.displayName || 'Player'}
                onShowLeaderboard={() => setCurrentScreen('LEADERBOARD')}
                onShowInstructions={() => setCurrentScreen('INSTRUCTIONS')}
                onShowSettings={() => setCurrentScreen('SETTINGS')}
              />
            )}
            {currentScreen === 'GAME' && <GameScreen onEndGame={endGame} onBack={goHome} />}
            {currentScreen === 'ENDGAME' && (
              <EndGameScreen
                score={finalScore}
                onRestart={restartGame}
                onHome={goHome}
              />
            )}
            {currentScreen === 'LEADERBOARD' && <LeaderboardScreen onBack={goHome} />}
            {currentScreen === 'INSTRUCTIONS' && <InstructionsScreen onBack={goHome} />}
            {currentScreen === 'SETTINGS' && <SettingsScreen onBack={goHome} />}
          </>
        )}
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F2', // Cream background
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
