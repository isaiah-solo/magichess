import {useBoardActions, useSelectSlots} from '../../state/game/boardSlice';
import {boardRangeMap} from '../../utils/coordinates';
import Piece from './Piece';
import PossibleMoveDot from './PossibleMoveDot';
import Tile from './Tile';
import TileContent from './TileContent';
import getTileColorForPos from '../../utils/getTileColorForPos';
import {
  useCheckAndAssumeWinnerEffect,
  useFinishTurn,
  useSelectCurrentTurn,
  useSelectWinner,
} from '../../state/game/gameSlice';

export default function Board() {
  const slots = useSelectSlots();

  const {
    actionMovePiece,
    actionSelectPiece,
    checkIsCaptureValid,
    checkIsPosValid,
  } = useBoardActions();

  const currentTurn = useSelectCurrentTurn();
  const winner = useSelectWinner();
  const finishTurn = useFinishTurn();

  useCheckAndAssumeWinnerEffect();

  return (
    <div
      style={{
        border: '1px solid #191919',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        height: 640,
        left: '50%',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        width: 320,
      }}>
      {boardRangeMap(pos => {
        const piece = slots[pos] ?? null;

        return (
          <Tile color={getTileColorForPos(pos)} key={pos}>
            {checkIsPosValid(pos) && piece === null && (
              <TileContent>
                <PossibleMoveDot
                  onClick={() => {
                    actionMovePiece(pos);
                    finishTurn();
                  }}
                />
              </TileContent>
            )}
            {piece !== null && (
              <TileContent>
                <Piece
                  isHighlighted={checkIsCaptureValid(pos)}
                  onClick={() => {
                    if (checkIsCaptureValid(pos)) {
                      actionMovePiece(pos);
                      finishTurn();
                      return;
                    }

                    if (piece.getTeam() !== currentTurn || winner !== null) {
                      return;
                    }

                    actionSelectPiece(pos);
                  }}
                  piece={piece}
                />
              </TileContent>
            )}
          </Tile>
        );
      })}
    </div>
  );
}
