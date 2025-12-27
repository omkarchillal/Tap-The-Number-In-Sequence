import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from '../config/colors';
import BounceButton from '../components/BounceButton';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

import { styles } from './styles/EndGameScreenStyles';

interface Props {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

const EndGameScreen: React.FC<Props> = ({ score, onRestart, onHome }) => {
  useEffect(() => {
    soundManager.playBackgroundMusic();
  }, []);

  return (
    <View style={styles.container}>
      {/* Result Card */}
      <Animatable.View animation="bounceIn" style={styles.contentContainer}>
        <View style={styles.innerContent}>
          <Image source={{ uri: CLOUDINARY_URLS.gameOver }} style={styles.titleImage} resizeMode="contain" />

          <Text style={styles.scoreLabel}>Final Score</Text>
          <Text style={styles.score}>{score}</Text>

          <View style={styles.buttonContainer}>
            <BounceButton onPress={() => { soundManager.playSound('gameStart'); onRestart(); }}>
              <Image source={{ uri: CLOUDINARY_URLS.playAgain }} style={styles.buttonImage1} resizeMode="contain" />
            </BounceButton>

            <BounceButton onPress={() => { soundManager.playSound('button'); onHome(); }}>
              <Image source={{ uri: CLOUDINARY_URLS.homeButton }} style={styles.buttonImage2} resizeMode="contain" />
            </BounceButton>
          </View>
        </View>
      </Animatable.View >
    </View >
  );
};

export default EndGameScreen;
