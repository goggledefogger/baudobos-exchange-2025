import { ALL_PEOPLE, getSpouse, MatchMap, Person } from '../types';

/**
 * Simple seeded random number generator (Linear Congruential Generator).
 * Ensures that for a given seed, the sequence of numbers is always the same.
 */
class PRNG {
  seed: number;
  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

/**
 * Fisher-Yates shuffle using our seeded PRNG
 */
const shuffle = <T>(array: T[], rng: PRNG): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Validates a mapping.
 * Rules:
 * 1. Giver != Receiver (Self-match)
 * 2. Receiver != Spouse of Giver
 */
const isValidMatch = (givers: Person[], receivers: Person[]): boolean => {
  for (let i = 0; i < givers.length; i++) {
    const giver = givers[i];
    const receiver = receivers[i];
    
    // Rule 1: No self-giving
    if (giver === receiver) return false;

    // Rule 2: No spouse-giving
    const spouse = getSpouse(giver);
    if (receiver === spouse) return false;
  }
  return true;
};

/**
 * Generates a valid Secret Santa mapping.
 * Uses a randomized retry approach.
 * @param seed - Optional seed. If provided, result is deterministic. If null, uses default fixed seed.
 */
export const generateMatches = (seed?: number): MatchMap => {
  // Default seed ensures everyone gets the same matches when they visit the page.
  // Updated to 90210 for the official 2025 "Live" randomization.
  const effectiveSeed = seed !== undefined ? seed : 90210; 
  const rng = new PRNG(effectiveSeed);
  
  let receivers = [...ALL_PEOPLE];
  let valid = false;
  let attempts = 0;
  
  // Safety break after 5000 attempts
  while (!valid && attempts < 5000) {
    receivers = shuffle(receivers, rng);
    if (isValidMatch(ALL_PEOPLE, receivers)) {
      valid = true;
    }
    attempts++;
  }

  if (!valid) {
    console.error("Failed to generate valid matches.");
    // Fallback: This is statistically impossible with N=6 unless constraints are impossible.
  }

  const matches: Partial<MatchMap> = {};
  ALL_PEOPLE.forEach((giver, index) => {
    matches[giver] = receivers[index];
  });

  return matches as MatchMap;
};