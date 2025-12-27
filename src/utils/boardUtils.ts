import { inRange, random } from 'lodash';
import { Tile } from '../types';
import metrics from '../config/metrics';
import colors from '../config/colors';

/**
 * Gets randomly one of the available tile colors.
 * @param {Array<string>} blacklist - An array with the already picked colors.
 * @return {string} A random color.
 */
const getRandomTileColor = (blacklist: Array<string> = []): string => {
  const availableColors = colors.TILES.filter(color => !blacklist.includes(color));

  if (availableColors.length > 0) {
    const randomIndex = random(0, availableColors.length - 1);
    return availableColors[randomIndex];
  }

  // Fallback: if all colors are used, pick any random color
  const randomIndex = random(0, colors.TILES.length - 1);
  return colors.TILES[randomIndex];
};

/**
 * Gets a random tile position (making sure that it does not overlap another tile).
 * @param {Array<Tile>} board - An array of the already placed tiles.
 * @return {Object} An object with the x and y coordinates of the tile.
 */
const getRandomTilePosition = (board: Array<Tile>): { x: number, y: number } => {
  const position: { x: number, y: number } = { x: 0, y: 0 };
  const boardOriginX = metrics.BOARD_MARGIN;
  const boardOriginY = metrics.BOARD_MARGIN;
  const boardWidth = metrics.BOARD_WIDTH - metrics.BOARD_MARGIN;
  const boardHeight = metrics.BOARD_HEIGHT - metrics.BOARD_MARGIN;

  let attempts = 0;
  const MAX_ATTEMPTS = 1000;

  while (attempts < MAX_ATTEMPTS) {
    const randomX = random(boardOriginX, boardWidth - metrics.TILE_SIZE);
    const randomY = random(boardOriginY, boardHeight - metrics.TILE_SIZE);
    if (_isPositionAvailable(randomX, randomY, board)) {
      position.x = randomX;
      position.y = randomY;
      return position;
    }
    attempts++;
  }

  // Fallback if no position found (shoud rarely happen)
  console.warn('Could not find available tile position after', MAX_ATTEMPTS, 'attempts');
  return position;
};

const _isPositionAvailable = (x: number, y: number, board: Array<Tile>): boolean => {
  for (const boardTile of board) {
    if (_doPositionsOverlap(x, y, boardTile.x, boardTile.y)) {
      return false;
    }
  }
  return true;
};

const _doPositionsOverlap = (x1: number, y1: number, x2: number, y2: number): boolean => {
  const tileSize = metrics.TILE_SIZE + metrics.TILE_SHADOW_DEPTH;

  const xOverlap = inRange(x1, x2, x2 + tileSize) || inRange(x2, x1, x1 + tileSize);
  const yOverlap = inRange(y1, y2, y2 + tileSize) || inRange(y2, y1, y1 + tileSize);
  return xOverlap && yOverlap;
};

/**
 * Gets a random tile number for a given level.
 * @param {number} level - The current game level.
 * @param {Array<number>} blacklist - An array the already picked numbers.
 * @return {number} A random number.
 */
const getRandomNumber = (level: number, blacklist: Array<number> = []): number => {
  let min, max;
  if (level === 1) {
    min = 0; max = 9;
  } else if (level <= 3) {
    min = 0; max = 29;
  } else if (level <= 5) {
    min = -9; max = 39;
  } else if (level <= 7) {
    min = -29; max = 69;
  } else {
    min = -99; max = 99;
  }

  let attempts = 0;
  const MAX_ATTEMPTS = 100;
  let randomNumber;

  do {
    randomNumber = random(min, max);
    attempts++;
  } while (blacklist.includes(randomNumber) && attempts < MAX_ATTEMPTS);

  return randomNumber;
};

/**
 * Gets the number of tiles that must be created for a specific level.
 * @param {number} level - The current game level.
 * @return {number} The number of tile to create.
 */
const getNumberOfTiles = (level: number): number => {
  return 3 + Math.floor((level - 1) / 5);
};

export default {
  getRandomTileColor,
  getRandomTilePosition,
  getRandomNumber,
  getNumberOfTiles,
};
