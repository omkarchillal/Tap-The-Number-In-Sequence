import React from 'react';
import { Modal, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles/ExitConfirmationModalStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

interface Props {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

// const { width } = Dimensions.get('window'); // Moved to styles
// const MODAL_WIDTH = width * 0.85; // Moved to styles

const ExitConfirmationModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
            statusBarTranslucent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Background Image */}
                    <Image
                        source={{ uri: CLOUDINARY_URLS.confirmExit }}
                        style={styles.backgroundImage}
                        resizeMode="contain"
                    />

                    {/* Buttons Overlay */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { soundManager.playSound('button'); onCancel(); }} style={styles.buttonWrapper}>
                            <Image
                                source={{ uri: CLOUDINARY_URLS.cancel }}
                                style={styles.buttonImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { soundManager.playSound('button'); onConfirm(); }} style={styles.buttonWrapper}>
                            <Image
                                source={{ uri: CLOUDINARY_URLS.exit }}
                                style={styles.buttonImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ExitConfirmationModal;
