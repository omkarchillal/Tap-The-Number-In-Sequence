import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: 320,
    height: 480, // Adjustable based on content
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  titleImage: {
    width: 260,
    height: 160,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#3E2723', // Dark brown for stone
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subMessage: {
    fontSize: 14,
    color: '#5D4037', // Slightly lighter brown
    marginBottom: 30,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    gap: 15
  },
  buttonImage: {
    width: 200,
    height: 60,
  },
});
