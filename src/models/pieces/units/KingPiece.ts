import {BoardPos} from '../../../types/BoardPos';
import {
  castX,
  castY,
  coordinatesToPos,
  posToCoordinates,
} from '../../../utils/coordinates';
import filterNulls from '../../../utils/filterNulls';
import Piece from '../Piece';
import Team from '../Team';

export default class KingPiece extends Piece {
  constructor(team: Team) {
    super('King', team);
  }

  public getValidPositions(pos: number): BoardPos[][] {
    const [x, y] = posToCoordinates(pos);

    const positions = filterNulls([
      // Left side
      x - 1 < 0 ? null : coordinatesToPos([castX(x - 1), y]),

      // Right side
      x + 1 >= 4 ? null : coordinatesToPos([castX(x + 1), y]),

      // Top
      y - 1 < 0 ? null : coordinatesToPos([x, castY(y - 1)]),

      // Bottom
      y + 1 >= 8 ? null : coordinatesToPos([x, castY(y + 1)]),

      // Top left
      x - 1 < 0 || y - 1 < 0
        ? null
        : coordinatesToPos([castX(x - 1), castY(y - 1)]),

      // Top right
      x + 1 >= 4 || y - 1 < 0
        ? null
        : coordinatesToPos([castX(x + 1), castY(y - 1)]),

      // Bottom left
      x - 1 < 0 || y + 1 >= 8
        ? null
        : coordinatesToPos([castX(x - 1), castY(y + 1)]),

      // Bottom right
      x + 1 >= 4 || y + 1 >= 8
        ? null
        : coordinatesToPos([castX(x + 1), castY(y + 1)]),
    ]);

    return positions.map(pos => [pos]);
  }
}
