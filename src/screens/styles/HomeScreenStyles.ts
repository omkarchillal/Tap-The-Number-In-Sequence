import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import metrics from '../../config/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.rw(5),
    marginBottom: metrics.rh(4),
    alignItems: 'flex-start',
    height: metrics.rh(15),
  },
  leftHeader: {
    alignItems: 'center',
  },
  profileContainer: {
    height: metrics.rh(7),
    width: metrics.rw(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.rh(0.5),
  },
  nameBanner: {
    position: 'absolute',
    width: '130%',
    height: '110%',
  },
  profileName: {
    fontWeight: 'bold',
    color: 'rgba(226, 223, 223, 1)',
    fontSize: metrics.rf(16),
    zIndex: 1,
    marginTop: -metrics.rh(1.5),
  },
  scorePill: {
    width: metrics.rw(35),
    height: metrics.rh(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.rh(0.5),
    alignSelf: 'flex-start',
    transform: [{ rotate: '-2deg' }],
  },
  scorePillBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  coinText: {
    color: 'rgba(71, 70, 70, 1)',
    fontWeight: 'bold',
    fontSize: metrics.rf(16),
    marginLeft: metrics.rw(20),
    marginTop: -metrics.rh(0.5),
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  logoutButton: {
    padding: metrics.rw(1),
  },
  logoutImage: {
    width: metrics.rw(15),
    height: metrics.rw(15),
    transform: [{ rotate: '3deg' }],
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: metrics.rh(5),
  },
  heroTitle: {
    fontSize: metrics.rf(30),
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  titleWrapper: {
    marginBottom: metrics.rh(3),
    alignItems: 'center',
  },
  titleBackground: {
    width: metrics.rw(85),
    height: metrics.rh(25),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-2deg' }],
  },
  centerArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonImage: {
    width: metrics.rw(50),
    height: metrics.rw(50),
    transform: [{ rotate: '1deg' }],
  },
  menuButtonsRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: metrics.rh(2),
    marginTop: metrics.rh(2),
  },
  menuButton: {

  },
  menuButtonImage: {
    width: metrics.rw(50),
    height: metrics.rh(8),
    resizeMode: 'contain',
    transform: [{ rotate: '-3deg' }],
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
