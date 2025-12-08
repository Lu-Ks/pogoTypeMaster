import { PokemonType } from './types';

export const TYPE_COLORS: Record<PokemonType, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

export const TYPE_IMAGES: Record<PokemonType, string> = {
  normal: new URL('./assets/ico_0_normal.webp', import.meta.url).href,
  fighting: new URL('./assets/ico_1_fighting.webp', import.meta.url).href,
  flying: new URL('./assets/ico_2_flying.webp', import.meta.url).href,
  poison: new URL('./assets/ico_3_poison.webp', import.meta.url).href,
  ground: new URL('./assets/ico_4_ground.webp', import.meta.url).href,
  rock: new URL('./assets/ico_5_rock.webp', import.meta.url).href,
  bug: new URL('./assets/ico_6_bug.webp', import.meta.url).href,
  ghost: new URL('./assets/ico_7_ghost.webp', import.meta.url).href,
  steel: new URL('./assets/ico_8_steel.webp', import.meta.url).href,
  fire: new URL('./assets/ico_9_fire.webp', import.meta.url).href,
  water: new URL('./assets/ico_10_water.webp', import.meta.url).href,
  grass: new URL('./assets/ico_11_grass.webp', import.meta.url).href,
  electric: new URL('./assets/ico_12_electric.webp', import.meta.url).href,
  psychic: new URL('./assets/ico_13_psychic.webp', import.meta.url).href,
  ice: new URL('./assets/ico_14_ice.webp', import.meta.url).href,
  dragon: new URL('./assets/ico_15_dragon.webp', import.meta.url).href,
  dark: new URL('./assets/ico_16_dark.webp', import.meta.url).href,
  fairy: new URL('./assets/ico_17_fairy.webp', import.meta.url).href,
};

// Pokémon GO Type effectiveness chart (attacking type -> defending type)
// In Pokémon GO, there are no immunities - all attacks deal at least some damage
export const TYPE_CHART: Record<PokemonType, {
  superEffective: PokemonType[],
  notVeryEffective: PokemonType[]
}> = {
  normal: {
    superEffective: [],
    notVeryEffective: ['rock', 'steel']
  },
  fire: {
    superEffective: ['grass', 'ice', 'bug', 'steel'],
    notVeryEffective: ['fire', 'water', 'rock', 'dragon']
  },
  water: {
    superEffective: ['fire', 'ground', 'rock'],
    notVeryEffective: ['water', 'grass', 'dragon']
  },
  electric: {
    superEffective: ['water', 'flying'],
    notVeryEffective: ['electric', 'grass', 'dragon', 'ground']
  },
  grass: {
    superEffective: ['water', 'ground', 'rock'],
    notVeryEffective: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel']
  },
  ice: {
    superEffective: ['grass', 'ground', 'flying', 'dragon'],
    notVeryEffective: ['fire', 'water', 'ice', 'steel']
  },
  fighting: {
    superEffective: ['normal', 'ice', 'rock', 'dark', 'steel'],
    notVeryEffective: ['poison', 'flying', 'psychic', 'bug', 'fairy', 'ghost']
  },
  poison: {
    superEffective: ['grass', 'fairy'],
    notVeryEffective: ['poison', 'ground', 'rock', 'ghost', 'steel']
  },
  ground: {
    superEffective: ['fire', 'electric', 'poison', 'rock', 'steel'],
    notVeryEffective: ['grass', 'bug', 'flying']
  },
  flying: {
    superEffective: ['grass', 'fighting', 'bug'],
    notVeryEffective: ['electric', 'rock', 'steel']
  },
  psychic: {
    superEffective: ['fighting', 'poison'],
    notVeryEffective: ['psychic', 'steel', 'dark']
  },
  bug: {
    superEffective: ['grass', 'psychic', 'dark'],
    notVeryEffective: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy']
  },
  rock: {
    superEffective: ['fire', 'ice', 'flying', 'bug'],
    notVeryEffective: ['fighting', 'ground', 'steel']
  },
  ghost: {
    superEffective: ['psychic', 'ghost'],
    notVeryEffective: ['dark', 'normal']
  },
  dragon: {
    superEffective: ['dragon'],
    notVeryEffective: ['steel', 'fairy']
  },
  dark: {
    superEffective: ['psychic', 'ghost'],
    notVeryEffective: ['fighting', 'dark', 'fairy']
  },
  steel: {
    superEffective: ['ice', 'rock', 'fairy'],
    notVeryEffective: ['fire', 'water', 'electric', 'steel']
  },
  fairy: {
    superEffective: ['fighting', 'dragon', 'dark'],
    notVeryEffective: ['fire', 'poison', 'steel']
  }
};

export const ALL_TYPES: PokemonType[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];
