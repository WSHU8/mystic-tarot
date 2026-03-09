'use client';

import { useState, useCallback, useRef, useSyncExternalStore, useEffect } from 'react';
import { TarotCard } from '@/types/tarot';
import { allTarotCards } from '@/data/tarotCards';
import { Star } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';

interface FanDeckProps {
  onCardSelect: (card: TarotCard) => void;
  selectedCount: number;
  totalCards: number;
  disabled?: boolean;
}

type ShuffleType = 'riffle' | 'overhand' | 'hindu';

const shuffleConfigs: Record<ShuffleType, { duration: number; maxDelay: number }> = {
  riffle: { duration: 3000, maxDelay: 1.0 },
  overhand: { duration: 2800, maxDelay: 1.6 },
  hindu: { duration: 3200, maxDelay: 1.2 }
};

function CardBack({ size = 'normal', noAnimation = false }: { size?: 'normal' | 'medium' | 'small'; noAnimation?: boolean }) {
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const width = isSmall ? '70px' : isMedium ? '90px' : '120px';
  const height = isSmall ? '105px' : isMedium ? '135px' : '180px';
  const outerRingClass = noAnimation ? '' : 'animate-spin-slow';
  const innerRingClass = noAnimation ? '' : 'animate-spin-reverse';
  
  return (
    <div 
      className="rounded-xl flex-shrink-0 overflow-hidden relative"
      style={{ 
        width, 
        height, 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className={`absolute border border-amber-400/20 rounded-full ${outerRingClass} ${isSmall ? '-inset-2' : isMedium ? '-inset-3' : '-inset-4'}`} />
          <div className={`absolute border border-purple-400/10 rounded-full ${innerRingClass} ${isSmall ? '-inset-3' : isMedium ? '-inset-4' : '-inset-6'}`} />
          <div className={`rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-amber-400/30 ${isSmall ? 'w-8 h-8' : isMedium ? 'w-10 h-10' : 'w-12 h-12'}`}>
            <Star className={`${isSmall ? 'w-4 h-4' : isMedium ? 'w-5 h-5' : 'w-6 h-6'} text-amber-400/60`} />
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 rounded-full bg-amber-400/40 ${isSmall ? 'w-1 h-1' : isMedium ? 'w-1 h-1' : 'w-1.5 h-1.5'}`}
              style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(${isSmall ? '-16px' : isMedium ? '-20px' : '-24px'})` }}
            />
          ))}
        </div>
      </div>

      <div className={`absolute border border-amber-400/20 rounded-lg pointer-events-none ${isSmall ? 'inset-1' : isMedium ? 'inset-1' : 'inset-1'}`} />
      <div className={`absolute border-amber-400/40 ${isSmall ? 'top-1 left-1 w-1.5 h-1.5 border-t border-l' : isMedium ? 'top-1 left-1 w-2 h-2 border-t border-l' : 'top-1.5 left-1.5 w-2 h-2 border-t border-l'}`} />
      <div className={`absolute border-amber-400/40 ${isSmall ? 'top-1 right-1 w-1.5 h-1.5 border-t border-r' : isMedium ? 'top-1 right-1 w-2 h-2 border-t border-r' : 'top-1.5 right-1.5 w-2 h-2 border-t border-r'}`} />
      <div className={`absolute border-amber-400/40 ${isSmall ? 'bottom-1 left-1 w-1.5 h-1.5 border-b border-l' : isMedium ? 'bottom-1 left-1 w-2 h-2 border-b border-l' : 'bottom-1.5 left-1.5 w-2 h-2 border-b border-l'}`} />
      <div className={`absolute border-amber-400/40 ${isSmall ? 'bottom-1 right-1 w-1.5 h-1.5 border-b border-r' : isMedium ? 'bottom-1 right-1 w-2 h-2 border-b border-r' : 'bottom-1.5 right-1.5 w-2 h-2 border-b border-r'}`} />

      <style jsx>{`
        .animate-spin-slow { animation: spin 20s linear infinite; will-change: transform; }
        .animate-spin-reverse { animation: spin 30s linear infinite reverse; will-change: transform; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

let cachedCards: TarotCard[] = [];
const cardsListeners = new Set<() => void>();

function getCardsSnapshot(): TarotCard[] { return cachedCards; }
function getCardsServerSnapshot(): TarotCard[] { return []; }
function subscribeToCards(callback: () => void) { cardsListeners.add(callback); return () => cardsListeners.delete(callback); }
function initializeCards(): void {
  if (cachedCards.length === 0 && typeof window !== 'undefined') {
    cachedCards = [...allTarotCards].sort(() => Math.random() - 0.5);
    cardsListeners.forEach(listener => listener());
  }
}

export default function FanDeck({ onCardSelect, selectedCount, totalCards, disabled = false }: FanDeckProps) {
  const { messages } = useTarotI18n();
  const cards = useSyncExternalStore(subscribeToCards, getCardsSnapshot, getCardsServerSnapshot);
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [shuffleType, setShuffleType] = useState<ShuffleType | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const timerRef = useRef<{ shuffle: number | null; show: number | null }>({ shuffle: null, show: null });

  useEffect(() => { initializeCards(); }, []);

  const clearTimers = useCallback(() => {
    if (timerRef.current.shuffle) clearTimeout(timerRef.current.shuffle);
    if (timerRef.current.show) clearTimeout(timerRef.current.show);
    timerRef.current = { shuffle: null, show: null };
  }, []);

  const startShuffle = useCallback((type: ShuffleType) => {
    clearTimers();
    const config = shuffleConfigs[type];
    const totalDuration = config.duration + config.maxDelay * 1000;
    setShuffleType(type);
    setIsShuffling(true);
    setShowCards(false);
    timerRef.current.shuffle = window.setTimeout(() => setIsShuffling(false), totalDuration);
    timerRef.current.show = window.setTimeout(() => setShowCards(true), totalDuration + 300);
  }, [clearTimers]);

  useEffect(() => { return () => clearTimers(); }, [clearTimers]);

  const handleCardClick = useCallback((card: TarotCard, index: number) => {
    if (disabled || selectedCards.has(index) || selectedCount >= totalCards) return;
    setSelectedCards(prev => new Set([...prev, index]));
    onCardSelect(card);
  }, [disabled, selectedCards, selectedCount, totalCards, onCardSelect]);

  // 移动端网格选牌
  const mobileDeck = (
    <div className="md:hidden relative w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto py-4">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center h-full text-amber-200/60 animate-pulse">{messages.fanDeck.loading}</div>
        ) : (
          <div className="grid grid-cols-4 gap-2 px-3 justify-items-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="cursor-pointer"
                style={{ opacity: selectedCards.has(index) ? 0.3 : 1, transition: 'opacity 0.3s ease' }}
                onClick={() => handleCardClick(card, index)}
              >
                <CardBack size="small" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 py-3 text-center bg-slate-900/80 backdrop-blur-sm border-t border-purple-400/20">
        <div className="text-amber-200/80 text-sm mb-2">{messages.fanDeck.selectPrompt.replace('{count}', String(totalCards))}</div>
        <div className="flex items-center gap-2 justify-center">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < selectedCount ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-amber-400/20 border border-amber-400/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );

  // 桌面端扇形参数 - 响应式半径
  const totalAngle = 100;
  const cardCount = cards.length;
  const anglePerCard = cardCount > 1 ? totalAngle / (cardCount - 1) : 0;
  const getCardPosition = (index: number, radius: number) => {
    const angle = 140 - (index % cardCount) * anglePerCard;
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: -Math.sin(radian) * radius, rotation: 90 - angle };
  };

  // 桌面端洗牌选择
  if (!shuffleType && !isShuffling) {
    return (
      <>
        {mobileDeck}
        <div className="hidden md:flex relative w-full h-[600px] flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' }} />
          </div>
          <div className="text-center mb-8">
            <h3 className="text-amber-200 text-2xl font-bold mb-2">{messages.fanDeck.chooseShuffleTitle}</h3>
            <p className="text-amber-200/60 text-sm">{messages.fanDeck.chooseShuffleSubtitle}</p>
          </div>
          <div className="flex gap-4">
            {(Object.keys(shuffleConfigs) as ShuffleType[]).map((type) => {
              const copy = messages.fanDeck.shuffleTypes[type];
              return (
                <button key={type} onClick={() => startShuffle(type)} className="group relative px-6 py-5 rounded-xl border-2 border-amber-400/30 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 hover:border-amber-400/60 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-center">
                    <div className="text-amber-300 text-lg font-bold mb-2">{copy.name}</div>
                    <div className="text-amber-200/60 text-sm">{copy.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-10 relative" style={{ width: 80, height: 120 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute" style={{ transform: `translateY(${-i * 2}px)`, zIndex: i }}>
                <CardBack />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // 桌面端洗牌动画
  if (isShuffling && shuffleType) {
    const duration = shuffleConfigs[shuffleType].duration;
    return (
      <>
        {mobileDeck}
        <div className="hidden md:flex relative w-full h-[600px] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)' }} />
          </div>
          <div className="relative" style={{ width: 300, height: 250 }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const delay = shuffleType === 'riffle' ? (19 - i) * 0.05 : shuffleType === 'overhand' ? i * 0.08 : (19 - i) * 0.06;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 gpu-accelerated"
                  style={{
                    transform: 'translate(-50%, -50%) translateZ(0)',
                    animation: `shuffle${shuffleType.charAt(0).toUpperCase() + shuffleType.slice(1)} ${duration}ms ease-in-out ${delay}s forwards`,
                    '--is-left': i < 10 ? 1 : -1,
                    '--stack-pos': i,
                    backfaceVisibility: 'hidden',
                  } as React.CSSProperties}
                >
                  <CardBack />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-200/80 text-lg font-medium animate-pulse">
            ✨ {messages.fanDeck.shuffling.replace('{type}', messages.fanDeck.shuffleTypes[shuffleType].name)}
          </div>
          <style jsx>{`
            .gpu-accelerated { transform-style: preserve-3d; }
            @keyframes shuffleRiffle {
              0% { transform: translate(-50%, -50%) translateZ(0) translateX(0) translateY(0) rotate(0deg); opacity: 0; }
              5% { opacity: 1; }
              15% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--is-left) * 80px)) rotate(calc(var(--is-left) * -10deg)); }
              25% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--is-left) * 70px)) translateY(-100px) rotate(calc(var(--is-left) * -8deg)); }
              40% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--is-left) * 50px)) translateY(-50px) rotate(calc(var(--is-left) * -5deg)); }
              55% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--is-left) * 25px)) translateY(-15px) rotate(calc(var(--is-left) * -3deg)); }
              70% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--is-left) * 10px)) rotate(calc(var(--is-left) * -1deg)); }
              100% { transform: translate(-50%, -50%) translateZ(0) translateX(0) rotate(0deg); opacity: 1; }
            }
            @keyframes shuffleOverhand {
              0% { transform: translate(-50%, -50%) translateZ(0) translateX(0); opacity: 0; }
              5% { opacity: 1; }
              15% { transform: translate(-50%, -50%) translateZ(0) translateX(-60px) translateY(-20px); }
              30% { transform: translate(-50%, -50%) translateZ(0) translateX(60px) translateY(-60px) rotate(5deg); }
              45% { transform: translate(-50%, -50%) translateZ(0) translateX(50px) translateY(-20px) rotate(2deg); }
              55% { transform: translate(-50%, -50%) translateZ(0) translateX(50px) translateY(-10px); }
              70% { transform: translate(-50%, -50%) translateZ(0) translateX(-50px) translateY(-50px) rotate(-3deg); }
              100% { transform: translate(-50%, -50%) translateZ(0) translateX(0) rotate(0deg); opacity: 1; }
            }
            @keyframes shuffleHindu {
              0% { transform: translate(-50%, -50%) translateZ(0) translateX(0); opacity: 0; }
              5% { opacity: 1; }
              10% { transform: translate(-50%, -50%) translateZ(0) rotate(15deg); }
              20% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--stack-pos) * 3px - 30px)) translateY(calc(var(--stack-pos) * 1px)) rotate(calc(var(--stack-pos) * 2deg + 10deg)); }
              35% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--stack-pos) * -2px + 20px)) rotate(calc(var(--stack-pos) * -1deg - 5deg)); }
              50% { transform: translate(-50%, -50%) translateZ(0) rotate(-12deg); }
              65% { transform: translate(-50%, -50%) translateZ(0) translateX(calc(var(--stack-pos) * 2px - 20px)) rotate(calc(var(--stack-pos) * 1.5deg + 8deg)); }
              100% { transform: translate(-50%, -50%) translateZ(0) translateX(0) rotate(0deg); opacity: 1; }
            }
          `}</style>
        </div>
      </>
    );
  }

  // 桌面端扇形选牌
  return (
    <>
      {mobileDeck}
      <div className="hidden md:block relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[2000px] rounded-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
        </div>
        {/* 笔记本用 medium 卡片和较小半径 */}
        <div className="absolute left-1/2 -translate-x-1/2 fan-deck-container xl:hidden">
          {cards.slice(0, cardCount).map((card, index) => {
            const isSelected = selectedCards.has(index);
            const isHovered = hoveredCard === index;
            const pos = getCardPosition(index, 650);
            const animDelay = Math.min(index * 0.008, 0.6);
            return (
              <div
                key={card.id}
                className="absolute cursor-pointer left-0 top-0 gpu-accelerated"
                style={{
                  transform: showCards ? `translate3d(${pos.x}px, ${pos.y + (isSelected ? -80 : 0)}px, 0) translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${isSelected ? 0.8 : isHovered ? 1.15 : 1})` : `translate3d(0px, 100px, 0) translate(-50%, -50%) scale(0.5)`,
                  opacity: showCards ? (isSelected ? 0 : 1) : 0,
                  zIndex: isHovered ? 1000 : isSelected ? 0 : cardCount - index,
                  transition: showCards ? `transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${animDelay}s, opacity 0.25s ease ${animDelay}s` : 'none',
                  willChange: showCards ? 'transform, opacity' : 'auto',
                  backfaceVisibility: 'hidden',
                }}
                onClick={() => handleCardClick(card, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="rounded-xl" 
                  style={{ 
                    boxShadow: isHovered ? '0 0 30px rgba(255, 215, 0, 0.6), 0 15px 40px rgba(0, 0, 0, 0.6)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'box-shadow 0.2s ease',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <CardBack size="medium" noAnimation />
                </div>
              </div>
            );
          })}
        </div>
        {/* 大屏幕用 normal 卡片和较大半径 */}
        <div className="absolute left-1/2 -translate-x-1/2 fan-deck-container-xl hidden xl:block">
          {cards.slice(0, cardCount).map((card, index) => {
            const isSelected = selectedCards.has(index);
            const isHovered = hoveredCard === index;
            const pos = getCardPosition(index, 900);
            const animDelay = Math.min(index * 0.008, 0.6);
            return (
              <div
                key={card.id}
                className="absolute cursor-pointer left-0 top-0 gpu-accelerated"
                style={{
                  transform: showCards ? `translate3d(${pos.x}px, ${pos.y + (isSelected ? -100 : 0)}px, 0) translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${isSelected ? 0.8 : isHovered ? 1.15 : 1})` : `translate3d(0px, 100px, 0) translate(-50%, -50%) scale(0.5)`,
                  opacity: showCards ? (isSelected ? 0 : 1) : 0,
                  zIndex: isHovered ? 1000 : isSelected ? 0 : cardCount - index,
                  transition: showCards ? `transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${animDelay}s, opacity 0.25s ease ${animDelay}s` : 'none',
                  willChange: showCards ? 'transform, opacity' : 'auto',
                  backfaceVisibility: 'hidden',
                }}
                onClick={() => handleCardClick(card, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="rounded-xl" 
                  style={{ 
                    boxShadow: isHovered ? '0 0 30px rgba(255, 215, 0, 0.6), 0 15px 40px rgba(0, 0, 0, 0.6)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'box-shadow 0.2s ease',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <CardBack noAnimation />
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="text-amber-200/80 text-lg font-medium mb-2">{messages.fanDeck.selectPrompt.replace('{count}', String(totalCards))}</div>
          <div className="flex items-center gap-2 justify-center">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < selectedCount ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-amber-400/20 border border-amber-400/40'}`} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .gpu-accelerated { transform-style: preserve-3d; }
        .fan-deck-container { bottom: -180px; }
        .fan-deck-container-xl { bottom: -280px; }
      `}</style>
    </>
  );
}
