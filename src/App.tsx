import {Provider} from 'react-redux';
import Board from './ui/game/Board';
import {createGameStoreWithDefaultedBoard} from './state/game/gameStore';
import deserializeBoard from './utils/deserializeBoard';
import {CHESS_DEFAULT_PIECES} from './utils/devInitBoards';

export default function App() {
  const defaultedGameStore = createGameStoreWithDefaultedBoard(
    deserializeBoard(CHESS_DEFAULT_PIECES),
  );

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        position: 'absolute',
        width: '100vw',
      }}>
      <Provider store={defaultedGameStore}>
        <Board />
      </Provider>
    </div>
  );
}
