import {configureStore} from '@reduxjs/toolkit';
import Piece from '../../models/pieces/Piece';
import {boardSlice} from './boardSlice';
import {gameSlice} from './gameSlice';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof gameStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type GameDispatch = typeof gameStore.dispatch;

export const gameStore = configureStore({
  reducer: {
    boardState: boardSlice.reducer,
    gameState: gameSlice.reducer,
  },
});

export const createGameStoreWithDefaultedBoard = (slots: (Piece | null)[]) => {
  return configureStore({
    preloadedState: {boardState: {slots}},
    reducer: {
      boardState: boardSlice.reducer,
      gameState: gameSlice.reducer,
    },
  });
};
