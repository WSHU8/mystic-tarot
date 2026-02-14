'use client';

import { DrawnCard } from '@/types/tarot';
import { iconMap, Sparkles, RefreshCw, Save, ScrollText, Star, HelpCircle } from '@/lib/icons';

interface ReadingResultProps {
  question: string;
  drawnCards: DrawnCard[];
  spreadName: string;
  onRestart: () => void;
  onSave?: () => void;
}

// 动态图标渲染组件
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Star;
  return <IconComponent className={className} />;
}

export default function ReadingResult({ question, drawnCards, spreadName, onRestart, onSave }: ReadingResultProps) {
  const generateReading = (drawnCard: DrawnCard): string => {
    const { card, isReversed, positionName } = drawnCard;
    const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
    const status = isReversed ? '逆位' : '正位';
    
    return `在【${positionName}】的位置上，${card.name}以${status}出现。${meaning}`;
  };

  const generateOverallReading = (): string => {
    if (drawnCards.length === 1) {
      return drawnCards[0].isReversed 
        ? drawnCards[0].card.reversedMeaning 
        : drawnCards[0].card.uprightMeaning;
    }

    // 综合解读
    const themes = drawnCards.flatMap(dc => dc.card.keywords).slice(0, 6);
    const majorCards = drawnCards.filter(dc => dc.card.type === 'major');
    const reversedCount = drawnCards.filter(dc => dc.isReversed).length;

    let reading = `针对你关于"${question}"的问题，这次${spreadName}占卜显示：`;
    
    if (majorCards.length > 0) {
      reading += `出现了${majorCards.length}张大阿卡纳牌，暗示着重要的命运转折。`;
    }
    
    if (reversedCount > drawnCards.length / 2) {
      reading += `多张牌呈现逆位，提示你需要关注潜在的阻碍和内在的挑战。`;
    } else if (reversedCount === 0) {
      reading += `所有牌都呈现正位，能量流动顺畅，是积极发展的信号。`;
    }

    reading += `整个牌阵围绕的主题是：${themes.slice(0, 3).join('、')}。`;
    
    return reading;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      {/* 标题区 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/40 rounded-full border border-purple-400/30 mb-4">
          <ScrollText className="w-4 h-4 text-purple-300" />
          <span className="text-sm text-purple-200">{spreadName}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-amber-200 mb-4">
          占卜解读
        </h2>
        
        {/* 显示问题 */}
        <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-400/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-purple-300/70">你的问题</span>
          </div>
          <p className="text-lg text-amber-200 font-medium">
            "{question}"
          </p>
        </div>
      </div>

      {/* 牌阵展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {drawnCards.map((drawnCard, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-xl p-5 border border-purple-400/20 hover:border-amber-400/30 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                {/* 卡片图标 */}
                <div className={`flex-shrink-0 w-16 h-24 rounded-lg flex flex-col items-center justify-center relative overflow-hidden ${
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
                }}>
                  {/* 边框 */}
                  <div className="absolute inset-0 border border-amber-400/30 rounded-lg pointer-events-none" />
                  
                  <DynamicIcon name={drawnCard.card.icon} className="w-8 h-8 text-amber-400" />
                </div>

                {/* 卡片信息 */}
                <div className="flex-1 min-w-0">
                  {/* 位置名称 */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-medium bg-purple-400/20 text-purple-200 rounded">
                      {drawnCard.positionName}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      drawnCard.isReversed 
                        ? 'bg-red-400/20 text-red-200' 
                        : 'bg-green-400/20 text-green-200'
                    }`}>
                      {drawnCard.isReversed ? '逆位' : '正位'}
                    </span>
                  </div>

                  {/* 卡片名称 */}
                  <h3 className="text-lg font-bold text-amber-200 mb-1">
                    {drawnCard.card.name}
                  </h3>
                  <p className="text-xs text-purple-300/50 mb-2">
                    {drawnCard.card.nameEn}
                  </p>

                  {/* 关键词 */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {drawnCard.card.keywords.map((keyword, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-amber-400/10 text-amber-200/80">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 解读文字 */}
              <div className="mt-4 pt-4 border-t border-purple-400/10">
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  {generateReading(drawnCard)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 综合解读 */}
      <div className="bg-gradient-to-r from-amber-900/20 via-purple-900/30 to-amber-900/20 rounded-xl p-6 border border-amber-400/20 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-amber-200">综合解读</h3>
        </div>
        <p className="text-purple-200/90 leading-relaxed">
          {generateOverallReading()}
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
        >
          <RefreshCw className="w-5 h-5" />
          重新开始
        </button>
        {onSave && (
          <button
            onClick={onSave}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Save className="w-5 h-5" />
            保存结果
          </button>
        )}
      </div>
    </div>
  );
}
