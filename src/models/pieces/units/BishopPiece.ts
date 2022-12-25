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

export default class BishopPiece extends Piece {
  constructor(team: Team) {
    super('Bishop', team);
  }

  public getValidPositions(pos: number): BoardPos[][] {
    const [x, y] = posToCoordinates(pos);

    return [
      // Top left
      filterNulls(
        range(x).map(pos => {
          if (x - (pos + 1) < 0 || y - (pos + 1) < 0) {
            return null;
          }
          return coordinatesToPos([castX(x - (pos + 1)), castY(y - (pos + 1))]);
        }),
      ),

      // Top right
      filterNulls(
        range(3 - x).map(pos => {
          if (x + pos + 1 >= 4 || y - (pos + 1) < 0) {
            return null;
          }
          return coordinatesToPos([castX(x + pos + 1), castY(y - (pos + 1))]);
        }),
      ),

      // Bottom left
      filterNulls(
        range(x).map(pos => {
          if (x - (pos + 1) < 0 || y + pos + 1 >= 8) {
            return null;
          }
          return coordinatesToPos([castX(x - (pos + 1)), castY(y + pos + 1)]);
        }),
      ),

      // Bottom right
      filterNulls(
        range(3 - x).map(pos => {
          if (x + pos + 1 >= 4 || y + pos + 1 >= 8) {
            return null;
          }
          return coordinatesToPos([castX(x + pos + 1), castY(y + pos + 1)]);
        }),
      ),
    ];
  }
}
