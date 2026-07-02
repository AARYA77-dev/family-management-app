import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getAuth,provideAuth } from '@angular/fire/auth';
import { getFirestore,provideFirestore } from '@angular/fire/firestore';
import { getStorage,provideStorage } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ]
};
