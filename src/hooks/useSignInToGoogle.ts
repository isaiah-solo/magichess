import {getApp} from 'firebase/app';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import {useCallback} from 'react';

export default function useSignInToGoogle(
  onComplete: () => void,
): () => Promise<void> {
  const auth = getAuth(getApp());

  return useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await auth.setPersistence(browserLocalPersistence);
    await signInWithPopup(auth, provider);

    onComplete();
  }, []);
}
