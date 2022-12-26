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

export default class KingPiece extends Piece {
  constructor(team: Team) {
    super('King', Classification.Leader, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([
      posForUpLeft(pos),
      posForUp(pos),
      posForUpRight(pos),
      posForRight(pos),
      posForDownRight(pos),
      posForDown(pos),
      posForDownLeft(pos),
      posForLeft(pos),
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
