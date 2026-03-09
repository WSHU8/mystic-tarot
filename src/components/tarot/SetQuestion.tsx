'use client';

import { useState } from 'react';
import { Sparkles, HelpCircle, Heart, Briefcase, Users, Coins, ArrowRight, Star } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';

interface SetQuestionProps {
  onSetQuestion: (question: string) => void;
}

const categoryIcons = {
  love: Heart,
  career: Briefcase,
  wealth: Coins,
  relationships: Users,
  general: Star,
} as const;

export default function SetQuestion({ onSetQuestion }: SetQuestionProps) {
  const { messages } = useTarotI18n();
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim()) {
      onSetQuestion(question.trim());
    }
  };

  const handleSelectTemplate = (templateQuestion: string) => {
    setQuestion(templateQuestion);
  };

  return (
    <div className="relative h-full md:h-full flex flex-col items-center justify-start md:justify-center py-6 md:py-0 px-4 md:p-6 overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-900/50 border border-amber-400/30 mb-3 md:mb-4">
            <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-200 mb-2">
            {messages.question.title}
          </h2>
          <p className="text-purple-300/70 text-sm md:text-base">
            {messages.question.description}
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="relative rounded-xl">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={messages.question.placeholder}
              className="w-full h-28 md:h-32 px-4 md:px-5 py-3 md:py-4 bg-slate-900/80 border border-purple-400/30 rounded-xl text-white placeholder-purple-400/50 resize-none focus:outline-none focus:border-amber-400/50 transition-colors text-base md:text-lg"
            />
            <div className="absolute bottom-3 right-3 text-sm text-purple-400/50">
              {question.length > 0 && `${question.length} ${messages.question.characterCountSuffix}`}
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <p className="text-sm text-purple-300/60 mb-3 md:mb-4 text-center">
            {messages.question.templateHeading}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {messages.question.categories.map((template) => {
              const IconComponent = categoryIcons[template.key as keyof typeof categoryIcons];

              return (
                <div key={template.key} className="bg-slate-900/50 rounded-lg border border-purple-400/20 p-2 md:p-3">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <IconComponent className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-200">{template.label}</span>
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    {template.questions.map((templateQuestion) => (
                      <button
                        key={templateQuestion}
                        onClick={() => handleSelectTemplate(templateQuestion)}
                        className="w-full text-left px-2 py-1 md:py-1.5 text-sm text-purple-300/80 hover:text-white hover:bg-purple-400/10 rounded transition-colors"
                      >
                        {templateQuestion}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-purple-900/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6 border border-purple-400/20">
          <div className="flex items-start gap-2 md:gap-3">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-purple-300/80">
              <p className="font-medium text-amber-200 mb-1">{messages.question.tipTitle}</p>
              <p>{messages.question.tipBody}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!question.trim()}
            className={`group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
              question.trim()
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-105'
                : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{messages.question.next}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
