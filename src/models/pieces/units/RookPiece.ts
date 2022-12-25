import {BoardPos} from '../../../types/BoardPos';
import {
  castX,
  castY,
  coordinatesToPos,
  posToCoordinates,
} from '../../../utils/coordinates';
import filterNulls from '../../../utils/filterNulls';
import range from '../../../utils/range';
import Piece from '../Piece';
import Team from '../Team';

export default class RookPiece extends Piece {
  constructor(team: Team) {
    super('Rook', team);
  }

  public getValidPositions(pos: number): BoardPos[][] {
    const [x, y] = posToCoordinates(pos);

    return [
      // Left side
      filterNulls(
        range(x).map(pos => {
          if (x - (pos + 1) < 0) {
            return null;
          }
          return coordinatesToPos([castX(x - (pos + 1)), y]);
        }),
      ),

      // Right side
      filterNulls(
        range(3 - x).map(pos => {
          if (x + pos + 1 >= 4) {
            return null;
          }
          return coordinatesToPos([castX(x + pos + 1), y]);
        }),
      ),

      // Top
      filterNulls(
        range(y).map(pos => {
          if (y - (pos + 1) < 0) {
            return null;
          }
          return coordinatesToPos([x, castY(y - (pos + 1))]);
        }),
      ),

      // Bottom
      filterNulls(
        range(7 - y).map(pos => {
          if (y + pos + 1 >= 8) {
            return null;
          }
          return coordinatesToPos([x, castY(y + pos + 1)]);
        }),
      ),
    ];
  }
}
