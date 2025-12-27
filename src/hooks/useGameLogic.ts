import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filter, find, orderBy, times } from 'lodash';
import { Tile } from '../types';
import boardUtils from '../utils/boardUtils';
import { soundManager } from '../services/audioService';

export const useGameLogic = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isEndgame, setIsEndgame] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [continueUsedInBlock, setContinueUsedInBlock] = useState(false);
  const [isBoardValid, setIsBoardValid] = useState(true);
  // Initial time for Level 1 (3 tiles + 1s = 4s)
  const [totalTime, setTotalTime] = useState(4000);


  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(0);

  // Helper to start timer based on current tiles
  const startLevelTimer = useCallback((numberOfTiles: number, bonusTimeMs: number = 0) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Time = tiles + 1 seconds (+ bonus if resuming)
    const timeLimit = ((numberOfTiles + 1) * 1000) + bonusTimeMs;
    setTotalTime(timeLimit);
    remainingTimeRef.current = timeLimit;
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      soundManager.playSound('incorrect');
      setIsGameRunning(false);
      setIsEndgame(true);
    }, timeLimit);
  }, []);

  const pauseGame = useCallback(() => {
    if (!isGameRunning || !startTimeRef.current) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);

    if (timerRef.current) clearTimeout(timerRef.current);
    setIsGameRunning(false);
  }, [isGameRunning]);

  const unpauseGame = useCallback(() => {
    if (remainingTimeRef.current <= 0) return;

    setIsGameRunning(true);
    // setTotalTime(remainingTimeRef.current); // Removed to preserve TimeBar scale
    startTimeRef.current = Date.now();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      soundManager.playSound('incorrect');
      setIsGameRunning(false);
      setIsEndgame(true);
    }, remainingTimeRef.current);
  }, []);

  const buildBoard = useCallback((currentLevel: number) => {
    const numberOfTiles = boardUtils.getNumberOfTiles(currentLevel);
    const newTiles: Tile[] = [];
    const alreadyPickedNumbers: number[] = [];
    const alreadyPickedColors: string[] = [];

    times(numberOfTiles, () => {
      const id = uuidv4();
      const { x, y } = boardUtils.getRandomTilePosition(newTiles);
      const number = boardUtils.getRandomNumber(currentLevel, alreadyPickedNumbers);
      const color = boardUtils.getRandomTileColor(alreadyPickedColors);

      alreadyPickedNumbers.push(number);
      alreadyPickedColors.push(color);

      newTiles.push({ id, x, y, number, color, isVisible: true });
    });
    setTiles(newTiles);
    setIsBoardValid(true);

    startLevelTimer(numberOfTiles);
  }, [startLevelTimer]);

  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setContinueUsedInBlock(false);
    setIsGameRunning(true);
    setIsEndgame(false);
    setIsBoardValid(true);

    buildBoard(1);
  }, [buildBoard]);

  const resumeGame = useCallback((bonusTimeMs: number = 5000) => {
    setIsEndgame(false);
    setIsGameRunning(true);
    setContinueUsedInBlock(true); // Mark continue as used for this block
    setTotalTime(bonusTimeMs); // Update time for TimeBar
    remainingTimeRef.current = bonusTimeMs;
    startTimeRef.current = Date.now();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      soundManager.playSound('incorrect');
      setIsGameRunning(false);
      setIsEndgame(true);
    }, bonusTimeMs);
  }, []);

  const goToNextLevel = useCallback(() => {
    setLevel(prev => {
      const next = prev + 1;
      if ((next - 1) % 20 === 0) {
        setContinueUsedInBlock(false);
      }

      buildBoard(next);
      return next;
    });
  }, [buildBoard]);

  const handleTilePress = useCallback((tileId: string) => {
    if (!isGameRunning) return;

    setTiles(currentTiles => {
      // Find the pressed tile
      const pressedTile = find(currentTiles, { id: tileId });
      if (!pressedTile || !pressedTile.isVisible) return currentTiles;

      const activeTiles = filter(currentTiles, 'isVisible');
      const sortedActiveTiles = orderBy(activeTiles, 'number');

      // Check if correct (lowest number)
      if (pressedTile.number === sortedActiveTiles[0].number) {
        soundManager.playSound('correct');
        setScore(s => s + 1);

        const updatedTiles = currentTiles.map(t =>
          t.id === tileId ? { ...t, isVisible: false } : t
        );

        // Check if level cleared
        if (updatedTiles.every(t => !t.isVisible)) {
          setTimeout(goToNextLevel, 0);
        }
        return updatedTiles;
      } else {
        // Wrong tile -> Immediate Game Over
        setIsBoardValid(false);
        soundManager.playSound('incorrect');
        setIsGameRunning(false);
        setIsEndgame(true);

        if (timerRef.current) clearTimeout(timerRef.current);

        return currentTiles;
      }
    });

  }, [isGameRunning, goToNextLevel]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  return {
    tiles,
    isGameRunning,
    isEndgame,
    score,
    level,
    totalTime,
    continueUsedInBlock,
    isBoardValid,
    startGame,
    resumeGame,
    handleTilePress,
    pauseGame,
    unpauseGame
  };
};
