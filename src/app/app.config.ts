import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage()), provideHttpClient(), 
    provideTransloco({
        config: { 
          availableLangs: ['en', 'de'],
          defaultLang: navigator.language.split('-')[0],
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
          fallbackLang: 'de',
        },
        loader: TranslocoHttpLoader
      })]
};
