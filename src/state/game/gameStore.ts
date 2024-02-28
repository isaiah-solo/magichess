import {configureStore} from '@reduxjs/toolkit';
import Piece from '../../models/pieces/Piece';
import boardSlice from './boardSlice';
import gameSlice from './gameSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export type RootState = ReturnType<typeof gameStore.getState>;

export const useGameDispatch: () => typeof gameStore.dispatch = useDispatch;
export const useGameSelector: TypedUseSelectorHook<RootState> = useSelector;

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
