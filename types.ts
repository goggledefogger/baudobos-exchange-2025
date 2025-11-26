export type Person = 'Danny' | 'Heather' | 'Jess' | 'Beau' | 'Joel' | 'Melissa';

export interface Couple {
  p1: Person;
  p2: Person;
}

export const COUPLES: Couple[] = [
  { p1: 'Danny', p2: 'Heather' },
  { p1: 'Jess', p2: 'Beau' },
  { p1: 'Joel', p2: 'Melissa' },
];

export const ALL_PEOPLE: Person[] = [
  'Danny', 'Heather', 'Jess', 'Beau', 'Joel', 'Melissa'
];

// Helper to find spouse
export const getSpouse = (person: Person): Person | undefined => {
  const couple = COUPLES.find(c => c.p1 === person || c.p2 === person);
  if (!couple) return undefined;
  return couple.p1 === person ? couple.p2 : couple.p1;
};

export type MatchMap = Record<Person, Person>;
