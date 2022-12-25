import {useCallback} from 'react';
import {useMemo, useState} from 'react';
import {movePiece, selectSlots} from '../../state/game/boardSlice';
import {useGameDispatch, useGameSelector} from '../../state/game/gameHooks';
import {BoardPos} from '../../types/BoardPos';
import {boardRangeMap} from '../../utils/coordinates';
import PieceModel from '../../models/pieces/Piece';
import Piece from './Piece';
import PossibleMoveDot from './PossibleMoveDot';
import Tile, {Color} from './Tile';
import TileContent from './TileContent';

export default function Board() {
  const [focusedPiecePos, setFocusedPiecePos] = useState<BoardPos | null>(null);
  const [validPositions, setValidPositions] = useState<BoardPos[][]>([]);
  const [validCaptures, setValidCaptures] = useState<BoardPos[][]>([]);

  const pieces = useGameSelector(selectSlots);
  const dispatch = useGameDispatch();

  const clearSelectionState = useCallback(() => {
    setFocusedPiecePos(null);
    setValidPositions([]);
    setValidCaptures([]);
  }, [setFocusedPiecePos, setValidPositions]);

  const setFocusOnPiece = useCallback(
    (pos: BoardPos, piece: PieceModel) => {
      setFocusedPiecePos(pos);
      setValidPositions(piece.getValidPositions(pos));
      setValidCaptures(piece.getValidCaptures(pos));
    },
    [setFocusedPiecePos, setValidPositions],
  );

  const dispatchMovePiece = useCallback(
    (to: BoardPos) => {
      if (focusedPiecePos === null) {
        clearSelectionState();
        return;
      }

      dispatch(movePiece({from: focusedPiecePos, to}));
      clearSelectionState();
    },
    [clearSelectionState, dispatch, focusedPiecePos],
  );

  const tiles = useMemo(
    () =>
      boardRangeMap(pos => {
        const row = Math.floor(pos / 4);
        const colorPos = row % 2 === 0 ? pos + 1 : pos;

        const piece = pieces[pos] ?? null;

        if (pos === 5 || pos === 7) {
          console.log(validCaptures);
        }

        const posIsValidMove = validPositions
          .map(validPositionArr => {
            for (const validPos of validPositionArr) {
              if (pieces[validPos] !== null) {
                return false;
              }

              if (validPos === pos) {
                return true;
              }
            }

            return false;
          })
          .reduce((acc, result) => acc || result, false);

        const posIsValidCapture = validCaptures
          .map(validPositionArr => {
            for (const validPos of validPositionArr) {
              if (pieces[validPos] === null || validPos !== pos) {
                continue;
              }

              return true;
            }

            return false;
          })
          .reduce((acc, result) => acc || result, false);

        return (
          <Tile
            color={colorPos % 2 === 0 ? Color.Positive : Color.Negative}
            key={pos}>
            {posIsValidMove && piece === null && (
              <TileContent>
                <PossibleMoveDot
                  onClick={() => {
                    clearSelectionState();
                    dispatchMovePiece(pos);
                  }}
                />
              </TileContent>
            )}
            {piece !== null && (
              <TileContent>
                <Piece
                  isHighlighted={posIsValidCapture}
                  onClick={() => {
                    if (posIsValidCapture) {
                      dispatchMovePiece(pos);
                      return;
                    }

                    setFocusOnPiece(pos, piece);
                  }}
                  piece={piece}
                />
              </TileContent>
            )}
          </Tile>
        );
      }),
    [
      clearSelectionState,
      dispatchMovePiece,
      pieces,
      validPositions,
      setFocusOnPiece,
    ],
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
      {tiles}
    </div>
  );
}
