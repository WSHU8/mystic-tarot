# 神秘塔罗 ✨

一个精美的在线塔罗牌占卜应用，支持多种经典牌阵，提供专业的牌义解读。

## 功能特性

- **78张完整塔罗牌** - 包含22张大阿卡纳和56张小阿卡纳
- **多种经典牌阵** - 单张牌、三张牌、爱心牌阵、凯尔特十字、关系牌阵
- **精美动画效果** - 洗牌动画、扇形展开、翻牌特效
- **专业解读** - 正位/逆位含义、综合分析
- **响应式设计** - 完美适配桌面端和移动端
- **本地存储** - 保存占卜记录

## 技术栈

- **Next.js 15** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS
- **shadcn/ui** - UI 组件库
- **Lucide Icons** - 图标库

## 快速开始

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build

# 启动生产服务器
bun run start
```

## 项目结构

```
src/
├── app/
│   ├── page.tsx           # 主页面 - 游戏流程控制
│   ├── layout.tsx         # 布局
│   └── globals.css        # 全局样式
├── components/
│   └── tarot/
│       ├── IntroScreen.tsx    # 首页介绍
│       ├── SetQuestion.tsx    # 设定问题
│       ├── SpreadSelector.tsx # 选择牌阵
│       ├── FanDeck.tsx        # 扇形选牌（含洗牌动画）
│       ├── TarotCard.tsx      # 塔罗卡片（翻转动画）
│       ├── CardSpread.tsx     # 牌阵布局
│       └── ReadingResult.tsx  # 解读结果
├── data/
│   └── tarotCards.ts      # 78张塔罗牌数据
├── types/
│   └── tarot.ts           # 类型定义
└── lib/
    ├── icons.ts           # 图标映射
    └── utils.ts           # 工具函数
```

## 游戏流程

1. **首页** - 点击开始占卜
2. **设定问题** - 输入想要询问的问题
3. **选择牌阵** - 选择适合的牌阵类型
4. **洗牌选牌** - 选择洗牌方式，从扇形牌库中选牌
5. **翻牌** - 依次点击翻开每张牌
6. **查看解读** - 获取每张牌的含义和综合解读

## 牌阵说明

| 牌阵 | 牌数 | 适用场景 |
|------|------|----------|
| 单张牌 | 1 | 快速指引、每日运势 |
| 三张牌 | 3 | 过去/现在/未来、身/心/灵 |
| 爱心牌阵 | 5 | 感情问题 |
| 凯尔特十字 | 10 | 综合问题、深度分析 |
| 关系牌阵 | 7 | 人际关系、双人关系 |

## 部署

### Vercel（推荐）

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t tarot-app .
docker run -p 3000:3000 tarot-app
```

### 传统服务器

```bash
bun run build
bun run start
```

## 许可证

MIT License
