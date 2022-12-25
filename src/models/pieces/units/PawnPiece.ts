import {BoardPos} from '../../../types/BoardPos';
import {
  castY,
  coordinatesToPos,
  posToCoordinates,
} from '../../../utils/coordinates';
import filterNulls from '../../../utils/filterNulls';
import range from '../../../utils/range';
import Piece from '../Piece';
import Team from '../Team';

export default class PawnPiece extends Piece {
  constructor(team: Team) {
    super('Pawn', team);
  }

  public getValidPositions(pos: number): BoardPos[][] {
    const [x, y] = posToCoordinates(pos);

    return [
      filterNulls(
        this.getTeam() === Team.Two
          ? range(y === 6 ? 2 : 1).map(pos => {
              if (y - (pos + 1) < 0) {
                return null;
              }
              return coordinatesToPos([x, castY(y - (pos + 1))]);
            })
          : [],
      ),

      filterNulls(
        this.getTeam() === Team.One
          ? range(y === 1 ? 2 : 1).map(pos => {
              if (y + pos + 1 >= 8) {
                return null;
              }
              return coordinatesToPos([x, castY(y + pos + 1)]);
            })
          : [],
      ),
    ];
  }
}
