import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: width * 0.8,
    // height: width * 0.8, // Removed square constraint
    minHeight: 260,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4E342E', // Dark brown for stone contrast
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  message: {
    fontSize: 16,
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#8D6E63', // Brown button
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4E342E',
    marginBottom: 20,
  },
  buttonText: {
    color: '#EFEBE9',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
