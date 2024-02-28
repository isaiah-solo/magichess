import Button from '@mui/material/Button';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  browserLocalPersistence,
  User,
} from 'firebase/auth';
import {initFirebase} from './utils/initFirebase';
import {useEffect, useState} from 'react';

const app = initFirebase();

export default function App() {
  const auth = getAuth(app);

  const [isPendingUser, setIsPendingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const isSignedIn = user !== null;

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsPendingUser(false);
    });

    return () => unregisterAuthObserver();
  }, []);

  if (isPendingUser) {
    return <div>Loading</div>;
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: '100vh',
        position: 'relative',
        width: '100%',
      }}>
      <div
        style={{
          left: '50%',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          width: 'fit-content',
        }}>
        <h1>Magichess</h1>
        {isSignedIn ? (
          <a href="/matchmake">Matchmake</a>
        ) : (
          <Button
            onClick={async () => {
              const provider = new GoogleAuthProvider();

              await auth.setPersistence(browserLocalPersistence);
              await signInWithPopup(auth, provider);
            }}>
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
}
