import { Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

const ANDROID_STATUSBAR = 24;
const DEVICE_HEIGHT = IS_ANDROID ? height - ANDROID_STATUSBAR : height;
const DEVICE_WIDTH = width;

/**
 * Responsive Width
 * @param percentage Percentage of screen width (0-100)
 * @returns calculated width
 */
const rw = (percentage: number) => {
  return (percentage * DEVICE_WIDTH) / 100;
};

/**
 * Responsive Height
 * @param percentage Percentage of screen height (0-100)
 * @returns calculated height
 */
const rh = (percentage: number) => {
  return (percentage * DEVICE_HEIGHT) / 100;
};

/**
 * Responsive Font
 * @param size Base font size
 * @returns Scaled font size based on screen width
 */
const rf = (size: number) => {

  const scale = DEVICE_WIDTH / 375;
  return Math.round(size * scale);
};


const wp = rw;
const hp = rh;

const TILE_SIZE = rw(28);
const TILE_SHADOW_DEPTH = 6;
const TILE_BORDER_RADIUS = TILE_SIZE * 0.25;

const HEADER_HEIGHT = rh(10);
const BANNER_AD_HEIGHT = 60;
const BOARD_MARGIN = rw(5);

const TIME_BAR_HEIGHT = rh(2);


const BOARD_HEIGHT = DEVICE_HEIGHT - HEADER_HEIGHT - BANNER_AD_HEIGHT - TIME_BAR_HEIGHT - rh(5);
const BOARD_WIDTH = DEVICE_WIDTH;

export default {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  TILE_SIZE,
  TILE_SHADOW_DEPTH,
  TILE_BORDER_RADIUS,
  BOARD_MARGIN,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TIME_BAR_HEIGHT,
  HEADER_HEIGHT,
  rw,
  rh,
  rf,
  wp,
  hp
};
