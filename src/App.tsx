import Button from '@mui/material/Button';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {initFirebase} from './utils/initFirebase';

const app = initFirebase();

export default function App() {
  // const userIsLoggedIn = useAuthUser().id !== null;
  const userIsLoggedIn = false;

  const auth = getAuth(app);

  console.log(auth.currentUser);

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
              const provider = new GoogleAuthProvider();

              const result = await signInWithPopup(auth, provider);

              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);

              const token = credential?.accessToken;

              // The signed-in user info.
              const user = result.user;

              console.log(user);
            }}>
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
}
