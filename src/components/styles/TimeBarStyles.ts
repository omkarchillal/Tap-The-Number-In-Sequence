import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';
import colors from '../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: metrics.TIME_BAR_HEIGHT,
    width: metrics.DEVICE_WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  backgroundBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    height: metrics.TIME_BAR_HEIGHT,
    // borderColor: colors.TRANSPARENT_DARK, // Remove border or make it visible
    // borderWidth: 1,
  },
});
