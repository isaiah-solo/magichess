import {init} from 'next-firebase-auth';

const isDev = process.env.NODE_ENV !== 'production';
const twelveDays = 12 * 60 * 60 * 24 * 1000;

export function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
}

export function initAuth() {
  init({
    appPageURL: '/',
    authPageURL: '/login',
    debug: false,
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    firebaseAdminInitConfig: {
      credential: {
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    },
    firebaseClientInitConfig: getFirebaseConfig(),
    cookies: {
      name: 'ShelfShare',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: twelveDays,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: !isDev,
      signed: true,
    },
  });
}
