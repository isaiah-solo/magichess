import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useCallback, useState} from 'react';
import {BoardPos} from '../../types/BoardPos';
import {BoardSlot} from '../../types/BoardSlot';
import compactMap from '../../utils/compactMap';
import range from '../../utils/range';
import {useGameDispatch, useGameSelector} from './gameHooks';
import type {RootState} from './gameStore';

interface BoardState {
  slots: BoardSlot[];
}

interface BoardActions {
  actionClearSelection: () => void;
  actionMovePiece: (to: BoardPos) => void;
  actionSelectPiece: (pos: BoardPos) => void;
  checkIsCaptureValid: (pos: BoardPos) => boolean;
  checkIsPosValid: (pos: BoardPos) => boolean;
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
      action: PayloadAction<{from: BoardPos; to: BoardPos}>,
    ) => {
      const piece = state.slots[action.payload.from];

      state.slots[action.payload.from] = null;
      state.slots[action.payload.to] = piece;
    },
  },
});

/**
 * Provides the list of slots and its state in regard to pieces
 *
 * @returns BoardSlot[]
 */
export const useSelectSlots = (): BoardSlot[] => {
  return useGameSelector(
    (state: RootState): BoardSlot[] => state.boardState.slots,
  );
};

/**
 * Provides board actions to manipulate pieces
 *
 * @returns BoardActions
 */
export const useBoardActions = (): BoardActions => {
  const [focusedPiecePos, setFocusedPiecePos] = useState<BoardPos | null>(null);
  const [validPositions, setValidPositions] = useState<{
    [pos: number]: boolean;
  }>([]);
  const [validCaptures, setValidCaptures] = useState<{
    [pos: number]: boolean;
  }>([]);

  const slots = useSelectSlots();
  const dispatch = useGameDispatch();

  const actionClearSelection = useCallback((): void => {
    setFocusedPiecePos(null);
    setValidPositions([]);
    setValidCaptures([]);
  }, [setFocusedPiecePos, setValidPositions]);

  const actionSelectPiece = useCallback(
    (pos: BoardPos): void => {
      const piece = slots[pos] ?? null;

      if (piece === null) {
        return;
      }

      setFocusedPiecePos(pos);

      const boardValidPositions = piece.getValidPositions(pos);
      const boardValidCaptures = piece.getValidCaptures(pos);

      setValidPositions(
        compactMap(boardValidPositions, validPositionArr => {
          let result: BoardPos[] = [];

          for (const validPos of validPositionArr) {
            if (slots[validPos] !== null) {
              return result;
            }

            result = [...result, validPos];
          }

          return result;
        })
          .flatMap(x => x)
          .reduce((acc, pos) => ({...acc, [pos]: true}), {}),
      );

      setValidCaptures(
        compactMap(boardValidCaptures, validCaptureArr => {
          for (const validPos of validCaptureArr) {
            const pieceAtPos = slots[validPos];

            if (pieceAtPos === null) {
              continue;
            }

            if (!piece.isPieceOnOppositeTeam(pieceAtPos)) {
              return [];
            }

            return [validPos];
          }

          return [];
        })
          .flatMap(x => x)
          .reduce((acc, pos) => ({...acc, [pos]: true}), {}),
      );
    },
    [setFocusedPiecePos, setValidPositions, slots],
  );

  const actionMovePiece = useCallback(
    (to: BoardPos): void => {
      actionClearSelection();

      if (focusedPiecePos === null) {
        return;
      }

      dispatch(boardSlice.actions.movePiece({from: focusedPiecePos, to}));
    },
    [actionClearSelection, dispatch, focusedPiecePos],
  );

  const checkIsPosValid = useCallback(
    (pos: BoardPos): boolean => validPositions.hasOwnProperty(pos),
    [validPositions],
  );

  const checkIsCaptureValid = useCallback(
    (pos: BoardPos): boolean => validCaptures.hasOwnProperty(pos),
    [validCaptures],
  );

  return {
    actionClearSelection,
    actionMovePiece,
    actionSelectPiece,
    checkIsCaptureValid,
    checkIsPosValid,
  };
};

export default boardSlice.reducer;
