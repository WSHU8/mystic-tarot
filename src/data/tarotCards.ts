import { TarotCard, SpreadType } from '@/types/tarot';

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    type: 'major',
    keywords: ['新开始', '冒险', '纯真', '自由'],
    uprightMeaning: '代表新的开始和无限可能。你现在正处于人生的起点，充满勇气和好奇心。这是一个冒险的好时机，相信自己的直觉。',
    reversedMeaning: '可能表示鲁莽行事或逃避责任。你可能因为恐惧而不敢迈出第一步，或者在未经思考的情况下做出决定。',
    icon: 'Footprints',
    description: '愚者象征着无限的可能性和纯真的开始。他站在悬崖边，却毫无畏惧，代表着对未知的信任和冒险精神。'
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    type: 'major',
    keywords: ['创造', '意志力', '技能', '资源'],
    uprightMeaning: '你拥有实现目标所需的一切资源。现在是展现才能、付诸行动的时候。你的创造力和意志力正处于巅峰状态。',
    reversedMeaning: '可能表示才华被浪费或被欺骗。你可能没有充分利用自己的能力，或者有人在对你进行操纵。',
    icon: 'Wand2',
    description: '魔术师象征着创造力和意志力的完美结合。他一手指天，一手指地，将天上的能量引入人间。'
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    type: 'major',
    keywords: ['直觉', '神秘', '潜意识', '智慧'],
    uprightMeaning: '倾听你内心的声音。答案就在你的潜意识中，现在需要静心聆听。有些秘密即将被揭示。',
    reversedMeaning: '可能表示忽视直觉或秘密被揭露。你可能过于依赖理性而忽视了内心的声音。',
    icon: 'Moon',
    description: '女祭司守护着神秘的帷幕，代表直觉、智慧和潜意识的力量。她提醒我们要倾听内心深处的声音。'
  },
  {
    id: 3,
    name: '女皇',
    nameEn: 'The Empress',
    type: 'major',
    keywords: ['丰饶', '母性', '创造', '自然'],
    uprightMeaning: '创造和丰收的时期。无论是事业、感情还是创意项目，都将迎来丰盛的成果。享受生活的美好。',
    reversedMeaning: '可能表示创意枯竭或过度依赖。你可能需要更多关注自我照顾，或者在某方面过于依赖他人。',
    icon: 'Crown',
    description: '女皇代表大地之母的丰饶能量，象征着创造力、母性和自然的孕育力量。'
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    type: 'major',
    keywords: ['权威', '结构', '控制', '父亲'],
    uprightMeaning: '现在是建立秩序和结构的时候。你的领导能力将得到展现，需要用理性和逻辑来处理事务。',
    reversedMeaning: '可能表示权威被滥用或过度控制。你可能需要放松控制欲，或者在某方面缺乏纪律。',
    icon: 'Shield',
    description: '皇帝代表权威、结构和稳定的力量。他用理性和规则来建立秩序，保护他所统治的领域。'
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    type: 'major',
    keywords: ['传统', '信仰', '教育', ' conformity'],
    uprightMeaning: '遵循传统价值观和道德准则可能会带来好的结果。寻求导师或精神指导的时机已到。',
    reversedMeaning: '可能表示打破传统或质疑权威。你可能需要找到自己的道路，而不是盲从他人的期望。',
    icon: 'BookOpen',
    description: '教皇是精神和道德的导师，代表着传统信仰、教育和社会规范的传承。'
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    type: 'major',
    keywords: ['爱情', '选择', '和谐', '价值观'],
    uprightMeaning: '爱情和人际关系方面的好消息。你可能面临重要选择，要用心而非仅仅用头脑来做决定。',
    reversedMeaning: '可能表示关系不和谐或错误的选择。你可能需要重新审视自己的价值观和人际关系。',
    icon: 'Heart',
    description: '恋人牌代表爱情的祝福，也象征着人生中重要的选择时刻，需要倾听内心。'
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    type: 'major',
    keywords: ['意志', '胜利', '决心', '控制'],
    uprightMeaning: '胜利即将来临。通过坚定的意志和决心，你将克服障碍，达成目标。保持专注和自律。',
    reversedMeaning: '可能表示失去方向或缺乏控制。你可能需要重新调整策略，或者在某方面过于激进。',
    icon: 'Swords',
    description: '战车象征着力量的胜利和意志的征服。战士驾驭着两匹马，代表着对对立力量的掌控。'
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    type: 'major',
    keywords: ['勇气', '耐心', '内在力量', '慈悲'],
    uprightMeaning: '你有足够的内在力量来面对当前的挑战。用温和而非强硬的方式来解决问题，耐心是你的武器。',
    reversedMeaning: '可能表示缺乏信心或自我怀疑。你需要重新找回内心的力量，相信自己有能力克服困难。',
    icon: 'Shield',
    description: '力量牌代表内在的勇气和慈悲。女子轻柔地抚摸狮子，展现了以柔克刚的智慧。'
  },
  {
    id: 9,
    name: '隐士',
    nameEn: 'The Hermit',
    type: 'major',
    keywords: ['内省', '孤独', '智慧', '指引'],
    uprightMeaning: '现在是需要独处和反思的时期。通过内省寻找答案，不要急于行动。智慧来自内心的平静。',
    reversedMeaning: '可能表示过度孤立或拒绝帮助。你可能需要走出孤独，与他人建立联系。',
    icon: 'Lamp',
    description: '隐士独自站在山顶，手持明灯，象征着内省、智慧和精神上的追求。'
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    type: 'major',
    keywords: ['命运', '转变', '循环', '机遇'],
    uprightMeaning: '命运的齿轮正在转动，变化即将来临。无论是好是坏，这都是命运的一部分。把握机遇。',
    reversedMeaning: '可能表示运气不佳或抵抗变化。你可能需要接受命运的安排，而不是试图控制一切。',
    icon: 'Circle',
    description: '命运之轮象征着生命的循环和命运的不可预测。轮盘转动，带来机遇和挑战。'
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    type: 'major',
    keywords: ['公正', '真相', '因果', '平衡'],
    uprightMeaning: '公正将得到伸张。你的决定将带来应有的结果。保持诚实和公正，真相会浮出水面。',
    reversedMeaning: '可能表示不公正或逃避责任。你可能需要面对自己行为的后果，或者在某方面存在偏见。',
    icon: 'Scale',
    description: '正义女神手持天平，代表着公正、真相和因果报应的原则。'
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    type: 'major',
    keywords: ['牺牲', '等待', '新视角', '放下'],
    uprightMeaning: '现在是暂停和等待的时期。有时候需要放下执念，从不同的角度看问题。牺牲会带来新的洞见。',
    reversedMeaning: '可能表示无谓的牺牲或拖延。你可能需要采取行动，而不是继续等待。',
    icon: 'ArrowDown',
    description: '倒吊人悬吊于树间，象征着牺牲、等待和以不同视角看世界所带来的智慧。'
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    type: 'major',
    keywords: ['结束', '转变', '重生', '放下'],
    uprightMeaning: '一个周期即将结束，新的开始将要到来。不要恐惧结束，它是转变的必要部分。放下过去，迎接新生。',
    reversedMeaning: '可能表示抵抗变化或无法放下。你可能需要接受某些事情已经结束的事实。',
    icon: 'Skull',
    description: '死神牌并不代表肉体死亡，而是象征深刻的转变和旧事物的终结，为新生腾出空间。'
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    type: 'major',
    keywords: ['平衡', '耐心', '调和', '适度'],
    uprightMeaning: '寻找生活中的平衡点。耐心和适度将帮助你达成目标。调和矛盾，保持内心的平静。',
    reversedMeaning: '可能表示失去平衡或过度极端。你可能需要在某方面做出调整，回归中庸之道。',
    icon: 'Droplet',
    description: '天使将两杯水相互倾倒，象征着平衡、调和和耐心的美德。'
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    type: 'major',
    keywords: ['束缚', '欲望', '物质', '诱惑'],
    uprightMeaning: '你可能被某些事物所束缚，比如不健康的关系或有害的习惯。认识到这些枷锁的存在是解脱的第一步。',
    reversedMeaning: '可能表示挣脱束缚或面对阴影。你正在或即将从某种限制中解脱出来。',
    icon: 'Lock',
    description: '恶魔代表物质欲望和内心的阴暗面。他提醒我们认识到自己的枷锁，才有机会获得自由。'
  },
  {
    id: 16,
    name: '塔',
    nameEn: 'The Tower',
    type: 'major',
    keywords: ['突变', '灾难', '觉醒', '毁灭'],
    uprightMeaning: '突如其来的变化可能打破你现有的结构。虽然这可能令人不安，但它可能是必要的觉醒。',
    reversedMeaning: '可能表示避免了灾难或内心转变。你可能在经历一场内在的革命而非外在的剧变。',
    icon: 'Building2',
    description: '高塔被闪电击中，象征着突然的变革和旧有结构的崩塌。有时毁灭是重建的必要前提。'
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    type: 'major',
    keywords: ['希望', '灵感', '平静', '治愈'],
    uprightMeaning: '希望之光照亮你的道路。经历过风暴后，平静和治愈的时期来临。保持信念，美好的事物即将到来。',
    reversedMeaning: '可能表示失去希望或灵感受阻。你可能需要重新找回内心的光芒。',
    icon: 'Star',
    description: '星星代表希望、灵感和精神上的治愈。在黑暗的夜空中，它是引导我们前行的光芒。'
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    type: 'major',
    keywords: ['幻象', '恐惧', '潜意识', '迷惑'],
    uprightMeaning: '事情可能不如表面看起来那么简单。注意隐藏的真相和潜在的欺骗。面对内心的恐惧。',
    reversedMeaning: '可能表示看清真相或释放恐惧。迷雾正在消散，你开始看到事物的真实面貌。',
    icon: 'Moon',
    description: '月亮照亮夜空，却投下朦胧的光芒。它代表幻象、恐惧和潜意识的深层世界。'
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    type: 'major',
    keywords: ['快乐', '成功', '活力', '积极'],
    uprightMeaning: '光明和成功的时期。快乐、活力和积极能量围绕着你。这是享受生活和庆祝成就的时刻。',
    reversedMeaning: '可能表示成功延迟或暂时的阴霾。虽然光芒可能被遮蔽，但太阳依然存在。',
    icon: 'Sun',
    description: '太阳带来光明、温暖和生命力。它代表成功、快乐和精神的升华。'
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    type: 'major',
    keywords: ['觉醒', '重生', '召唤', '反省'],
    uprightMeaning: '审视过去，准备迎接转变。这是一个觉醒的时刻，听到内心的召唤，做出新的选择。',
    reversedMeaning: '可能表示自我怀疑或拒绝召唤。你可能需要接受过去的自己，才能迈向新的阶段。',
    icon: 'Mic2',
    description: '审判天使吹响号角，代表灵魂的觉醒和重生的召唤。是时候反省过去，迎接新生。'
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    type: 'major',
    keywords: ['完成', '圆满', '成就', '整合'],
    uprightMeaning: '一个周期即将圆满完成。你已经完成了重要的旅程，获得了宝贵的经验和成就。庆祝这一里程碑。',
    reversedMeaning: '可能表示未完成的任务或缺乏结束感。你可能需要做一些工作来达成完整。',
    icon: 'Globe',
    description: '世界代表一个周期的完成和圆满。它象征着成就、整合和生命旅程的完美落幕。'
  }
];

export const minorArcana: TarotCard[] = [
  // 权杖牌组 (Wands) - 代表火元素，象征行动、创意和热情
  ...generateMinorArcana('wands', 'Wand', '权杖', ['创造力', '行动', '热情', '冒险']),
  // 圣杯牌组 (Cups) - 代表水元素，象征情感、直觉和关系
  ...generateMinorArcana('cups', 'Cup', '圣杯', ['情感', '直觉', '关系', '灵性']),
  // 宝剑牌组 (Swords) - 代表风元素，象征思想、沟通和冲突
  ...generateMinorArcana('swords', 'Sword', '宝剑', ['思想', '真相', '沟通', '挑战']),
  // 钱币牌组 (Pentacles) - 代表土元素，象征物质、财富和实际
  ...generateMinorArcana('pentacles', 'Coin', '钱币', ['财富', '物质', '实际', '健康'])
];

function generateMinorArcana(
  suit: 'wands' | 'cups' | 'swords' | 'pentacles',
  icon: string,
  suitName: string,
  baseKeywords: string[]
): TarotCard[] {
  const cards: TarotCard[] = [];
  const suitDescriptions: Record<string, {upright: string, reversed: string}> = {
    wands: {
      upright: '代表创意、热情和行动力。现在是将想法付诸实践的好时机，你的能量和动力正处于巅峰。',
      reversed: '可能表示能量受阻或方向迷失。你可能需要重新审视自己的目标，或调整行动的方式。'
    },
    cups: {
      upright: '代表情感、直觉和人际关系的流动。现在是关注内心感受和情感连接的时刻。',
      reversed: '可能表示情感压抑或关系问题。你可能需要面对内心的感受，或解决人际间的矛盾。'
    },
    swords: {
      upright: '代表清晰的思维和果敢的决定。现在需要用理性和智慧来处理事务，真相将帮助你前进。',
      reversed: '可能表示思维混乱或冲突升级。你可能需要放下执念，或寻求更平和的解决方案。'
    },
    pentacles: {
      upright: '代表物质、财富和实际的进展。你的努力将带来实际的回报，现在是关注物质层面的时候。',
      reversed: '可能表示财务问题或过度物质化。你可能需要重新审视自己的价值观，或调整对物质的依赖。'
    }
  };

  const courtCards = [
    { number: 11, name: '侍从', nameEn: 'Page', meaning: '代表学习和探索的开始阶段，带着好奇心和热情迎接新的机会。' },
    { number: 12, name: '骑士', nameEn: 'Knight', meaning: '代表行动和追求的力量，勇敢地向目标前进，但要注意不要过于急躁。' },
    { number: 13, name: '王后', nameEn: 'Queen', meaning: '代表内在的智慧和直觉力量，以温和但坚定的方式展现你的影响力。' },
    { number: 14, name: '国王', nameEn: 'King', meaning: '代表掌控和成熟的力量，你已经掌握了这个领域的智慧，可以引领他人。' }
  ];

  // 数字牌 (Ace-10)
  for (let i = 1; i <= 10; i++) {
    const cardNames: Record<number, string> = {
      1: 'A',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      7: '七',
      8: '八',
      9: '九',
      10: '十'
    };

    const cardNamesEn: Record<number, string> = {
      1: 'Ace',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten'
    };

    cards.push({
      id: suit === 'wands' ? 22 + i : suit === 'cups' ? 36 + i : suit === 'swords' ? 50 + i : 64 + i,
      name: `${suitName}${cardNames[i]}`,
      nameEn: `${cardNamesEn[i]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      type: 'minor',
      suit,
      number: i,
      keywords: baseKeywords,
      uprightMeaning: suitDescriptions[suit].upright,
      reversedMeaning: suitDescriptions[suit].reversed,
      icon,
      description: `${suitName}${cardNames[i]}象征着${baseKeywords.join('、')}的能量在当前情况中的体现。`
    });
  }

  // 宫廷牌 (修正ID，避免与数字牌重叠)
  courtCards.forEach((court, index) => {
    cards.push({
      id: suit === 'wands' ? 33 + index : suit === 'cups' ? 47 + index : suit === 'swords' ? 61 + index : 75 + index,
      name: `${suitName}${court.name}`,
      nameEn: `${court.nameEn} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      type: 'minor',
      suit,
      number: court.number,
      keywords: baseKeywords,
      uprightMeaning: court.meaning,
      reversedMeaning: `可能表示在这个领域的不成熟或能力被阻碍。你需要发展这方面的品质。`,
      icon,
      description: `${suitName}${court.name}${court.meaning}`
    });
  });

  return cards;
}

export const allTarotCards: TarotCard[] = [...majorArcana, ...minorArcana];

export const spreadTypes: SpreadType[] = [
  {
    id: 'single',
    name: '单张牌阵',
    description: '简单直接的指引，适合日常问题或快速决策',
    cardCount: 1,
    positions: ['指引']
  },
  {
    id: 'three',
    name: '三张牌阵',
    description: '过去-现在-未来，了解事情的发展脉络',
    cardCount: 3,
    positions: ['过去', '现在', '未来']
  },
  {
    id: 'heart',
    name: '心灵探索牌阵',
    description: '探索内心世界，了解真实的自我',
    cardCount: 5,
    positions: ['现状', '挑战', '潜意识', '建议', '结果']
  },
  {
    id: 'celtic',
    name: '凯尔特十字牌阵',
    description: '最经典的塔罗牌阵，深入分析问题的各个层面',
    cardCount: 10,
    positions: [
      '现状核心',
      '挑战/助力',
      '潜意识影响',
      '过去影响',
      '可能未来',
      '近期未来',
      '你的态度',
      '环境影响',
      '希望与恐惧',
      '最终结果'
    ]
  },
  {
    id: 'relationship',
    name: '关系牌阵',
    description: '深入了解人际关系中的动态',
    cardCount: 7,
    positions: ['你的位置', '对方位置', '关系现状', '关系优势', '关系挑战', '未来发展', '建议']
  }
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = shuffleArray(allTarotCards);
  return shuffled.slice(0, count).map(card => ({
    card,
    isReversed: Math.random() > 0.5
  }));
}
