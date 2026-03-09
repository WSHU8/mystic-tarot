import { Locale } from '@/i18n/locale';
import { DrawnCard, SpreadType, TarotCard } from '@/types/tarot';

export interface LocalizedSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
}

export interface LocalizedCard {
  name: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

const spreadTranslations: Record<
  SpreadType['id'],
  { name: string; description: string; positions: string[] }
> = {
  single: {
    name: 'Single Card',
    description: 'A simple and direct draw for daily guidance or quick decisions',
    positions: ['Guidance'],
  },
  three: {
    name: 'Three Cards',
    description: 'Past, present, and future laid out to reveal the direction of events',
    positions: ['Past', 'Present', 'Future'],
  },
  heart: {
    name: 'Inner Journey',
    description: 'Explore your inner world and see your authentic self more clearly',
    positions: ['Current state', 'Challenge', 'Subconscious', 'Advice', 'Outcome'],
  },
  celtic: {
    name: 'Celtic Cross',
    description: 'The classic tarot spread for a deeper analysis of every layer of a question',
    positions: [
      'Core situation',
      'Challenge or support',
      'Subconscious influence',
      'Past influence',
      'Possible future',
      'Near future',
      'Your attitude',
      'External influence',
      'Hopes and fears',
      'Final outcome',
    ],
  },
  relationship: {
    name: 'Relationship Spread',
    description: 'Understand the deeper dynamics within an important relationship',
    positions: [
      'Your position',
      'Their position',
      'Current dynamic',
      'Strength of the bond',
      'Challenge in the bond',
      'Future development',
      'Advice',
    ],
  },
};

const majorArcanaEnglish: Record<
  number,
  Omit<LocalizedCard, 'name'>
> = {
  0: {
    keywords: ['New beginnings', 'Adventure', 'Innocence', 'Freedom'],
    uprightMeaning:
      'Represents a new beginning and limitless potential. You are standing at the edge of a fresh journey with courage and curiosity. This is a good moment to trust your instincts and take the leap.',
    reversedMeaning:
      'May point to recklessness or a refusal to take responsibility. Fear may be stopping you from stepping forward, or you may be acting without enough reflection.',
    description:
      'The Fool embodies infinite possibility and a pure beginning. Standing at the cliff without fear, this card speaks to trust in the unknown and the spirit of adventure.',
  },
  1: {
    keywords: ['Manifestation', 'Willpower', 'Skill', 'Resources'],
    uprightMeaning:
      'You already have the tools and resources needed to bring your goal to life. This is the moment to act, show your skill, and direct your creative power with confidence.',
    reversedMeaning:
      'May suggest wasted talent or manipulation. You may not be using your abilities fully, or someone may be trying to control the situation unfairly.',
    description:
      'The Magician represents the union of creativity and willpower. One hand reaches upward and one downward, channeling higher energy into practical reality.',
  },
  2: {
    keywords: ['Intuition', 'Mystery', 'Subconscious', 'Wisdom'],
    uprightMeaning:
      'Listen to the quiet voice within. The answer already lives in your subconscious, and now is a time to become still enough to hear it. Hidden knowledge is close to the surface.',
    reversedMeaning:
      'May indicate ignored intuition or secrets coming out. Logic may be drowning out your inner knowing, leaving you disconnected from deeper truth.',
    description:
      'The High Priestess guards the veil of mystery and symbolizes intuition, wisdom, and the power of the subconscious mind.',
  },
  3: {
    keywords: ['Abundance', 'Nurturing', 'Creation', 'Nature'],
    uprightMeaning:
      'This is a fertile period for growth and creation. Whether in work, love, or a creative project, something meaningful is ready to flourish. Let yourself enjoy what is blooming.',
    reversedMeaning:
      'May suggest creative depletion or overdependence. You may need more self-care, or you may be leaning too heavily on others for support and validation.',
    description:
      'The Empress carries the abundant energy of the earth mother, symbolizing creativity, nurturing, and the life-giving power of nature.',
  },
  4: {
    keywords: ['Authority', 'Structure', 'Control', 'Father energy'],
    uprightMeaning:
      'Now is the time to create order, structure, and stability. Your leadership can guide the situation forward when you approach it with reason, discipline, and clarity.',
    reversedMeaning:
      'May point to the misuse of authority or an excess of control. You may need to loosen your grip, or a lack of discipline may be weakening your foundation.',
    description:
      'The Emperor stands for authority, structure, and stability. Through reason and rules, he creates order and protects what is under his care.',
  },
  5: {
    keywords: ['Tradition', 'Belief', 'Teaching', 'Conformity'],
    uprightMeaning:
      'Traditional values, wisdom, or guidance from a mentor may help you now. This can be the right moment to learn from established systems or seek spiritual direction.',
    reversedMeaning:
      'May signal breaking with tradition or questioning authority. You may need to find your own path instead of following expectations that no longer fit.',
    description:
      'The Hierophant is a spiritual and moral teacher, representing tradition, education, and the transmission of shared beliefs and social wisdom.',
  },
  6: {
    keywords: ['Love', 'Choice', 'Harmony', 'Values'],
    uprightMeaning:
      'This card brings positive energy to love and relationships. You may face an important choice that should be made from the heart, in alignment with your true values.',
    reversedMeaning:
      'May indicate disharmony or a choice that conflicts with your values. A relationship or decision may need to be reconsidered more honestly.',
    description:
      'The Lovers brings the blessing of love and also marks an important choice point in life, asking you to listen to your heart.',
  },
  7: {
    keywords: ['Willpower', 'Victory', 'Determination', 'Control'],
    uprightMeaning:
      'Success is within reach. With focus, discipline, and determination, you can overcome obstacles and move decisively toward your goal.',
    reversedMeaning:
      'May point to a loss of direction or a lack of control. Your strategy may need adjustment, or you may be pushing too aggressively.',
    description:
      'The Chariot symbolizes victory through strength of will. The driver commands opposing forces and moves forward with purpose and control.',
  },
  8: {
    keywords: ['Courage', 'Patience', 'Inner strength', 'Compassion'],
    uprightMeaning:
      'You have the inner strength needed for this challenge. Gentle steadiness will serve you better than force. Patience and compassion are your real power here.',
    reversedMeaning:
      'May reflect self-doubt or a loss of confidence. You need to reconnect with the quiet strength already inside you.',
    description:
      'Strength speaks of courage rooted in compassion. The image of taming the lion softly reveals the wisdom of gentleness over force.',
  },
  9: {
    keywords: ['Reflection', 'Solitude', 'Wisdom', 'Guidance'],
    uprightMeaning:
      'This is a period for stepping back, reflecting, and listening inwardly. Do not rush. The wisdom you need comes from stillness and honest self-examination.',
    reversedMeaning:
      'May suggest unhealthy isolation or resistance to support. It may be time to emerge from solitude and reconnect with people who can help.',
    description:
      'The Hermit stands alone with a lantern, symbolizing introspection, wisdom, and a meaningful inner search.',
  },
  10: {
    keywords: ['Fate', 'Change', 'Cycles', 'Opportunity'],
    uprightMeaning:
      'The wheel is turning, and change is on the way. Whether pleasant or disruptive, this shift is part of a larger cycle. Stay aware and be ready to seize the opportunity.',
    reversedMeaning:
      'May point to bad timing or resistance to change. You may need to accept the movement of life rather than trying to control every outcome.',
    description:
      'The Wheel of Fortune reflects the cycles of life and the unpredictability of fate. As it turns, it brings both opportunity and challenge.',
  },
  11: {
    keywords: ['Justice', 'Truth', 'Cause and effect', 'Balance'],
    uprightMeaning:
      'Truth and fairness are central now. Your choices carry consequences, and honest, balanced action will lead to the right outcome.',
    reversedMeaning:
      'May indicate unfairness or avoidance of accountability. You may need to face the consequences of your actions or question where bias is present.',
    description:
      'Justice holds the scales of truth, representing fairness, clarity, and the law of cause and effect.',
  },
  12: {
    keywords: ['Sacrifice', 'Pause', 'New perspective', 'Release'],
    uprightMeaning:
      'This is a time to pause and wait rather than force movement. Letting go of a fixed view can open a surprising new perspective and deeper insight.',
    reversedMeaning:
      'May suggest pointless sacrifice or unhealthy delay. You may need to stop waiting and take action instead of staying suspended.',
    description:
      'The Hanged Man hangs between worlds, symbolizing surrender, perspective, and the wisdom that comes from seeing differently.',
  },
  13: {
    keywords: ['Endings', 'Transformation', 'Rebirth', 'Release'],
    uprightMeaning:
      'A chapter is ending so that something new can begin. Do not fear this transition. Releasing the past is part of the rebirth already taking shape.',
    reversedMeaning:
      'May indicate resistance to change or difficulty letting go. You may need to accept that something has truly ended before renewal can arrive.',
    description:
      'Death does not speak of physical death here, but of profound transformation. Old forms end so new life can emerge.',
  },
  14: {
    keywords: ['Balance', 'Patience', 'Harmony', 'Moderation'],
    uprightMeaning:
      'Seek balance and a steady middle path. Patience, moderation, and the ability to blend opposites will help you move forward gracefully.',
    reversedMeaning:
      'May suggest imbalance or going to extremes. Some part of life may need to be adjusted so you can return to stability.',
    description:
      'Temperance shows an angel pouring water between cups, symbolizing balance, harmony, and patient integration.',
  },
  15: {
    keywords: ['Bondage', 'Desire', 'Materialism', 'Temptation'],
    uprightMeaning:
      'You may be bound to an unhealthy pattern, desire, or relationship. Recognizing the chain is the first step toward freedom.',
    reversedMeaning:
      'May indicate breaking free or confronting your shadow directly. You are moving, or about to move, beyond a limitation that once held you.',
    description:
      'The Devil represents attachment, temptation, and the darker corners of desire. Awareness of the chain is what opens the way out.',
  },
  16: {
    keywords: ['Upheaval', 'Shock', 'Awakening', 'Collapse'],
    uprightMeaning:
      'A sudden change may disrupt your current structure. Though unsettling, this shake-up can be the awakening needed to clear what no longer stands on truth.',
    reversedMeaning:
      'May suggest disaster narrowly avoided or an inner upheaval instead of an outer one. Deep change is still underway, even if it is mostly internal.',
    description:
      'The Tower struck by lightning symbolizes sudden change and the collapse of unstable structures. Sometimes breakdown is the beginning of real rebuilding.',
  },
  17: {
    keywords: ['Hope', 'Inspiration', 'Calm', 'Healing'],
    uprightMeaning:
      'Hope lights your path again. After turbulence, a gentler period of healing, peace, and inspiration is arriving. Keep faith in what is unfolding.',
    reversedMeaning:
      'May indicate lost hope or blocked inspiration. You may need to reconnect with the inner light that still exists, even if it feels dim.',
    description:
      'The Star stands for hope, inspiration, and spiritual healing. In the dark sky, it is the light that guides the way forward.',
  },
  18: {
    keywords: ['Illusion', 'Fear', 'Subconscious', 'Confusion'],
    uprightMeaning:
      'Things may not be as clear as they seem. Pay attention to hidden truths, uncertainty, and the fears rising from the subconscious.',
    reversedMeaning:
      'May suggest clarity returning or fear being released. The fog is beginning to lift, and reality is becoming easier to see.',
    description:
      'The Moon shines with uncertain light, symbolizing illusion, fear, and the mysterious depths of the subconscious.',
  },
  19: {
    keywords: ['Joy', 'Success', 'Vitality', 'Optimism'],
    uprightMeaning:
      'This is a bright period of success, warmth, and renewed energy. Let yourself enjoy what is working and celebrate the life force returning to you.',
    reversedMeaning:
      'May indicate delayed success or a temporary cloud passing overhead. The light is still there, even if it is briefly obscured.',
    description:
      'The Sun brings warmth, clarity, and life. It represents success, joy, and the uplifting power of wholehearted vitality.',
  },
  20: {
    keywords: ['Awakening', 'Rebirth', 'Calling', 'Reflection'],
    uprightMeaning:
      'This is a moment of awakening and honest review. Listen to the deeper call within you and prepare to step into a new phase with clarity.',
    reversedMeaning:
      'May suggest self-doubt or resisting the call to change. Accepting your past may be necessary before you can fully answer what is next.',
    description:
      'Judgement sounds the call to awaken. It speaks of reflection, renewal, and the invitation to rise into a new life chapter.',
  },
  21: {
    keywords: ['Completion', 'Fulfillment', 'Achievement', 'Integration'],
    uprightMeaning:
      'A major cycle is reaching completion. You have come far, gathered wisdom, and achieved something meaningful. Take time to recognize the milestone.',
    reversedMeaning:
      'May indicate unfinished business or a lack of closure. Some final step may still be needed before the cycle can be fully completed.',
    description:
      'The World marks completion and wholeness. It symbolizes accomplishment, integration, and the full circle of a meaningful journey.',
  },
};

const minorArcanaEnglish = {
  wands: {
    suitLabel: 'Wands',
    keywords: ['Creativity', 'Action', 'Passion', 'Adventure'],
    uprightMeaning:
      'This suit speaks to creativity, passion, and action. It is a strong time to turn ideas into movement while your energy and motivation are high.',
    reversedMeaning:
      'May point to blocked energy or a loss of direction. You may need to review your goals or change the way you are taking action.',
  },
  cups: {
    suitLabel: 'Cups',
    keywords: ['Emotion', 'Intuition', 'Relationships', 'Spirituality'],
    uprightMeaning:
      'This suit reflects emotion, intuition, and the flow of relationships. It is a time to honor feeling, connection, and the wisdom of the heart.',
    reversedMeaning:
      'May suggest emotional suppression or tension in relationships. You may need to face what you feel and address what has been left unresolved.',
  },
  swords: {
    suitLabel: 'Swords',
    keywords: ['Thought', 'Truth', 'Communication', 'Challenge'],
    uprightMeaning:
      'This suit highlights clear thinking and decisive action. Logic, honesty, and mental clarity can help you move through the situation well.',
    reversedMeaning:
      'May suggest mental confusion or escalating conflict. You may need to release rigid thinking and seek a calmer way through the challenge.',
  },
  pentacles: {
    suitLabel: 'Pentacles',
    keywords: ['Wealth', 'Material life', 'Practicality', 'Health'],
    uprightMeaning:
      'This suit speaks to material progress, security, and practical results. Effort can bring tangible rewards when you stay grounded and consistent.',
    reversedMeaning:
      'May point to money concerns or overattachment to material matters. You may need to rebalance your values or your relationship with security.',
  },
} satisfies Record<NonNullable<TarotCard['suit']>, {
  suitLabel: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
}>;

const courtCardEnglish: Record<number, string> = {
  11: 'Represents the beginning of learning and exploration. Meet new opportunities with curiosity, openness, and enthusiasm.',
  12: 'Represents pursuit, motion, and brave momentum. Move toward the goal with courage, but take care not to become reckless.',
  13: 'Represents mature inner wisdom and intuitive influence. Lead with calm confidence and quiet strength.',
  14: 'Represents mastery, direction, and mature authority. You understand this realm well enough now to guide yourself and others.',
};

function getMinorArcanaEnglish(card: TarotCard): Omit<LocalizedCard, 'name'> {
  const suit = card.suit || 'wands';
  const content = minorArcanaEnglish[suit];

  if (card.number && card.number >= 11 && card.number <= 14) {
    return {
      keywords: content.keywords,
      uprightMeaning: courtCardEnglish[card.number],
      reversedMeaning:
        'May suggest immaturity in this area or a quality that is being blocked. More growth is needed before the strength of this card can be fully expressed.',
      description: `${card.nameEn} channels the ${content.suitLabel.toLowerCase()} energy of ${content.keywords.join(', ').toLowerCase()} into a more personal role or attitude.`,
    };
  }

  return {
    keywords: content.keywords,
    uprightMeaning: content.uprightMeaning,
    reversedMeaning: content.reversedMeaning,
    description: `${card.nameEn} reflects the energy of ${content.keywords.join(', ').toLowerCase()} in the current situation.`,
  };
}

export function getLocalizedSpread(spread: SpreadType, locale: Locale): LocalizedSpread {
  if (locale === 'zh') {
    return {
      id: spread.id,
      name: spread.name,
      description: spread.description,
      cardCount: spread.cardCount,
      positions: spread.positions,
    };
  }

  const translation = spreadTranslations[spread.id];

  return {
    id: spread.id,
    name: translation.name,
    description: translation.description,
    cardCount: spread.cardCount,
    positions: translation.positions,
  };
}

export function getLocalizedPositionName(
  spread: SpreadType,
  index: number,
  locale: Locale
): string {
  return getLocalizedSpread(spread, locale).positions[index] ?? (locale === 'zh' ? `位置${index + 1}` : `Position ${index + 1}`);
}

export function getLocalizedCard(card: TarotCard, locale: Locale): LocalizedCard {
  if (locale === 'zh') {
    return {
      name: card.name,
      keywords: card.keywords,
      uprightMeaning: card.uprightMeaning,
      reversedMeaning: card.reversedMeaning,
      description: card.description,
    };
  }

  const englishContent =
    card.type === 'major' ? majorArcanaEnglish[card.id] : getMinorArcanaEnglish(card);

  return {
    name: card.nameEn,
    keywords: englishContent.keywords,
    uprightMeaning: englishContent.uprightMeaning,
    reversedMeaning: englishContent.reversedMeaning,
    description: englishContent.description,
  };
}

export function getOrientationLabel(isReversed: boolean, locale: Locale): string {
  if (locale === 'zh') {
    return isReversed ? '逆位' : '正位';
  }

  return isReversed ? 'reversed' : 'upright';
}

export function getArcanaLabel(card: TarotCard, locale: Locale): string {
  if (card.type === 'major') {
    return locale === 'zh' ? '大阿卡纳' : 'Major Arcana';
  }

  const suits: Record<NonNullable<TarotCard['suit']>, { zh: string; en: string }> = {
    wands: { zh: '权杖', en: 'Wands' },
    cups: { zh: '圣杯', en: 'Cups' },
    swords: { zh: '宝剑', en: 'Swords' },
    pentacles: { zh: '钱币', en: 'Pentacles' },
  };

  return suits[card.suit || 'wands'][locale];
}

export function getLocalizedReadingText(drawnCard: DrawnCard, locale: Locale): string {
  const localizedCard = getLocalizedCard(drawnCard.card, locale);
  const meaning = drawnCard.isReversed
    ? localizedCard.reversedMeaning
    : localizedCard.uprightMeaning;

  if (locale === 'zh') {
    return `在【${drawnCard.positionName}】的位置上，${localizedCard.name}以${getOrientationLabel(
      drawnCard.isReversed,
      locale
    )}出现。${meaning}`;
  }

  return `In the ${drawnCard.positionName} position, ${localizedCard.name} appears ${getOrientationLabel(
    drawnCard.isReversed,
    locale
  )}. ${meaning}`;
}

export function getLocalizedOverallReading({
  question,
  drawnCards,
  spreadName,
  locale,
}: {
  question: string;
  drawnCards: DrawnCard[];
  spreadName: string;
  locale: Locale;
}): string {
  if (drawnCards.length === 1) {
    const localizedCard = getLocalizedCard(drawnCards[0].card, locale);
    return drawnCards[0].isReversed ? localizedCard.reversedMeaning : localizedCard.uprightMeaning;
  }

  const localizedCards = drawnCards.map((drawnCard) => ({
    ...drawnCard,
    localizedCard: getLocalizedCard(drawnCard.card, locale),
  }));
  const themes = localizedCards.flatMap((entry) => entry.localizedCard.keywords).slice(0, 6);
  const majorCards = localizedCards.filter((entry) => entry.card.type === 'major');
  const reversedCount = localizedCards.filter((entry) => entry.isReversed).length;

  if (locale === 'zh') {
    let reading = `针对你关于"${question}"的问题，这次${spreadName}占卜显示：`;

    if (majorCards.length > 0) {
      reading += `出现了${majorCards.length}张大阿卡纳牌，暗示着重要的命运转折。`;
    }

    if (reversedCount > drawnCards.length / 2) {
      reading += '多张牌呈现逆位，提示你需要关注潜在的阻碍和内在的挑战。';
    } else if (reversedCount === 0) {
      reading += '所有牌都呈现正位，能量流动顺畅，是积极发展的信号。';
    }

    reading += `整个牌阵围绕的主题是：${themes.slice(0, 3).join('、')}。`;
    return reading;
  }

  let reading = `For your question "${question}", this ${spreadName} reading shows: `;

  if (majorCards.length > 0) {
    reading += `${majorCards.length} Major Arcana card${majorCards.length > 1 ? 's' : ''} appear, pointing to an important turning point in your path. `;
  }

  if (reversedCount > drawnCards.length / 2) {
    reading += 'Several cards appear reversed, suggesting inner resistance or hidden obstacles that deserve attention. ';
  } else if (reversedCount === 0) {
    reading += 'Every card appears upright, which suggests a smooth flow of energy and a constructive direction. ';
  }

  reading += `The strongest themes moving through this spread are ${themes.slice(0, 3).join(', ')}.`;
  return reading;
}
