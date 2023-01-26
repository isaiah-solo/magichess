import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useCallback, useEffect} from 'react';
import Team from '../../models/pieces/Team';
import {useSelectSlots} from './boardSlice';
import {useGameDispatch, useGameSelector} from './gameHooks';
import type {RootState} from './gameStore';

interface GameState {
  currentTurn: Team;
  winner: Team | null;
}

const initialState: GameState = {
  currentTurn: Team.Two,
  winner: null,
};

function toggleTeam(team: Team): Team {
  switch (team) {
    case Team.One:
      return Team.Two;
    case Team.Two:
      return Team.One;
  }
}

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    advanceTurn: state => {
      const currentTurn = state.currentTurn;
      state.currentTurn = toggleTeam(currentTurn);
    },
    setWinner: (state, action: PayloadAction<Team>) => {
      state.winner = action.payload;
    },
  },
});

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

export default gameSlice.reducer;
