'use client';

import { DrawnCard } from '@/types/tarot';
import { iconMap, Sparkles, RefreshCw, Save, ScrollText, Star, HelpCircle } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';
import {
  getLocalizedCard,
  getLocalizedOverallReading,
  getLocalizedReadingText,
  getOrientationLabel,
} from '@/lib/tarotLocalization';

interface ReadingResultProps {
  question: string;
  drawnCards: DrawnCard[];
  spreadName: string;
  onRestart: () => void;
  onSave?: () => void;
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Star;
  return <IconComponent className={className} />;
}

export default function ReadingResult({ question, drawnCards, spreadName, onRestart, onSave }: ReadingResultProps) {
  const { locale, messages } = useTarotI18n();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/40 rounded-full border border-purple-400/30 mb-4">
          <ScrollText className="w-4 h-4 text-purple-300" />
          <span className="text-sm text-purple-200">{spreadName}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-amber-200 mb-4">
          {messages.reading.title}
        </h2>

        <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-400/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-purple-300/70">{messages.reading.questionLabel}</span>
          </div>
          <p className="text-lg text-amber-200 font-medium">
            "{question}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {drawnCards.map((drawnCard, index) => {
          const localizedCard = getLocalizedCard(drawnCard.card, locale);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-xl p-5 border border-purple-400/20 hover:border-amber-400/30 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-24 rounded-lg flex flex-col items-center justify-center relative overflow-hidden ${
                    drawnCard.isReversed ? 'rotate-180' : ''
                  }`}
                  style={{
                    background: drawnCard.card.type === 'major'
                      ? 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)'
                      : drawnCard.card.suit === 'wands'
                        ? 'linear-gradient(135deg, #4a1a1a 0%, #2d1b1b 100%)'
                        : drawnCard.card.suit === 'cups'
                          ? 'linear-gradient(135deg, #1a2d4a 0%, #1b2d3d 100%)'
                          : drawnCard.card.suit === 'swords'
                            ? 'linear-gradient(135deg, #1a3a4a 0%, #1b2d3d 100%)'
                            : 'linear-gradient(135deg, #2d3a1a 0%, #1f2d1b 100%)'
                  }}
                >
                  <div className="absolute inset-0 border border-amber-400/30 rounded-lg pointer-events-none" />

                  <DynamicIcon name={drawnCard.card.icon} className="w-8 h-8 text-amber-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-medium bg-purple-400/20 text-purple-200 rounded">
                      {drawnCard.positionName}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      drawnCard.isReversed
                        ? 'bg-red-400/20 text-red-200'
                        : 'bg-green-400/20 text-green-200'
                    }`}>
                      {getOrientationLabel(drawnCard.isReversed, locale)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-amber-200 mb-1">
                    {localizedCard.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {localizedCard.keywords.map((keyword) => (
                      <span key={keyword} className="px-2 py-0.5 text-[10px] rounded bg-amber-400/10 text-amber-200/80">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-400/10">
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  {getLocalizedReadingText(drawnCard, locale)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-amber-900/20 via-purple-900/30 to-amber-900/20 rounded-xl p-6 border border-amber-400/20 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-amber-200">{messages.reading.overallTitle}</h3>
        </div>
        <p className="text-purple-200/90 leading-relaxed">
          {getLocalizedOverallReading({
            question,
            drawnCards,
            spreadName,
            locale,
          })}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
        >
          <RefreshCw className="w-5 h-5" />
          {messages.reading.restart}
        </button>
        {onSave && (
          <button
            onClick={onSave}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Save className="w-5 h-5" />
            {messages.reading.save}
          </button>
        )}
      </div>
    </div>
  );
}
