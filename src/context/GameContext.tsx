'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats } from '../types/vocab';
import { soundManager } from '../utils/audio';

interface GameContextType {
  stats: UserStats;
  toggleBookmark: (wordId: string) => void;
  isBookmarked: (wordId: string) => boolean;
  addPoints: (points: number) => void;
  incrementLearnedWords: (count?: number) => void;
  toggleSound: () => void;
}

const defaultStats: UserStats = {
  streak: 7, // Initial default streak for fun engagement
  totalWordsLearned: 32,
  totalPoints: 1250,
  soundEnabled: true,
  bookmarkedWordIds: ['daily-1', 'mammals-1', 'food-1'],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem('burger_boy_vocab_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        setStats((prev) => ({ ...prev, ...parsed }));
        soundManager.enabled = parsed.soundEnabled ?? true;
      }
    } catch {
      // ignore
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('burger_boy_vocab_stats', JSON.stringify(newStats));
      } catch {
        // ignore
      }
    }
  };

  const toggleBookmark = (wordId: string) => {
    soundManager.playPop();
    const current = [...stats.bookmarkedWordIds];
    const exists = current.includes(wordId);
    const updated = exists ? current.filter((id) => id !== wordId) : [...current, wordId];
    saveStats({ ...stats, bookmarkedWordIds: updated });
  };

  const isBookmarked = (wordId: string) => {
    return stats.bookmarkedWordIds.includes(wordId);
  };

  const addPoints = (points: number) => {
    saveStats({ ...stats, totalPoints: stats.totalPoints + points });
  };

  const incrementLearnedWords = (count: number = 1) => {
    saveStats({ ...stats, totalWordsLearned: stats.totalWordsLearned + count });
  };

  const toggleSound = () => {
    const nextVal = !stats.soundEnabled;
    soundManager.enabled = nextVal;
    if (nextVal) {
      soundManager.playPop();
    }
    saveStats({ ...stats, soundEnabled: nextVal });
  };

  return (
    <GameContext.Provider
      value={{
        stats: isClient ? stats : defaultStats,
        toggleBookmark,
        isBookmarked,
        addPoints,
        incrementLearnedWords,
        toggleSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
