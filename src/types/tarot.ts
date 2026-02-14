export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  type: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  icon: string;
  description: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: number;
  positionName: string;
}

export interface SpreadType {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
}

export type GamePhase = 'intro' | 'setQuestion' | 'selectSpread' | 'selectCards' | 'revealing' | 'result';
