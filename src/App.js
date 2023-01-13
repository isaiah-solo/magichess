import Button from '@mui/material/Button';

// initializeApp(getFirebaseConfig());
// initAuth();

export default function App() {
  // const userIsLoggedIn = useAuthUser().id !== null;
  const userIsLoggedIn = true;

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
        {userIsLoggedIn ? (
          <a href="/matchmake">Matchmake</a>
        ) : (
          <Button
            onClick={async () => {
              // await signInWithPopup(getAuth(), new GoogleAuthProvider());
            }}>
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
}
