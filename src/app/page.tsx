'use client';

import { useState, useCallback, useRef } from 'react';
import { GamePhase, SpreadType, DrawnCard, TarotCard } from '@/types/tarot';
import { spreadTypes } from '@/data/tarotCards';
import IntroScreen from '@/components/tarot/IntroScreen';
import SetQuestion from '@/components/tarot/SetQuestion';
import SpreadSelector from '@/components/tarot/SpreadSelector';
import FanDeck from '@/components/tarot/FanDeck';
import CardSpread from '@/components/tarot/CardSpread';
import ReadingResult from '@/components/tarot/ReadingResult';
import { Sparkles } from '@/lib/icons';

export default function Home() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [question, setQuestion] = useState<string>('');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const selectedCardsRef = useRef<TarotCard[]>([]);

  const handleStart = useCallback(() => {
    setGamePhase('setQuestion');
  }, []);

  const handleSetQuestion = useCallback((q: string) => {
    setQuestion(q);
    setGamePhase('selectSpread');
  }, []);

  const handleSelectSpread = useCallback((spread: SpreadType) => {
    setSelectedSpread(spread);
    setDrawnCards([]);
    setSelectedCards([]);
    selectedCardsRef.current = [];
    setTimeout(() => setGamePhase('selectCards'), 300);
  }, []);

  const handleCardSelect = useCallback((card: TarotCard) => {
    if (!selectedSpread) return;
    
    selectedCardsRef.current = [...selectedCardsRef.current, card];
    setSelectedCards([...selectedCardsRef.current]);
    
    if (selectedCardsRef.current.length === selectedSpread.cardCount) {
      const cardsToProcess = [...selectedCardsRef.current];
      setTimeout(() => {
        const finalCards: DrawnCard[] = cardsToProcess.map((c, index) => ({
          card: c,
          isReversed: Math.random() > 0.5,
          position: index,
          positionName: selectedSpread.positions[index] || `位置${index + 1}`
        }));
        setDrawnCards(finalCards);
        setGamePhase('revealing');
      }, 500);
    }
  }, [selectedSpread]);

  const handleAllRevealed = useCallback(() => {
    setTimeout(() => setGamePhase('result'), 500);
  }, []);

  const handleRestart = useCallback(() => {
    setGamePhase('setQuestion');
    setSelectedSpread(null);
    setDrawnCards([]);
    setSelectedCards([]);
    selectedCardsRef.current = [];
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedSpread || drawnCards.length === 0) return;
    
    const result = {
      question,
      spreadName: selectedSpread.name,
      date: new Date().toISOString(),
      cards: drawnCards.map(dc => ({
        name: dc.card.name,
        isReversed: dc.isReversed,
        position: dc.positionName
      }))
    };
    
    const saved = JSON.parse(localStorage.getItem('tarotReadings') || '[]');
    saved.push(result);
    localStorage.setItem('tarotReadings', JSON.stringify(saved));
    
    alert('占卜结果已保存！');
  }, [question, selectedSpread, drawnCards]);

  return (
    <main className="relative h-full bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmQ3MDAiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      {gamePhase !== 'intro' && (
        <header className="relative z-20 border-b border-purple-400/10 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 text-amber-200 hover:text-amber-400 transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-lg">神秘塔罗</span>
            </button>
            
            <div className="flex items-center gap-4">
              {selectedSpread && (
                <span className="text-sm text-purple-300/70">
                  {selectedSpread.name}
                </span>
              )}
            </div>
          </div>
        </header>
      )}

      <div className="relative z-10 flex-1 overflow-hidden">
        {gamePhase === 'intro' && <IntroScreen onStart={handleStart} />}

        {gamePhase === 'setQuestion' && (
          <div className="h-full overflow-y-auto">
            <SetQuestion onSetQuestion={handleSetQuestion} />
          </div>
        )}

        {gamePhase === 'selectSpread' && (
          <div className="h-full overflow-y-auto py-8">
            <SpreadSelector
              spreads={spreadTypes}
              selectedSpread={selectedSpread}
              onSelect={handleSelectSpread}
            />
          </div>
        )}

        {gamePhase === 'selectCards' && selectedSpread && (
          <div className="h-full flex flex-col">
            <div className="text-center py-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-amber-200 mb-2">
                {selectedSpread.name}
              </h2>
              <p className="text-purple-300/60">
                请从扇形牌库中选择 {selectedSpread.cardCount} 张牌
              </p>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <FanDeck
                onCardSelect={handleCardSelect}
                selectedCount={selectedCards.length}
                totalCards={selectedSpread.cardCount}
              />
            </div>
          </div>
        )}

        {gamePhase === 'revealing' && selectedSpread && drawnCards.length > 0 && (
          <div className="h-full overflow-y-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-200 mb-2">揭示命运</h2>
              <p className="text-purple-300/60">正在为你翻开塔罗牌...</p>
            </div>
            <CardSpread spread={selectedSpread} drawnCards={drawnCards} onAllRevealed={handleAllRevealed} />
          </div>
        )}

        {gamePhase === 'result' && selectedSpread && drawnCards.length > 0 && (
          <div className="h-full overflow-y-auto py-8">
            <ReadingResult
              question={question}
              drawnCards={drawnCards}
              spreadName={selectedSpread.name}
              onRestart={handleRestart}
              onSave={handleSave}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-5" />
    </main>
  );
}
