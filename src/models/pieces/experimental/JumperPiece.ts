import {BoardPos} from '../../../types/BoardPos';
import {
  posForDown,
  posForDownLeft,
  posForDownRight,
  posForLeft,
  posForRight,
  posForUp,
  posForUpLeft,
  posForUpRight,
  singlePosPaths,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class JumperPiece extends Piece {
  constructor(team: Team) {
    super('Jumper', Classification.Minor, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([
      posForUpLeft(pos, 1),
      posForUp(pos, 1),
      posForUpRight(pos, 1),
      posForRight(pos, 1),
      posForDownRight(pos, 1),
      posForDown(pos, 1),
      posForDownLeft(pos, 1),
      posForLeft(pos, 1),
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
