import {BoardPos} from '../../../types/BoardPos';
import {
  downRangeMap,
  leftRangeMap,
  multiPosPaths,
  posForDown,
  posForLeft,
  posForRight,
  posForUp,
  rightRangeMap,
  upRangeMap,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class RookPiece extends Piece {
  constructor(team: Team) {
    super('Rook', Classification.Major, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return multiPosPaths([
      leftRangeMap(pos, idx => posForLeft(pos, idx)),
      rightRangeMap(pos, idx => posForRight(pos, idx)),
      upRangeMap(pos, idx => posForUp(pos, idx)),
      downRangeMap(pos, idx => posForDown(pos, idx)),
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
