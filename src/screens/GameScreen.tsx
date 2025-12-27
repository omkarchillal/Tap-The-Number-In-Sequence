import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, AppState, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameLogic } from '../hooks/useGameLogic';
import Tile from '../components/Tile';
import TimeBar from '../components/TimeBar';
import ExitConfirmationModal from '../components/ExitConfirmationModal';
import ContinueModal from '../components/ContinueModal';
import { showRewardedAd, loadRewardedAd } from '../services/adService';
import BounceButton from '../components/BounceButton';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

import { styles } from './styles/GameScreenStyles';

interface Props {
  onEndGame: (score: number, status?: 'completed' | 'abandoned') => void;
  onBack: () => void;
}

const GameScreen: React.FC<Props> = ({ onEndGame, onBack }) => {
  const { tiles, isEndgame, score, level, totalTime, isBoardValid, continueUsedInBlock, startGame, resumeGame, handleTilePress, pauseGame, unpauseGame, isGameRunning } = useGameLogic();
  const insets = useSafeAreaInsets();
  const backgroundStartTime = React.useRef<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [continueModalVisible, setContinueModalVisible] = useState(false);
  const [loadingAd, setLoadingAd] = useState(false);


  useEffect(() => {
    startGame();
    loadRewardedAd();
  }, [startGame]);


  useEffect(() => {
    if (level > 1) {
      soundManager.playSound('levelup');
    }
  }, [level]);


  useEffect(() => {
    soundManager.stopBackgroundMusic();
  }, []);


  useEffect(() => {
    if (isEndgame) {
      // Check if eligible for continue
      // Eligible if: NOT used in this 20-level block (handled by useGameLogic)
      if (!continueUsedInBlock) {
        setContinueModalVisible(true);
      } else {
        onEndGame(score, 'completed');
      }
    }
  }, [isEndgame, score, onEndGame, continueUsedInBlock]);


  useEffect(() => {
    const backAction = () => {
      pauseGame();
      soundManager.playSound('button');
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pauseGame]);


  // Monitor AppState to handle backgrounding behavior
  // If app is in background for > 15 seconds, we abandon the game to prevent cheating
  // Monitor AppState to handle backgrounding behavior
  // If app is in background for > 15 seconds, we abandon the game to prevent cheating
  // EXCEPTION: If an ad is loading/showing, we ignore this check.
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      // If ad is showing, do not track background time
      if (loadingAd) {
        backgroundStartTime.current = null;
        return;
      }

      if (nextAppState.match(/inactive|background/)) {
        backgroundStartTime.current = Date.now();
      } else if (nextAppState === "active") {
        if (backgroundStartTime.current) {
          const timeInBackground = Date.now() - backgroundStartTime.current;
          // Only abandon if not loading ad (double check) and time > 15s
          if (!loadingAd && timeInBackground > 15000) {
            onEndGame(score, 'abandoned');
          }
          backgroundStartTime.current = null;
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [score, onEndGame, loadingAd]);

  const handleAbandon = () => {
    setModalVisible(false);
    onEndGame(score, 'abandoned');
  };

  const handleContinue = () => {
    setLoadingAd(true);
    let rewardEarned = false;

    // Show rewarded ad
    // If user watches full ad, rewardEarned will be true in 'EARNED_REWARD' callback
    // We then resume the game with 5 extra seconds upon close.
    showRewardedAd(
      () => {
        // User finished video
        rewardEarned = true;
      },
      () => {
        // Ad closed
        setLoadingAd(false);
        setContinueModalVisible(false);

        if (rewardEarned) {
          resumeGame(5000);
        } else {
          // User closed without reward -> Game Over
          onEndGame(score, 'completed');
        }
      },
      (error) => {
        // On Error (e.g. no fill)
        setLoadingAd(false);
        setContinueModalVisible(false);
        console.error("Ad Error", error);
        Alert.alert("Ad failed", "Could not load ad. Game Over.");
        onEndGame(score, 'completed');
      }
    );
  };

  const handleGiveUp = () => {
    setContinueModalVisible(false);
    onEndGame(score, 'completed');
  };

  // Manual Back Button Handler
  const handleManualBack = () => {
    pauseGame();
    soundManager.playSound('button');
    setModalVisible(true);
  };



  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1 }}>
        <TimeBar
          key={level}
          isGameRunning={isGameRunning && !isEndgame && !continueModalVisible}
          duration={totalTime}
        />
      </View>
      <View style={[styles.header, { marginTop: Math.max(insets.top, 20) }]}>
        <BounceButton onPress={handleManualBack} style={styles.iconButton}>
          <Image source={{ uri: CLOUDINARY_URLS.back }} style={styles.iconImage} resizeMode="contain" />
        </BounceButton>

        <View style={styles.scoreContainer}>
          <Image source={{ uri: CLOUDINARY_URLS.scoreDisplay }} style={styles.scoreBg} resizeMode="stretch" />
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreLabel}>LEVEL {level}</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
        </View>

      </View>

      <Animatable.View
        style={styles.board}
        animation={isBoardValid ? undefined : 'shake'}
        iterationCount={1}
        duration={500}
      >
        {tiles.map((tile) => (
          tile.isVisible && (
            <Tile
              key={tile.id}
              id={tile.id}
              number={tile.number}
              color={tile.color}
              onPress={() => {
                handleTilePress(tile.id);
              }}
              isEnabled={!isEndgame}
              style={{
                position: 'absolute',
                left: tile.x,
                top: tile.y,
              }}
            />
          )
        ))}
      </Animatable.View>

      <ExitConfirmationModal
        visible={modalVisible}
        onConfirm={handleAbandon}
        onCancel={() => {
          setModalVisible(false);
          unpauseGame();
        }}
      />

      <ContinueModal
        visible={continueModalVisible}
        onContinue={handleContinue}
        onGiveUp={handleGiveUp}
        isLoading={loadingAd}
        reason={isBoardValid ? 'timeout' : 'incorrect_sequence'}
      />
    </View>
  );
};

export default GameScreen;
