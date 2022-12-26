import {Provider} from 'react-redux';
import Board from './ui/game/Board';
import {createGameStoreWithDefaultedBoard} from './state/game/gameStore';
import deserializeBoard from './utils/deserializeBoard';
import {CHESS_DEFAULT_PIECES} from './utils/devInitBoards';
import ControlPanel from './ui/game/ControlPanel';

export default function App() {
  const defaultedGameStore = createGameStoreWithDefaultedBoard(
    deserializeBoard(CHESS_DEFAULT_PIECES),
  );

  return (
    <Provider store={defaultedGameStore}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          height: '100vh',
          overflowY: 'auto',
          position: 'absolute',
          width: '100vw',
        }}>
        <div
          style={{
            height: '100%',
            position: 'relative',
            width: '100%',
          }}>
          <Board />
        </div>
        <div
          style={{
            borderLeft: '1px solid black',
            height: '100%',
            width: 400,
          }}>
          <ControlPanel />
        </div>
      </div>
    </Provider>
  );
}
