'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { GamePhase, SpreadType, DrawnCard, TarotCard } from '@/types/tarot';
import { spreadTypes } from '@/data/tarotCards';
import IntroScreen from '@/components/tarot/IntroScreen';
import SetQuestion from '@/components/tarot/SetQuestion';
import SpreadSelector from '@/components/tarot/SpreadSelector';
import FanDeck from '@/components/tarot/FanDeck';
import CardSpread from '@/components/tarot/CardSpread';
import ReadingResult from '@/components/tarot/ReadingResult';
import { Sparkles } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';
import { getLocalizedPositionName, getLocalizedSpread } from '@/lib/tarotLocalization';

export default function Home() {
  const { locale, messages, setLocale } = useTarotI18n();
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [question, setQuestion] = useState<string>('');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const selectedCardsRef = useRef<TarotCard[]>([]);

  const localizedSelectedSpread = useMemo(
    () => (selectedSpread ? getLocalizedSpread(selectedSpread, locale) : null),
    [locale, selectedSpread]
  );
  const localizedDrawnCards = useMemo(
    () =>
      selectedSpread
        ? drawnCards.map((drawnCard) => ({
            ...drawnCard,
            positionName: getLocalizedPositionName(selectedSpread, drawnCard.position, locale),
          }))
        : drawnCards,
    [drawnCards, locale, selectedSpread]
  );

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
          positionName: getLocalizedPositionName(selectedSpread, index, locale),
        }));

        setDrawnCards(finalCards);
        setGamePhase('revealing');
      }, 500);
    }
  }, [locale, selectedSpread]);

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
    if (!selectedSpread || localizedDrawnCards.length === 0) return;

    const result = {
      question,
      spreadName: getLocalizedSpread(selectedSpread, locale).name,
      date: new Date().toISOString(),
      cards: localizedDrawnCards.map((drawnCard) => ({
        name: locale === 'en' ? drawnCard.card.nameEn : drawnCard.card.name,
        isReversed: drawnCard.isReversed,
        position: drawnCard.positionName,
      })),
    };

    const saved = JSON.parse(localStorage.getItem('tarotReadings') || '[]');
    saved.push(result);
    localStorage.setItem('tarotReadings', JSON.stringify(saved));

    alert(messages.app.saveSuccess);
  }, [locale, localizedDrawnCards, messages.app.saveSuccess, question, selectedSpread]);

  return (
    <main className="relative h-full bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmQ3MDAiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      <header className="relative z-20 border-b border-purple-400/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {gamePhase === 'intro' ? (
            <div className="flex items-center gap-2 text-amber-200">
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-lg">{messages.app.shortTitle}</span>
            </div>
          ) : (
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 text-amber-200 hover:text-amber-400 transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-lg">{messages.app.shortTitle}</span>
            </button>
          )}

          <div className="flex items-center gap-3">
            {localizedSelectedSpread && (
              <span className="hidden sm:inline text-sm text-purple-300/70">
                {localizedSelectedSpread.name}
              </span>
            )}
            <div
              className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-slate-800/80 p-1"
              aria-label={messages.header.languageLabel}
            >
              <button
                type="button"
                onClick={() => setLocale('zh')}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  locale === 'zh'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                {messages.header.chinese}
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  locale === 'en'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                {messages.header.english}
              </button>
            </div>
          </div>
        </div>
      </header>

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

        {gamePhase === 'selectCards' && selectedSpread && localizedSelectedSpread && (
          <div className="h-full flex flex-col">
            <div className="text-center py-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-amber-200 mb-2">
                {localizedSelectedSpread.name}
              </h2>
              <p className="text-purple-300/60">
                {messages.selection.chooseCards.replace('{count}', String(selectedSpread.cardCount))}
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

        {gamePhase === 'revealing' && selectedSpread && localizedDrawnCards.length > 0 && (
          <div className="h-full overflow-y-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-200 mb-2">
                {messages.selection.revealingTitle}
              </h2>
              <p className="text-purple-300/60">{messages.selection.revealingDescription}</p>
            </div>
            <CardSpread spread={selectedSpread} drawnCards={localizedDrawnCards} onAllRevealed={handleAllRevealed} />
          </div>
        )}

        {gamePhase === 'result' && selectedSpread && localizedDrawnCards.length > 0 && (
          <div className="h-full overflow-y-auto py-8">
            <ReadingResult
              question={question}
              drawnCards={localizedDrawnCards}
              spreadName={localizedSelectedSpread?.name || selectedSpread.name}
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
