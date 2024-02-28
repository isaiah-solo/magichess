import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isPendingUserSignIn: boolean;
  isUserSignedIn: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isPendingUserSignIn: true,
  isUserSignedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    authenticateUser: (state, action: PayloadAction<{userId: string}>) => {
      state.isPendingUserSignIn = false;
      state.isUserSignedIn = true;
      state.userId = action.payload.userId;
    },
  },
});

export default authSlice;
