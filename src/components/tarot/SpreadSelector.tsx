'use client';

import { SpreadType } from '@/types/tarot';
import { Circle, GitBranch, Heart, Cross, Users, Check, Layout } from '@/lib/icons';

interface SpreadSelectorProps {
  spreads: SpreadType[];
  selectedSpread: SpreadType | null;
  onSelect: (spread: SpreadType) => void;
}

const spreadIcons: Record<string, React.ReactNode> = {
  single: <Circle className="w-6 h-6" />,
  three: <GitBranch className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  celtic: <Cross className="w-6 h-6" />,
  relationship: <Users className="w-6 h-6" />
};

export default function SpreadSelector({ spreads, selectedSpread, onSelect }: SpreadSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-amber-200">
        选择牌阵
      </h2>
      <p className="text-center text-purple-300/70 mb-8">
        每种牌阵都有独特的解读方式，请根据你的问题选择合适的牌阵
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spreads.map((spread) => (
          <button
            key={spread.id}
            onClick={() => onSelect(spread)}
            className={`relative p-5 rounded-xl text-left transition-all duration-300 group overflow-hidden ${
              selectedSpread?.id === spread.id
                ? 'bg-gradient-to-br from-amber-900/40 to-purple-900/40 border-2 border-amber-400/60 shadow-lg shadow-amber-400/20'
                : 'bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-purple-400/20 hover:border-amber-400/40 hover:bg-gradient-to-br hover:from-amber-900/20 hover:to-purple-900/20'
            }`}
          >
            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-purple-400 blur-2xl" />
            </div>

            <div className="relative">
              {/* 图标和标题 */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedSpread?.id === spread.id
                    ? 'bg-amber-400/20 text-amber-300'
                    : 'bg-purple-400/10 text-purple-300 group-hover:bg-amber-400/10 group-hover:text-amber-300'
                }`}>
                  {spreadIcons[spread.id] || <Layout className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    selectedSpread?.id === spread.id ? 'text-amber-200' : 'text-white group-hover:text-amber-200'
                  }`}>
                    {spread.name}
                  </h3>
                  <span className="text-xs text-purple-400">
                    {spread.cardCount} 张牌
                  </span>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-sm text-purple-300/60 mb-4">
                {spread.description}
              </p>

              {/* 位置预览 */}
              <div className="flex flex-wrap gap-1">
                {spread.positions.slice(0, 4).map((pos, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] rounded bg-slate-700/50 text-purple-300/70"
                  >
                    {pos}
                  </span>
                ))}
                {spread.positions.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] rounded bg-slate-700/50 text-purple-300/70">
                    +{spread.positions.length - 4}
                  </span>
                )}
              </div>

              {/* 选中标记 */}
              {selectedSpread?.id === spread.id && (
                <div className="absolute top-0 right-0">
                  <div className="w-8 h-8 bg-amber-400 rounded-bl-xl flex items-end justify-start p-1">
                    <Check className="w-4 h-4 text-slate-900" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
