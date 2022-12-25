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
import Piece from '../Piece';
import Team from '../Team';

export default class KingPiece extends Piece {
  constructor(team: Team) {
    super('King', team);
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
}
