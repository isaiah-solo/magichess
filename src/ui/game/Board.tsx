import {useMemo, useState} from 'react';
import PieceModel from '../../models/pieces/Piece';
import {movePiece, selectSlots} from '../../state/game/boardSlice';
import {useGameDispatch, useGameSelector} from '../../state/game/gameHooks';
import {BoardPos} from '../../types/BoardPos';
import {NumberRange} from '../../types/NumberRange';
import range from '../../utils/range';
import Piece from './Piece';
import PossibleMoveDot from './PossibleMoveDot';
import Tile, {Color} from './Tile';

export default function Board() {
  const [focusedPiecePos, setFocusedPiecePos] = useState<NumberRange<
    0,
    32
  > | null>(null);
  const [validPositions, setValidPositions] = useState<BoardPos[][]>([]);

  const pieces = useGameSelector(selectSlots);
  const dispatch = useGameDispatch();

  const tiles = useMemo(
    () =>
      range(32).map(pos => {
        const row = Math.floor(pos / 4);
        const colorPos = row % 2 === 0 ? pos + 1 : pos;

        const piece = pieces[pos] ?? null;

        const posIsValid = validPositions
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

        if (posIsValid) {
          return (
            <Tile
              color={colorPos % 2 === 0 ? Color.Positive : Color.Negative}
              key={pos}
              onClick={() => {
                setFocusedPiecePos(null);
                setValidPositions([]);

                if (focusedPiecePos === null) {
                  return;
                }

                dispatch(movePiece({from: focusedPiecePos, to: pos}));
              }}>
              <PossibleMoveDot />
            </Tile>
          );
        }

        return (
          <Tile
            color={colorPos % 2 === 0 ? Color.Positive : Color.Negative}
            key={pos}>
            {piece !== null && (
              <Piece
                onClick={() => {
                  setFocusedPiecePos(pos);
                  setValidPositions(piece.getValidPositions(pos));
                }}
                team={piece.getTeam()}>
                {piece.getName()}
              </Piece>
            )}
          </Tile>
        );
      }),
    [pieces, validPositions],
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
