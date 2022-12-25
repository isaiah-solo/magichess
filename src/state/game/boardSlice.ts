import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardPos} from '../../types/BoardPos';
import {BoardSlot} from '../../types/BoardSlot';
import {NumberRange} from '../../types/NumberRange';
import range from '../../utils/range';
import type {RootState} from './gameStore';

interface BoardState {
  slots: BoardSlot[];
}

const initialState: BoardState = {
  slots: range(32).map(_el => null),
};

export const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    movePiece: (
      state,
      action: PayloadAction<{from: BoardPos; to: NumberRange<0, 32>}>,
    ) => {
      const piece = state.slots[action.payload.from];

      state.slots[action.payload.from] = null;
      state.slots[action.payload.to] = piece;
    },
  },
});

export const {movePiece} = boardSlice.actions;

export const selectSlots = (state: RootState): BoardSlot[] =>
  state.boardState.slots;

export default boardSlice.reducer;
