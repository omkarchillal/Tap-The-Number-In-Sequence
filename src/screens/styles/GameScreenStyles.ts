import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';
import colors from '../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: metrics.HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.rw(2),
    alignItems: 'center',
    paddingTop: metrics.rh(1),
    marginBottom: metrics.rh(1),
  },
  iconButton: {
    padding: metrics.rw(1),
  },
  iconImage: {
    width: metrics.rw(10),
    height: metrics.rw(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scoreContainer: {
    width: metrics.rw(35),
    height: metrics.rh(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scoreTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: metrics.rh(0.5),
    paddingRight: metrics.rw(6),
    transform: [{ rotate: '-5deg' }],
  },
  scoreLabel: {
    color: '#fff',
    fontSize: metrics.rf(10),
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#000',
    fontSize: metrics.rf(20),
    fontWeight: '900',
  },
  board: {
    width: metrics.BOARD_WIDTH,
    height: metrics.BOARD_HEIGHT,
    position: 'relative',

  },
});
