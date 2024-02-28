import Button from '@mui/material/Button';
import useSignInToGoogle from '../hooks/useSignInToGoogle';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const signInToGoogle = useSignInToGoogle(() => navigate('/'));

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
        <Button onClick={signInToGoogle}>Login with Google</Button>
      </div>
    </div>
  );
}
