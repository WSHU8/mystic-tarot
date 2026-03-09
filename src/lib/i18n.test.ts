import { describe, expect, test } from 'bun:test';
import { resolvePreferredLocale } from '@/i18n/locale';
import { getLocaleMessages } from '@/i18n/messages';
import { majorArcana, spreadTypes } from '@/data/tarotCards';
import {
  getLocalizedCard,
  getLocalizedReadingText,
  getLocalizedSpread,
} from '@/lib/tarotLocalization';

describe('resolvePreferredLocale', () => {
  test('prefers stored locale over browser locale', () => {
    expect(
      resolvePreferredLocale({ storedLocale: 'en', browserLocale: 'zh-CN' })
    ).toBe('en');
  });

  test('uses browser locale when stored locale is invalid', () => {
    expect(
      resolvePreferredLocale({ storedLocale: 'fr', browserLocale: 'en-AU' })
    ).toBe('en');
  });

  test('falls back to chinese when nothing matches', () => {
    expect(
      resolvePreferredLocale({ storedLocale: null, browserLocale: 'ja-JP' })
    ).toBe('zh');
  });
});

describe('tarot localization helpers', () => {
  const fool = majorArcana[0];
  const singleSpread = spreadTypes[0];

  test('returns english-only spread content for the selected locale', () => {
    expect(getLocalizedSpread(singleSpread, 'en')).toEqual({
      id: 'single',
      name: 'Single Card',
      description: 'A simple and direct draw for daily guidance or quick decisions',
      cardCount: 1,
      positions: ['Guidance'],
    });
  });

  test('returns english-only card content for the selected locale', () => {
    expect(getLocalizedCard(fool, 'en')).toMatchObject({
      name: 'The Fool',
      keywords: ['New beginnings', 'Adventure', 'Innocence', 'Freedom'],
      uprightMeaning:
        'Represents a new beginning and limitless potential. You are standing at the edge of a fresh journey with courage and curiosity. This is a good moment to trust your instincts and take the leap.',
    });
  });

  test('builds a fully english reading sentence without chinese labels', () => {
    expect(
      getLocalizedReadingText(
        {
          card: fool,
          isReversed: false,
          position: 0,
          positionName: 'Guidance',
        },
        'en'
      )
    ).toBe(
      'In the Guidance position, The Fool appears upright. Represents a new beginning and limitless potential. You are standing at the edge of a fresh journey with courage and curiosity. This is a good moment to trust your instincts and take the leap.'
    );
  });
});

describe('locale messages', () => {
  test('returns english ui copy', () => {
    const messages = getLocaleMessages('en');

    expect(messages.app.title).toBe('Mystic Tarot');
    expect(messages.header.languageLabel).toBe('Language');
    expect(messages.intro.start).toBe('Begin Reading');
  });

  test('falls back to chinese ui copy', () => {
    const messages = getLocaleMessages('zh');

    expect(messages.app.title).toBe('神秘塔罗');
    expect(messages.header.languageLabel).toBe('语言');
  });
});
