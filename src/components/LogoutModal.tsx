import React from 'react';
import { Modal, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles/LogoutModalStyles';
import { CLOUDINARY_URLS } from '../config/cloudinary';
import { soundManager } from '../services/audioService';

interface Props {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
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
                        source={{ uri: CLOUDINARY_URLS.confirmLogout }}
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
                                source={{ uri: CLOUDINARY_URLS.logoutbutton }}
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

export default LogoutModal;
