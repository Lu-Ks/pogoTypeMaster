export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface TypeEffectiveness {
  superEffective: PokemonType[];
  notVeryEffective: PokemonType[];
}

export type EffectivenessAnswer = 'super-effective' | 'not-very-effective' | 'double-resist' | 'double-weakness' | 'normal';

export interface Question {
  attackingType: PokemonType;
  defendingType: PokemonType;
  defendingType2?: PokemonType; // For dual-type Pokémon
  correctAnswer: EffectivenessAnswer;
}

export interface GameStats {
  score: number;
  streak: number;
  bestStreak: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface HistoryEntry {
  id: number;
  attackingType: PokemonType;
  defendingType: PokemonType;
  defendingType2?: PokemonType;
  userAnswer: EffectivenessAnswer;
  correctAnswer: EffectivenessAnswer;
  isCorrect: boolean;
  points: number;
  timestamp: number;
}
