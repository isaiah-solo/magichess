import {Provider} from 'react-redux';
import Board from '../../ui/game/Board';
import {createGameStoreWithDefaultedBoard} from '../../state/game/gameStore';
import deserializeBoard from '../../utils/deserializeBoard';
import {CHESS_DEFAULT_PIECES} from '../../utils/devInitBoards';
import ControlPanel from '../../ui/game/ControlPanel';
import {useRouter} from 'next/router';

export default function Game() {
  const router = useRouter();
  const {sessionID: _sessionID} = router.query;

  const defaultedGameStore = createGameStoreWithDefaultedBoard(
    deserializeBoard(CHESS_DEFAULT_PIECES),
  );

  return (
    <Provider store={defaultedGameStore}>
      <div
        style={{
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          height: '100vh',
          overflowY: 'auto',
          position: 'absolute',
          width: '100vw',
        }}>
        <div
          style={{
            boxSizing: 'border-box',
            height: '100%',
            position: 'relative',
            width: '100%',
          }}>
          <Board />
        </div>
        <div
          style={{
            borderLeft: '1px solid black',
            boxSizing: 'border-box',
            height: '100%',
            width: 400,
          }}>
          <ControlPanel />
        </div>
      </div>
    </Provider>
  );
}
