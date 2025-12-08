import { PokemonType, Question } from './types';
import { TYPE_CHART, ALL_TYPES } from './gameData';

export const getRandomType = (): PokemonType => {
  return ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
};

export const generateQuestion = (dualTypeMode: boolean = false): Question => {
  const attackingType = getRandomType();
  const defendingType = getRandomType();
  const defendingType2 = dualTypeMode ? getRandomType() : undefined;

  // Ensure dual types are different
  if (dualTypeMode && defendingType2 === defendingType) {
    return generateQuestion(dualTypeMode);
  }

  const effectiveness = TYPE_CHART[attackingType];
  let correctAnswer: Question['correctAnswer'];

  if (!dualTypeMode || !defendingType2) {
    // Single type logic
    if (effectiveness.superEffective.includes(defendingType)) {
      correctAnswer = 'super-effective';
    } else if (effectiveness.notVeryEffective.includes(defendingType)) {
      correctAnswer = 'not-very-effective';
    } else {
      correctAnswer = 'normal';
    }
  } else {
    // Dual type logic
    const resist1 = effectiveness.notVeryEffective.includes(defendingType);
    const resist2 = effectiveness.notVeryEffective.includes(defendingType2);
    const weak1 = effectiveness.superEffective.includes(defendingType);
    const weak2 = effectiveness.superEffective.includes(defendingType2);

    // Double weakness (both types are weak)
    if (weak1 && weak2) {
      correctAnswer = 'double-weakness';
    }
    // Double resistance (both types resist)
    else if (resist1 && resist2) {
      correctAnswer = 'double-resist';
    }
    // One weak, one resist = cancel out to normal
    else if ((weak1 && resist2) || (weak2 && resist1)) {
      correctAnswer = 'normal';
    }
    // At least one weakness (and no resistance)
    else if (weak1 || weak2) {
      correctAnswer = 'super-effective';
    }
    // At least one resistance (but not both)
    else if (resist1 || resist2) {
      correctAnswer = 'not-very-effective';
    }
    // Neither type has special interaction
    else {
      correctAnswer = 'normal';
    }
  }

  return {
    attackingType,
    defendingType,
    defendingType2,
    correctAnswer
  };
};

export const calculateScore = (isCorrect: boolean, streak: number): number => {
  if (!isCorrect) return 0;

  const baseScore = 100;
  const streakBonus = Math.min(streak * 10, 200); // Max 200 bonus
  return baseScore + streakBonus;
};

export const getEffectivenessMultiplier = (answer: Question['correctAnswer']): string => {
  switch (answer) {
    case 'double-weakness': return '2.56×';
    case 'super-effective': return '1.6×';
    case 'not-very-effective': return '0.625×';
    case 'double-resist': return '0.39×';
    case 'normal': return '1×';
  }
};
