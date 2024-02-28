import {useCallback, useEffect, useState} from 'react';
import Team from '../../models/pieces/Team';
import {useGameDispatch, useGameSelector} from './gameStore';
import type {RootState} from './gameStore';
import gameSlice from './gameSlice';
import {BoardSlot} from '../../types/BoardSlot';
import {BoardPos} from '../../types/BoardPos';
import compactMap from '../../utils/compactMap';
import boardSlice from './boardSlice';

interface BoardActions {
  actionClearSelection: () => void;
  actionMovePiece: (to: BoardPos) => void;
  actionSelectPiece: (pos: BoardPos) => void;
  checkIsCaptureValid: (pos: BoardPos) => boolean;
  checkIsPosValid: (pos: BoardPos) => boolean;
}

/**
 * Provides the list of slots and its state in regard to pieces
 *
 * @returns BoardSlot[]
 */
export function useSelectSlots(): BoardSlot[] {
  return useGameSelector(
    (state: RootState): BoardSlot[] => state.boardState.slots,
  );
}

/**
 * Provides board actions to manipulate pieces
 *
 * @returns BoardActions
 */
export function useBoardActions(): BoardActions {
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
}

/**
 * Provides the team that has the current turn
 *
 * @returns Team
 */
export const useSelectCurrentTurn = (): Team => {
  return useGameSelector(
    (state: RootState): Team => state.gameState.currentTurn,
  );
};

/**
 * Provides the team that has the current turn
 *
 * @returns Team
 */
export const useSelectWinner = (): Team | null => {
  return useGameSelector(
    (state: RootState): Team | null => state.gameState.winner,
  );
};

/**
 * Provides a function used to finish the current team's turn
 *
 * @returns Team
 */
export const useFinishTurn = (): (() => void) => {
  const dispatch = useGameDispatch();

  return useCallback(
    () => dispatch(gameSlice.actions.advanceTurn()),
    [dispatch],
  );
};

/**
 * Checks for the winner of the current game and sets it
 *
 * @returns Team
 */
export const useCheckAndAssumeWinnerEffect = (): void => {
  const slots = useSelectSlots();

  const dispatch = useGameDispatch();

  useEffect(() => {
    const team1Lost = slots
      .map(slot => slot?.getTeam() === Team.One && slot?.getName() === 'King')
      .every(check => check === false);

    if (team1Lost) {
      dispatch(gameSlice.actions.setWinner(Team.Two));
    }

    const team2Lost = slots
      .map(slot => slot?.getTeam() === Team.Two && slot?.getName() === 'King')
      .every(check => check === false);

    if (team2Lost) {
      dispatch(gameSlice.actions.setWinner(Team.One));
    }
  }, [dispatch, slots]);
};
