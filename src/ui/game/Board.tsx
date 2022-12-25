import {useCallback} from 'react';
import {useState} from 'react';
import {movePiece, selectSlots} from '../../state/game/boardSlice';
import {useGameDispatch, useGameSelector} from '../../state/game/gameHooks';
import {BoardPos} from '../../types/BoardPos';
import {boardRangeMap} from '../../utils/coordinates';
import Piece from './Piece';
import PossibleMoveDot from './PossibleMoveDot';
import Tile from './Tile';
import TileContent from './TileContent';
import compactMap from '../../utils/compactMap';
import getTileColorForPos from '../../utils/getTileColorForPos';

export default function Board() {
  const [focusedPiecePos, setFocusedPiecePos] = useState<BoardPos | null>(null);
  const [validPositions, setValidPositions] = useState<{
    [pos: number]: boolean;
  }>([]);
  const [validCaptures, setValidCaptures] = useState<{
    [pos: number]: boolean;
  }>([]);

  const slots = useGameSelector(selectSlots);
  const dispatch = useGameDispatch();

  const clearSelectionState = useCallback(() => {
    setFocusedPiecePos(null);
    setValidPositions([]);
    setValidCaptures([]);
  }, [setFocusedPiecePos, setValidPositions]);

  const setSelectionOnPiece = useCallback(
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

  const dispatchMovePiece = useCallback(
    (to: BoardPos): void => {
      clearSelectionState();

      if (focusedPiecePos === null) {
        return;
      }

      dispatch(movePiece({from: focusedPiecePos, to}));
    },
    [clearSelectionState, dispatch, focusedPiecePos],
  );

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

        const posIsValidMove = validPositions.hasOwnProperty(pos);
        const posIsValidCapture = validCaptures.hasOwnProperty(pos);

        return (
          <Tile color={getTileColorForPos(pos)} key={pos}>
            {posIsValidMove && piece === null && (
              <TileContent>
                <PossibleMoveDot onClick={() => dispatchMovePiece(pos)} />
              </TileContent>
            )}
            {piece !== null && (
              <TileContent>
                <Piece
                  isHighlighted={posIsValidCapture}
                  onClick={() =>
                    posIsValidCapture
                      ? dispatchMovePiece(pos)
                      : setSelectionOnPiece(pos)
                  }
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
