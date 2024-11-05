import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';

import en from '../../../../public/assets/i18n/en.json';
import de from '../../../../public/assets/i18n/de.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, de },
    translocoConfig: {
      availableLangs: ['en', 'de'],
      defaultLang: 'de',
    },
    preloadLangs: true,
    ...options,
  });
}
