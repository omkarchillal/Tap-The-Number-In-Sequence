import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CustomAlertModal: React.FC<Props> = ({ 
    visible, 
    title, 
    message, 
    onConfirm, 
    onCancel,
    confirmText = "YES",
    cancelText = "CANCEL"
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>{cancelText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF', // White card
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#CCC',
  },
  confirmButton: {
    backgroundColor: colors.primary, // Yellow
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
      color: '#999'
  }
});

export default CustomAlertModal;
