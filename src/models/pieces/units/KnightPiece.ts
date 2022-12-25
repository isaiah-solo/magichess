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

export default class KnightPiece extends Piece {
  constructor(team: Team) {
    super('Knight', team);
  }

  public getValidPositions(pos: number): BoardPos[][] {
    const [x, y] = posToCoordinates(pos);

    const positions = filterNulls([
      x - 1 < 0 || y - 2 < 0
        ? null
        : coordinatesToPos([castX(x - 1), castY(y - 2)]),

      x - 2 < 0 || y - 1 < 0
        ? null
        : coordinatesToPos([castX(x - 2), castY(y - 1)]),

      x - 1 < 0 || y + 2 >= 8
        ? null
        : coordinatesToPos([castX(x - 1), castY(y + 2)]),

      x - 2 < 0 || y + 1 >= 8
        ? null
        : coordinatesToPos([castX(x - 2), castY(y + 1)]),

      x + 1 >= 4 || y - 2 < 0
        ? null
        : coordinatesToPos([castX(x + 1), castY(y - 2)]),

      x + 2 >= 4 || y - 1 < 0
        ? null
        : coordinatesToPos([castX(x + 2), castY(y - 1)]),

      x + 1 >= 4 || y + 2 >= 8
        ? null
        : coordinatesToPos([castX(x + 1), castY(y + 2)]),

      x + 2 >= 4 || y + 1 >= 8
        ? null
        : coordinatesToPos([castX(x + 2), castY(y + 1)]),
    ]);

    return positions.map(pos => [pos]);
  }
}
