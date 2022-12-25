import {BoardPos} from '../../../types/BoardPos';
import compactMap from '../../../utils/compactMap';
import {
  multiPosPaths,
  posForDown,
  posForUp,
  posToCoordinates,
} from '../../../utils/coordinates';
import range from '../../../utils/range';
import Piece from '../Piece';
import Team from '../Team';

export default class PawnPiece extends Piece {
  constructor(team: Team) {
    super('Pawn', team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    const [_x, y] = posToCoordinates(pos);

    return multiPosPaths([
      this.getTeam() === Team.Two
        ? compactMap(range(y === 6 ? 2 : 1), idx => posForUp(pos, idx))
        : [],

      this.getTeam() === Team.One
        ? compactMap(range(y === 1 ? 2 : 1), idx => posForDown(pos, idx))
        : [],
    ]);
  }
}
