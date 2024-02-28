import {useAuthSelector} from './authStore';

export function useUserId(): string | null {
  return useAuthSelector(state => state.authState.userId);
}

export function useIsPendingUserSignIn(): boolean {
  return useAuthSelector(state => state.authState.isPendingUserSignIn);
}

export function useIsUserSignedIn(): boolean {
  return useUserId() !== null;
}
