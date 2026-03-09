import { Locale } from '@/i18n/locale';

export interface TarotMessages {
  app: {
    title: string;
    shortTitle: string;
    subtitle: string;
    description: string;
    saveSuccess: string;
    cardCountUnit: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  header: {
    languageLabel: string;
    chinese: string;
    english: string;
  };
  intro: {
    start: string;
    tagline: string;
    details: string;
    features: string[];
    disclaimer: string;
  };
  question: {
    title: string;
    description: string;
    placeholder: string;
    characterCountSuffix: string;
    templateHeading: string;
    tipTitle: string;
    tipBody: string;
    next: string;
    categories: Array<{
      key: string;
      label: string;
      questions: string[];
    }>;
  };
  spread: {
    title: string;
    description: string;
    cardsSuffix: string;
  };
  selection: {
    chooseCards: string;
    revealingTitle: string;
    revealingDescription: string;
  };
  fanDeck: {
    loading: string;
    chooseShuffleTitle: string;
    chooseShuffleSubtitle: string;
    shuffling: string;
    selectPrompt: string;
    shuffleTypes: {
      riffle: { name: string; description: string };
      overhand: { name: string; description: string };
      hindu: { name: string; description: string };
    };
  };
  cardSpread: {
    clickToReveal: string;
  };
  card: {
    clickToReveal: string;
  };
  reading: {
    title: string;
    questionLabel: string;
    overallTitle: string;
    restart: string;
    save: string;
  };
}

const zhMessages: TarotMessages = {
  app: {
    title: '神秘塔罗',
    shortTitle: '神秘塔罗',
    subtitle: '探索命运的奥秘',
    description: '塔罗牌是古老的占卜工具，通过78张牌揭示内心深处的智慧与指引。',
    saveSuccess: '占卜结果已保存！',
    cardCountUnit: '张牌',
  },
  metadata: {
    title: '神秘塔罗 - 在线塔罗牌占卜',
    description: '精美的在线塔罗牌占卜应用，支持多种经典牌阵，提供专业的牌义解读。',
  },
  header: {
    languageLabel: '语言',
    chinese: '中文',
    english: 'EN',
  },
  intro: {
    start: '开始占卜',
    tagline: '探索命运的奥秘',
    details: '塔罗牌是古老的占卜工具，通过78张牌揭示内心深处的智慧与指引。',
    features: ['78张完整牌组', '多种经典牌阵', '专业解读'],
    disclaimer: '仅供娱乐参考 · 请理性对待占卜结果',
  },
  question: {
    title: '设定你的问题',
    description: '在开始占卜之前，请静下心来，想好你想要探索的问题',
    placeholder: '在此输入你想要询问的问题...',
    characterCountSuffix: '字',
    templateHeading: '或者选择一个模板问题：',
    tipTitle: '占卜小贴士',
    tipBody: '问题越具体，解读越准确。开放式问题比是非题更适合塔罗占卜。',
    next: '选择牌阵',
    categories: [
      {
        key: 'love',
        label: '感情',
        questions: ['我的感情发展会如何？', '我和TA的关系会怎样发展？', '我什么时候能遇到对的人？'],
      },
      {
        key: 'career',
        label: '事业',
        questions: ['我的事业发展方向是什么？', '近期工作会有什么变化？', '我应该换工作吗？'],
      },
      {
        key: 'wealth',
        label: '财运',
        questions: ['我近期的财运如何？', '这笔投资值得吗？', '如何改善我的财务状况？'],
      },
      {
        key: 'relationships',
        label: '人际',
        questions: ['我该如何处理这段关系？', '这个人值得信任吗？', '如何改善人际关系？'],
      },
      {
        key: 'general',
        label: '综合',
        questions: ['我近期的运势如何？', '我该关注什么方面？', '有什么重要的事需要注意？'],
      },
    ],
  },
  spread: {
    title: '选择牌阵',
    description: '每种牌阵都有独特的解读方式，请根据你的问题选择合适的牌阵',
    cardsSuffix: '张牌',
  },
  selection: {
    chooseCards: '请从牌库中选择 {count} 张牌',
    revealingTitle: '揭示命运',
    revealingDescription: '正在为你翻开塔罗牌...',
  },
  fanDeck: {
    loading: '正在加载牌库...',
    chooseShuffleTitle: '选择洗牌方式',
    chooseShuffleSubtitle: '选择你想要的洗牌仪式',
    shuffling: '正在{type}...',
    selectPrompt: '从牌库中选择 {count} 张牌',
    shuffleTypes: {
      riffle: {
        name: '交错洗牌',
        description: '经典交错式洗牌，牌分两半交错落下',
      },
      overhand: {
        name: '过手洗牌',
        description: '从一手传递到另一手的洗牌方式',
      },
      hindu: {
        name: '印度洗牌',
        description: '从牌堆底部一张张滑落的洗牌方式',
      },
    },
  },
  cardSpread: {
    clickToReveal: '点击卡牌翻转查看',
  },
  card: {
    clickToReveal: '点击翻开',
  },
  reading: {
    title: '占卜解读',
    questionLabel: '你的问题',
    overallTitle: '综合解读',
    restart: '重新开始',
    save: '保存结果',
  },
};

const enMessages: TarotMessages = {
  app: {
    title: 'Mystic Tarot',
    shortTitle: 'Mystic Tarot',
    subtitle: 'Explore the hidden currents of your path',
    description: 'Tarot is an ancient divination tool that reveals inner wisdom and guidance through a 78-card deck.',
    saveSuccess: 'Your reading has been saved.',
    cardCountUnit: 'cards',
  },
  metadata: {
    title: 'Mystic Tarot - Online Tarot Reading',
    description: 'An atmospheric online tarot experience with classic spreads and in-depth interpretations.',
  },
  header: {
    languageLabel: 'Language',
    chinese: '中文',
    english: 'EN',
  },
  intro: {
    start: 'Begin Reading',
    tagline: 'Explore the hidden currents of your path',
    details: 'Tarot is an ancient divination tool that reveals inner wisdom and guidance through a 78-card deck.',
    features: ['Full 78-card deck', 'Classic spreads', 'Guided interpretations'],
    disclaimer: 'For reflection and entertainment only. Hold every reading with clarity and care.',
  },
  question: {
    title: 'Set Your Question',
    description: 'Before you begin, take a breath and focus on the question you truly want to explore.',
    placeholder: 'Type the question you want to ask...',
    characterCountSuffix: 'chars',
    templateHeading: 'Or choose a question template:',
    tipTitle: 'Tarot tip',
    tipBody: 'The more specific your question is, the clearer the reading becomes. Open-ended questions usually work better than yes-or-no ones.',
    next: 'Choose a Spread',
    categories: [
      {
        key: 'love',
        label: 'Love',
        questions: ['How is my love life likely to unfold?', 'How may my relationship with them evolve?', 'When am I likely to meet the right person?'],
      },
      {
        key: 'career',
        label: 'Career',
        questions: ['What direction is my career moving toward?', 'What changes may happen at work soon?', 'Should I change jobs?'],
      },
      {
        key: 'wealth',
        label: 'Finances',
        questions: ['How is my financial energy lately?', 'Is this investment worth pursuing?', 'How can I improve my financial situation?'],
      },
      {
        key: 'relationships',
        label: 'Relationships',
        questions: ['How should I handle this relationship?', 'Is this person worthy of my trust?', 'How can I improve my relationships with others?'],
      },
      {
        key: 'general',
        label: 'General',
        questions: ['How is my overall energy lately?', 'What should I pay closer attention to?', 'What important matter needs my awareness right now?'],
      },
    ],
  },
  spread: {
    title: 'Choose a Spread',
    description: 'Each spread reveals a different angle of the story. Pick the one that best fits your question.',
    cardsSuffix: 'cards',
  },
  selection: {
    chooseCards: 'Select {count} cards from the deck',
    revealingTitle: 'Revealing the Reading',
    revealingDescription: 'The cards are opening for you now...',
  },
  fanDeck: {
    loading: 'Loading the deck...',
    chooseShuffleTitle: 'Choose a Shuffle Style',
    chooseShuffleSubtitle: 'Pick the ritual that feels right for this reading',
    shuffling: '{type} in progress...',
    selectPrompt: 'Select {count} cards from the deck',
    shuffleTypes: {
      riffle: {
        name: 'Riffle Shuffle',
        description: 'A classic interleaving shuffle where the deck falls in two halves',
      },
      overhand: {
        name: 'Overhand Shuffle',
        description: 'A hand-to-hand shuffle that moves packets from one hand to the other',
      },
      hindu: {
        name: 'Hindu Shuffle',
        description: 'A smooth shuffle that slides cards down from the bottom of the deck',
      },
    },
  },
  cardSpread: {
    clickToReveal: 'Click a card to reveal it',
  },
  card: {
    clickToReveal: 'Click to reveal',
  },
  reading: {
    title: 'Reading Interpretation',
    questionLabel: 'Your question',
    overallTitle: 'Overall Reading',
    restart: 'Start Again',
    save: 'Save Reading',
  },
};

export function getLocaleMessages(locale: Locale): TarotMessages {
  return locale === 'en' ? enMessages : zhMessages;
}
