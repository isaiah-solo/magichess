import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Team from '../../models/pieces/Team';

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

const gameSlice = createSlice({
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

export default gameSlice;
