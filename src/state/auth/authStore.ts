import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export type RootState = ReturnType<typeof authStore.getState>;

export const useAuthDispatch: () => typeof authStore.dispatch = useDispatch;
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;

export const authStore = configureStore({
  reducer: {
    authState: authSlice.reducer,
  },
});
