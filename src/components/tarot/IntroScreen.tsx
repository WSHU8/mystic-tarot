'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Star, Heart, Sparkles, Wand2, ArrowRight, Layers, Layout, BookOpen } from '@/lib/icons';
import { useTarotI18n } from '@/i18n/provider';

interface IntroScreenProps {
  onStart: () => void;
}

// 预定义的星星位置（避免 hydration 错误）
const starPositions = [
  { left: 49.29, top: 39.97 },
  { left: 9.49, top: 16.12 },
  { left: 77.40, top: 94.83 },
  { left: 20.08, top: 58.11 },
  { left: 15.54, top: 9.49 },
  { left: 65.67, top: 56.03 },
  { left: 66.06, top: 33.15 },
  { left: 15.20, top: 70.39 },
  { left: 9.90, top: 16.92 },
  { left: 21.60, top: 36.97 },
  { left: 20.18, top: 36.66 },
  { left: 76.79, top: 78.71 },
  { left: 10.04, top: 57.79 },
  { left: 46.26, top: 38.20 },
  { left: 12.03, top: 69.93 },
  { left: 68.18, top: 87.30 },
  { left: 26.44, top: 20.29 },
  { left: 91.59, top: 57.01 },
  { left: 55.18, top: 51.50 },
  { left: 91.80, top: 14.16 },
  { left: 36.80, top: 18.31 },
  { left: 41.81, top: 18.99 },
  { left: 19.01, top: 16.44 },
  { left: 17.72, top: 50.27 },
  { left: 75.27, top: 2.24 },
  { left: 67.71, top: 12.08 },
  { left: 49.01, top: 57.53 },
  { left: 22.79, top: 34.12 },
  { left: 35.69, top: 17.30 },
  { left: 48.00, top: 71.22 },
  { left: 17.10, top: 20.50 },
  { left: 87.02, top: 56.89 },
  { left: 80.52, top: 47.39 },
  { left: 44.97, top: 60.75 },
  { left: 71.80, top: 6.63 },
  { left: 57.35, top: 22.75 },
  { left: 54.63, top: 72.32 },
  { left: 1.77, top: 74.40 },
  { left: 22.78, top: 64.38 },
  { left: 70.21, top: 55.34 },
  { left: 41.51, top: 44.65 },
  { left: 24.64, top: 0.97 },
  { left: 7.48, top: 72.02 },
  { left: 7.66, top: 78.75 },
  { left: 75.77, top: 15.46 },
  { left: 93.39, top: 24.85 },
  { left: 82.12, top: 72.33 },
  { left: 67.57, top: 83.89 },
  { left: 56.43, top: 81.85 },
  { left: 65.95, top: 25.05 }
];

const bigStarPositions = [
  { left: 31.46, top: 66.47 },
  { left: 80.61, top: 20.58 },
  { left: 37.51, top: 41.14 },
  { left: 10.87, top: 87.09 },
  { left: 30.04, top: 48.47 },
  { left: 65.44, top: 37.56 },
  { left: 20.43, top: 62.65 },
  { left: 11.53, top: 50.13 }
];

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { messages } = useTarotI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowContent(true), 500);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen md:h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 闪烁的星星 */}
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${(i * 0.37) % 3}s`,
              animationDuration: `${2 + (i % 3) * 0.5}s`
            }}
          />
        ))}
        
        {/* 大星星 */}
        {bigStarPositions.map((pos, i) => (
          <div
            key={`big-${i}`}
            className="absolute w-2 h-2 bg-amber-200 rounded-full animate-twinkle-slow"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${(i * 0.85) % 4}s`
            }}
          />
        ))}

        {/* 神秘光环 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent animate-pulse-slow" />
      </div>

      {/* 主要内容 */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* 图标装饰 */}
        <div className={`mb-6 md:mb-8 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="relative inline-block">
            {/* 外圈 */}
            <div className="absolute -inset-6 md:-inset-8 border border-amber-400/20 rounded-full animate-spin-slow" />
            <div className="absolute -inset-8 md:-inset-12 border border-purple-400/10 rounded-full animate-spin-reverse" />
            
            {/* 中心图标 */}
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-900/80 to-slate-900/80 flex items-center justify-center border-2 border-amber-400/40 shadow-2xl shadow-purple-500/20">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-amber-400" />
            </div>

            {/* 环绕符号 */}
            {[Moon, Sun, Star, Heart].map((IconComponent, i) => {
              const angle = (i * 90) - 45;
              return (
                <div
                  key={i}
                  className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-800/80 border border-purple-400/30 flex items-center justify-center left-1/2 top-1/2 orbit-icon"
                  style={{
                    '--angle': `${angle}deg`,
                  } as React.CSSProperties}
                >
                  <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-purple-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 标题 */}
        <div className={`transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              {messages.app.title}
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-purple-300/80 mb-1 md:mb-2">
            {messages.intro.tagline}
          </p>
          <p className="text-xs md:text-sm text-purple-400/50 max-w-md mx-auto mb-6 md:mb-8 px-4">
            {messages.intro.details}
          </p>
        </div>

        {/* 功能介绍 */}
        <div className={`grid grid-cols-3 gap-2 md:gap-4 max-w-lg mx-auto mb-6 md:mb-10 transition-all duration-700 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Layers, text: messages.intro.features[0] },
            { icon: Layout, text: messages.intro.features[1] },
            { icon: BookOpen, text: messages.intro.features[2] }
          ].map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg bg-slate-800/30 border border-purple-400/10">
                <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                <span className="text-[10px] md:text-xs text-purple-300/70">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* 开始按钮 */}
        <div className={`transition-all duration-700 delay-900 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onStart}
            className="group relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold text-base md:text-lg rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              <Wand2 className="w-4 h-4 md:w-5 md:h-5" />
              {messages.intro.start}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* 按钮光效 */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
          </button>
        </div>

        {/* 版权信息 */}
        <div className={`mt-8 md:mt-12 text-xs text-purple-400/30 transition-all duration-700 delay-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <p>{messages.intro.disclaimer}</p>
        </div>
      </div>

      <style jsx>{`
        .orbit-icon {
          transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-44px) rotate(calc(-1 * var(--angle)));
        }
        @media (min-width: 768px) {
          .orbit-icon {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-62px) rotate(calc(-1 * var(--angle)));
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-twinkle-slow {
          animation: twinkle 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 40s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
