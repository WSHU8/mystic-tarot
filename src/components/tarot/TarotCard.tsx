'use client';

import { useState, useEffect, useMemo } from 'react';
import { TarotCard } from '@/types/tarot';
import { iconMap, Star, ArrowDown } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';
import { getArcanaLabel, getLocalizedCard } from '@/lib/tarotLocalization';

interface TarotCardComponentProps {
  card: TarotCard;
  isReversed: boolean;
  positionName: string;
  isRevealed: boolean;
  onReveal?: () => void;
  delay?: number;
}

// 动态图标渲染组件
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Star;
  return <IconComponent className={className} />;
}

export default function TarotCardComponent({
  card,
  isReversed,
  positionName,
  isRevealed,
  onReveal,
  delay = 0
}: TarotCardComponentProps) {
  const { locale, messages } = useTarotI18n();
  const [showCard, setShowCard] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const localizedCard = useMemo(() => getLocalizedCard(card, locale), [card, locale]);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsFlipping(true);
        setTimeout(() => setShowCard(true), 300);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, delay]);

  const handleClick = () => {
    if (!isRevealed && onReveal) {
      onReveal();
    }
  };

  // 获取卡片背景色
  const getCardBackground = useMemo(() => {
    if (card.type === 'major') {
      return 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #0f0f23 100%)';
    }
    
    const suitColors: Record<string, string> = {
      wands: 'linear-gradient(135deg, #4a1a1a 0%, #2d1b1b 50%, #1a0f0f 100%)',
      cups: 'linear-gradient(135deg, #1a2d4a 0%, #1b2d3d 50%, #0f1a2d 100%)',
      swords: 'linear-gradient(135deg, #1a3a4a 0%, #1b2d3d 50%, #0f1f2d 100%)',
      pentacles: 'linear-gradient(135deg, #2d3a1a 0%, #1f2d1b 50%, #0f1a0f 100%)'
    };
    
    return suitColors[card.suit || 'wands'];
  }, [card.type, card.suit]);

  // 获取卡片边框颜色
  const getCardBorderColor = useMemo(() => {
    if (card.type === 'major') {
      return 'linear-gradient(135deg, #ffd700, #b8860b, #ffd700)';
    }
    
    const suitColors: Record<string, string> = {
      wands: 'linear-gradient(135deg, #ff6b35, #d32f2f)',
      cups: 'linear-gradient(135deg, #4fc3f7, #0288d1)',
      swords: 'linear-gradient(135deg, #90caf9, #1565c0)',
      pentacles: 'linear-gradient(135deg, #81c784, #388e3c)'
    };
    
    return suitColors[card.suit || 'wands'];
  }, [card.type, card.suit]);

  return (
    <div className="relative perspective-1000">
      <div
        className={`relative transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          showCard ? 'rotate-y-180' : ''
        } ${isFlipping ? 'animate-flip' : ''}`}
        onClick={handleClick}
        style={{
          transformStyle: 'preserve-3d',
          transform: showCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div
          className="w-32 h-48 md:w-40 md:h-56 rounded-xl overflow-hidden backface-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-8 border-2 border-amber-400/20 rounded-full animate-spin-slow" />
              <div className="absolute -inset-12 border border-purple-400/10 rounded-full animate-spin-reverse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border-2 border-amber-400/30">
                <Star className="w-8 h-8 text-amber-400/60" />
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-amber-400/40"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-32px)` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute inset-2 border border-amber-400/20 rounded-lg pointer-events-none" />
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/40" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/40" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/40" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/40" />

          {!isRevealed && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-400/20 rounded text-[10px] text-amber-200/80 whitespace-nowrap">
              {messages.card.clickToReveal}
            </div>
          )}
        </div>

        <div
          className="absolute inset-0 w-32 h-48 md:w-40 md:h-56 rounded-xl overflow-hidden backface-hidden"
          style={{
            background: getCardBorderColor,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '2px'
          }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden" style={{ background: getCardBackground }}>
          {isReversed && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500/30 flex items-center justify-center border border-red-400/50">
              <ArrowDown className="w-3 h-3 text-red-300" />
            </div>
          )}

          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-medium"
               style={{ 
                 background: card.type === 'major' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(34, 197, 94, 0.3)',
                 color: card.type === 'major' ? '#e9d5ff' : '#bbf7d0'
               }}>
            {getArcanaLabel(card, locale)}
          </div>

          <div className={`flex flex-col items-center justify-center h-full p-3 ${isReversed ? 'rotate-180' : ''}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2"
                 style={{
                   background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
                   border: '2px solid rgba(255,215,0,0.3)'
                 }}>
              <DynamicIcon name={card.icon} className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            </div>
            
            <div className="text-center">
              <div className="text-sm md:text-base font-bold text-amber-200 mb-1">{localizedCard.name}</div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1 justify-center">
              {localizedCard.keywords.slice(0, 2).map((keyword, i) => (
                <span key={i} className="px-1.5 py-0.5 text-[8px] md:text-[10px] rounded bg-amber-400/10 text-amber-200/80">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute inset-2 border border-amber-400/20 rounded-lg pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
        <span className="px-3 py-1 bg-purple-900/60 backdrop-blur-sm rounded-full text-xs text-purple-200 border border-purple-400/30">
          {positionName}
        </span>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 30s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
