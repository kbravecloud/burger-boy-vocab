export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type CategoryId = 'daily' | 'work' | 'travel' | 'mammals' | 'food' | 'tech';

export interface VocabWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';
  meaning: string;
  example: string;
  difficulty: Difficulty;
  category: CategoryId;
  options: string[]; // 4 options for quiz including the correct meaning
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  badgeBg: string;
}

export interface UserStats {
  streak: number;
  totalWordsLearned: number;
  totalPoints: number;
  soundEnabled: boolean;
  bookmarkedWordIds: string[];
}
