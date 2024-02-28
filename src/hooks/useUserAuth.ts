import {Auth, User} from 'firebase/auth';
import {useEffect, useState} from 'react';

export interface UserAuthRet {
  isPendingUserSignIn: boolean;
  isUserSignedIn: boolean;
  user: User;
}

export default function useUserAuth(auth: Auth) {
  const [isPendingUserSignIn, setIsPendingUserSignIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const isUserSignedIn = user !== null;

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUser(user);
      setIsPendingUserSignIn(false);
    });
  }, []);

  return {isPendingUserSignIn, isUserSignedIn, user};
}
