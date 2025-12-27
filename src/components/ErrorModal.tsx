import React from 'react';
import { Modal, View, Text, ImageBackground } from 'react-native';
import BounceButton from './BounceButton';
import { styles } from './styles/ErrorModalStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

// const { width } = Dimensions.get('window'); // Moved to styles

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ImageBackground
          source={{ uri: CLOUDINARY_URLS.emptyTile }}
          style={styles.modalBackground}
          resizeMode="contain"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Notice</Text>
            <Text style={styles.message}>{message}</Text>

            <BounceButton onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </BounceButton>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default ErrorModal;
