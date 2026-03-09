'use client';

import { useState, useCallback } from 'react';
import { DrawnCard, SpreadType } from '@/types/tarot';
import TarotCardComponent from './TarotCard';
import { useTarotI18n } from '@/i18n/provider';

interface CardSpreadProps {
  spread: SpreadType;
  drawnCards: DrawnCard[];
  onAllRevealed: () => void;
}

export default function CardSpread({ spread, drawnCards, onAllRevealed }: CardSpreadProps) {
  const { messages } = useTarotI18n();
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const handleCardClick = useCallback((index: number) => {
    if (revealedCards.has(index)) return;
    
    setRevealedCards(prev => {
      const newSet = new Set([...prev, index]);
      if (newSet.size === drawnCards.length) {
        setTimeout(onAllRevealed, 800);
      }
      return newSet;
    });
  }, [revealedCards, drawnCards.length, onAllRevealed]);

  const getSpreadLayout = () => {
    switch (spread.id) {
      case 'single': return 'flex justify-center items-center';
      case 'three': return 'flex justify-center items-center gap-4 md:gap-8 flex-wrap';
      case 'heart': return 'grid grid-cols-3 gap-4 md:gap-6 place-items-center max-w-lg mx-auto';
      case 'celtic': return 'relative w-full max-w-2xl mx-auto min-h-[700px]';
      case 'relationship': return 'grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 place-items-center max-w-3xl mx-auto';
      default: return 'flex flex-wrap justify-center gap-4';
    }
  };

  const getCardPosition = (index: number): React.CSSProperties => {
    if (spread.id === 'celtic') {
      const card0Revealed = revealedCards.has(0);
      const positions: Record<number, React.CSSProperties> = {
        0: { top: '42%', left: '26%', transform: 'translate(-50%, -50%)', zIndex: card0Revealed ? 5 : 10 },
        1: { top: '42%', left: '26%', transform: 'translate(-50%, -50%) rotate(90deg)', zIndex: card0Revealed ? 10 : 5 },
        2: { top: '16%', left: '26%', transform: 'translate(-50%, -50%)', zIndex: 3 },
        3: { top: '68%', left: '26%', transform: 'translate(-50%, -50%)', zIndex: 3 },
        4: { top: '42%', left: '6%', transform: 'translate(-50%, -50%)', zIndex: 3 },
        5: { top: '42%', left: '46%', transform: 'translate(-50%, -50%)', zIndex: 3 },
        6: { top: '8%', left: '80%', transform: 'translate(-50%, 0)', zIndex: 20 },
        7: { top: '24%', left: '80%', transform: 'translate(-50%, 0)', zIndex: 21 },
        8: { top: '40%', left: '80%', transform: 'translate(-50%, 0)', zIndex: 22 },
        9: { top: '56%', left: '80%', transform: 'translate(-50%, 0)', zIndex: 23 }
      };
      return positions[index] || {};
    }
    return {};
  };

  const isCardRevealed = (index: number) => revealedCards.has(index);
  const allRevealed = revealedCards.size === drawnCards.length;

  if (spread.id === 'celtic') {
    return (
      <div className="w-full py-8">
        <div className={getSpreadLayout()}>
          {drawnCards.map((drawnCard, index) => (
            <div
              key={index}
              className="absolute cursor-pointer"
              style={getCardPosition(index)}
              onClick={() => handleCardClick(index)}
            >
              <TarotCardComponent
                card={drawnCard.card}
                isReversed={drawnCard.isReversed}
                positionName={drawnCard.positionName}
                isRevealed={isCardRevealed(index)}
                delay={index * 100}
              />
            </div>
          ))}
        </div>
        {!allRevealed && (
          <div className="text-center mt-8">
            <p className="text-purple-300/70 text-sm">{messages.cardSpread.clickToReveal}</p>
          </div>
        )}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: spread.cardCount }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                revealedCards.has(i) ? 'bg-amber-400' : 'bg-amber-400/20'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className={getSpreadLayout()}>
        {drawnCards.map((drawnCard, index) => (
          <div key={index} className="mb-8 cursor-pointer" onClick={() => handleCardClick(index)}>
            <TarotCardComponent
              card={drawnCard.card}
              isReversed={drawnCard.isReversed}
              positionName={drawnCard.positionName}
              isRevealed={isCardRevealed(index)}
              delay={index * 100}
            />
          </div>
        ))}
      </div>
      {!allRevealed && (
        <div className="text-center mt-4">
          <p className="text-purple-300/70 text-sm">{messages.cardSpread.clickToReveal}</p>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: spread.cardCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              revealedCards.has(i) ? 'bg-amber-400' : 'bg-amber-400/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
