import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardPos} from '../../types/BoardPos';
import {BoardSlot} from '../../types/BoardSlot';
import range from '../../utils/range';

interface BoardState {
  slots: BoardSlot[];
}

const initialState: BoardState = {
  slots: range(32).map(_el => null),
};

const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    movePiece: (
      state,
      action: PayloadAction<{from: BoardPos; to: BoardPos}>,
    ) => {
      const piece = state.slots[action.payload.from];

      state.slots[action.payload.from] = null;
      state.slots[action.payload.to] = piece;
    },
  },
});

export default boardSlice;
