'use client';

import { useState } from 'react';
import { Sparkles, HelpCircle, Heart, Briefcase, Users, Coins, ArrowRight, Star } from '@/lib/icons';

interface SetQuestionProps {
  onSetQuestion: (question: string) => void;
}

// 预设问题模板
const questionTemplates = [
  { icon: Heart, category: '感情', questions: ['我的感情发展会如何？', '我和TA的关系会怎样发展？', '我什么时候能遇到对的人？'] },
  { icon: Briefcase, category: '事业', questions: ['我的事业发展方向是什么？', '近期工作会有什么变化？', '我应该换工作吗？'] },
  { icon: Coins, category: '财运', questions: ['我近期的财运如何？', '这笔投资值得吗？', '如何改善我的财务状况？'] },
  { icon: Users, category: '人际', questions: ['我该如何处理这段关系？', '这个人值得信任吗？', '如何改善人际关系？'] },
  { icon: Star, category: '综合', questions: ['我近期的运势如何？', '我该关注什么方面？', '有什么重要的事需要注意？'] },
];

export default function SetQuestion({ onSetQuestion }: SetQuestionProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim()) {
      onSetQuestion(question.trim());
    }
  };

  const handleSelectTemplate = (q: string) => {
    setQuestion(q);
  };

  return (
    <div className="relative h-full md:h-full flex flex-col items-center justify-start md:justify-center py-6 md:py-0 px-4 md:p-6 overflow-y-auto overflow-x-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* 标题 */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-900/50 border border-amber-400/30 mb-3 md:mb-4">
            <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-200 mb-2">设定你的问题</h2>
          <p className="text-purple-300/70 text-sm md:text-base">
            在开始占卜之前，请静下心来，想好你想要探索的问题
          </p>
        </div>

        {/* 问题输入区 */}
        <div className="mb-6 md:mb-8">
          <div className="relative rounded-xl">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="在此输入你想要询问的问题..."
              className="w-full h-28 md:h-32 px-4 md:px-5 py-3 md:py-4 bg-slate-900/80 border border-purple-400/30 rounded-xl text-white placeholder-purple-400/50 resize-none focus:outline-none focus:border-amber-400/50 transition-colors text-base md:text-lg"
            />
            <div className="absolute bottom-3 right-3 text-sm text-purple-400/50">
              {question.length > 0 && `${question.length} 字`}
            </div>
          </div>
        </div>

        {/* 问题模板 */}
        <div className="mb-6 md:mb-8">
          <p className="text-sm text-purple-300/60 mb-3 md:mb-4 text-center">或者选择一个模板问题：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {questionTemplates.map((template, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded-lg border border-purple-400/20 p-2 md:p-3">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <template.icon className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-200">{template.category}</span>
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  {template.questions.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSelectTemplate(q)}
                      className="w-full text-left px-2 py-1 md:py-1.5 text-sm text-purple-300/80 hover:text-white hover:bg-purple-400/10 rounded transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 提示 */}
        <div className="bg-purple-900/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6 border border-purple-400/20">
          <div className="flex items-start gap-2 md:gap-3">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-purple-300/80">
              <p className="font-medium text-amber-200 mb-1">占卜小贴士</p>
              <p>问题越具体，解读越准确。开放式问题比是非题更适合塔罗占卜。</p>
            </div>
          </div>
        </div>

        {/* 开始按钮 */}
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
            <span>选择牌阵</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
