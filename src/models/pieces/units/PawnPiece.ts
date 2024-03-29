import {BoardPos} from '../../../types/BoardPos';
import compactMap from '../../../utils/compactMap';
import {
  multiPosPaths,
  posForDown,
  posForDownLeft,
  posForDownRight,
  posForUp,
  posForUpLeft,
  posForUpRight,
  posToCoordinates,
  singlePosPaths,
} from '../../../utils/coordinates';
import range from '../../../utils/range';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class PawnPiece extends Piece {
  constructor(team: Team) {
    super('Pawn', Classification.Infantry, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    const y = posToCoordinates(pos)[1];

    return multiPosPaths([
      this.getTeam() === Team.Two
        ? compactMap(range(y === 6 ? 2 : 1), idx => posForUp(pos, idx))
        : [],

      this.getTeam() === Team.One
        ? compactMap(range(y === 1 ? 2 : 1), idx => posForDown(pos, idx))
        : [],
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([
      this.getTeam() === Team.Two ? posForUpLeft(pos) : null,
      this.getTeam() === Team.Two ? posForUpRight(pos) : null,

      this.getTeam() === Team.One ? posForDownLeft(pos) : null,
      this.getTeam() === Team.One ? posForDownRight(pos) : null,
    ]);
  }
}
