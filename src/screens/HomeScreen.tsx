import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BounceButton from '../components/BounceButton';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';
import LogoutModal from '../components/LogoutModal';
import ExitConfirmationModal from '../components/ExitConfirmationModal';
import { styles } from './styles/HomeScreenStyles';

interface Props {
  onStart: () => void;
  onLogout: () => void;
  highScore: number;
  playerName: string;
  onShowLeaderboard: () => void;
  onShowInstructions: () => void;
  onShowSettings: () => void;
}

const HomeScreen: React.FC<Props> = ({ onStart, onLogout, highScore, playerName, onShowLeaderboard, onShowInstructions, onShowSettings }) => {
  const insets = useSafeAreaInsets();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    soundManager.playBackgroundMusic();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (showLogoutModal) {
        setShowLogoutModal(false);
        return true;
      }
      if (showExitModal) {
        setShowExitModal(false);
        return true;
      }

      soundManager.playSound('button');
      setShowExitModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showLogoutModal, showExitModal]);

  const handleExitConfirm = () => {
    soundManager.stopBackgroundMusic();
    BackHandler.exitApp();
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleLogoutPress = () => {
    soundManager.playSound('button');
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    soundManager.playSound('button');
    setShowLogoutModal(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 35) }]}>
      {/* Top Profile / Header Area */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: CLOUDINARY_URLS.nameBanner }} style={styles.nameBanner} resizeMode="stretch" />
            <Text style={styles.profileName}>{playerName}</Text>
          </View>
          <View style={styles.scorePill}>
            <Image source={{ uri: CLOUDINARY_URLS.score }} style={styles.scorePillBg} resizeMode="contain" />
            <Text style={styles.coinText}>:{highScore}</Text>
          </View>
        </View>
        <View style={styles.rightHeader}>
          <BounceButton onPress={() => { soundManager.playSound('button'); onShowSettings(); }} style={[styles.logoutButton, styles.shadow]}>
            <Image source={{ uri: CLOUDINARY_URLS.settingsIcon }} style={styles.logoutImage} resizeMode="contain" />
          </BounceButton>
          <BounceButton onPress={handleLogoutPress} style={[styles.logoutButton, styles.shadow]}>
            <Image source={{ uri: CLOUDINARY_URLS.logout }} style={styles.logoutImage} resizeMode="contain" />
          </BounceButton>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animatable.View animation="fadeInDown" style={[styles.titleWrapper, styles.shadow]}>
            <ImageBackground
              source={{ uri: CLOUDINARY_URLS.carvedStone }}
              style={styles.titleBackground}
              resizeMode="contain"
            >
            </ImageBackground>
          </Animatable.View>

          {/* Game "Card" - Removed card look, focusing on the Start Button */}
          <Animatable.View animation="zoomIn" style={styles.centerArea}>
            <BounceButton onPress={() => { soundManager.playSound('gameStart'); onStart(); }} style={styles.shadow}>
              <Image
                source={{ uri: CLOUDINARY_URLS.startGame }}
                style={styles.playButtonImage}
                resizeMode="contain"
              />
            </BounceButton>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={300} duration={600} style={styles.menuButtonsRow}>
            <BounceButton onPress={() => { soundManager.playSound('button'); onShowLeaderboard(); }} style={[styles.menuButton, styles.shadow]}>
              <Image source={{ uri: CLOUDINARY_URLS.leaderboard }} style={styles.menuButtonImage} resizeMode="contain" />
            </BounceButton>

            <BounceButton onPress={() => { soundManager.playSound('button'); onShowInstructions(); }} style={[styles.menuButton, styles.shadow]}>
              <Image source={{ uri: CLOUDINARY_URLS.instructions }} style={styles.menuButtonImage} resizeMode="contain" />
            </BounceButton>
          </Animatable.View>

          {/* Optional: Add minimal menu buttons if needed here later */}
        </ScrollView>
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <ExitConfirmationModal
        visible={showExitModal}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />
    </View>
  );
};

export default HomeScreen;

