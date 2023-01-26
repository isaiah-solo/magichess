import {BoardPos} from '../../../types/BoardPos';
import {
  downRangeMap,
  leftRangeMap,
  multiPosPaths,
  posForDown,
  posForDownLeft,
  posForDownRight,
  posForLeft,
  posForRight,
  posForUp,
  posForUpLeft,
  posForUpRight,
  rightRangeMap,
  upRangeMap,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class QueenPiece extends Piece {
  constructor(team: Team) {
    super('Queen', Classification.Hero, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return multiPosPaths([
      leftRangeMap(pos, idx => posForLeft(pos, idx)),
      rightRangeMap(pos, idx => posForRight(pos, idx)),
      upRangeMap(pos, idx => posForUp(pos, idx)),
      downRangeMap(pos, idx => posForDown(pos, idx)),
      leftRangeMap(pos, idx => posForUpLeft(pos, idx)),
      rightRangeMap(pos, idx => posForUpRight(pos, idx)),
      leftRangeMap(pos, idx => posForDownRight(pos, idx)),
      rightRangeMap(pos, idx => posForDownLeft(pos, idx)),
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
