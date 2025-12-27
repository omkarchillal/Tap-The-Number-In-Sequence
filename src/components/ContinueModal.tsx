import React from 'react';
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import colors from '../config/colors';
import BounceButton from './BounceButton';
import { styles } from './styles/ContinueModalStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

interface Props {
  visible: boolean;
  onContinue: () => void;
  onGiveUp: () => void;
  isLoading?: boolean;
  reason?: 'timeout' | 'incorrect_sequence';
}

const ContinueModal: React.FC<Props> = ({
  visible,
  onContinue,
  onGiveUp,
  isLoading = false,
  reason = 'incorrect_sequence' // Default fallback
}) => {
  const titleImageSource = reason === 'timeout'
    ? { uri: CLOUDINARY_URLS.timesup }
    : { uri: CLOUDINARY_URLS.incorrectSequence };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onGiveUp}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <ImageBackground
          source={{ uri: CLOUDINARY_URLS.stoneTabletLarge }}
          style={styles.modalBackground}
          resizeMode="stretch"
        >
          <View style={styles.contentContainer}>
            <Image source={titleImageSource} style={styles.titleImage} resizeMode="contain" />

            <Text style={styles.message}>Watch an ad to continue?</Text>
            <Text style={styles.subMessage}>You can only do this once per 20 levels!</Text>

            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
              <View style={styles.buttonContainer}>
                <BounceButton onPress={() => { soundManager.playSound('button'); onGiveUp(); }}>
                  <Image source={{ uri: CLOUDINARY_URLS.giveUp }} style={styles.buttonImage} resizeMode="contain" />
                </BounceButton>

                <BounceButton onPress={() => { soundManager.playSound('button'); onContinue(); }}>
                  <Image source={{ uri: CLOUDINARY_URLS.watchads }} style={styles.buttonImage} resizeMode="contain" />
                </BounceButton>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default ContinueModal;
