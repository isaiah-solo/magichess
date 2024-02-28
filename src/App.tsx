import {getAuth} from 'firebase/auth';
import {initFirebase} from './utils/initFirebase';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './pages/login';
import {useIsPendingUserSignIn} from './state/auth/authHooks';
import Home from './pages/home';
import {useAuthDispatch} from './state/auth/authStore';
import {useEffect} from 'react';
import {getApp} from 'firebase/app';
import authSlice from './state/auth/authSlice';
import Game from './pages/game';

initFirebase();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/game/:gameId',
    element: <Game />,
  },
]);

export default function App() {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    return getAuth(getApp()).onAuthStateChanged(user => {
      if (user === null) {
        return;
      }

      dispatch(authSlice.actions.authenticateUser({userId: user.uid}));
    });
  }, [dispatch]);

  const isPendingUserSignIn = useIsPendingUserSignIn();

  if (isPendingUserSignIn) {
    return <div>Loading</div>;
  }

  return <RouterProvider router={router} />;
}
