import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  titleImage: {
    width: metrics.rw(85),
    height: metrics.rh(30),
    marginBottom: metrics.rh(2),
    transform: [{ rotate: '-3deg' }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scoreLabel: {
    color: '#FFFFFF', // White text for visibility on background
    fontSize: metrics.rf(24),
    fontWeight: 'bold',
    marginBottom: metrics.rh(0.5),
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  score: {
    fontSize: metrics.rf(70),
    color: '#FFFFFF', // White text for visibility on background
    fontWeight: '900',
    marginBottom: metrics.rh(3),
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: metrics.rh(2),
    width: '100%',
    alignItems: 'center'
  },
  buttonImage1: {
    width: metrics.rw(50),
    height: metrics.rh(8),
    transform: [{ rotate: '-3deg' }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonImage2: {
    width: metrics.rw(50),
    height: metrics.rh(8),
    transform: [{ rotate: '3deg' }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  }
});
