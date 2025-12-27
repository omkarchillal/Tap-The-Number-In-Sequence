import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export const styles = StyleSheet.create({
  tileContainer: {
    height: metrics.TILE_SIZE,
    width: metrics.TILE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  tileImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    color: 'grey',
    fontWeight: 'bold',
    // fontFamily: 'Permanent Marker', // Use system font if not linked
    fontSize: 39,
  },
});
