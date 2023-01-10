import {BoardPos} from '../../../types/BoardPos';
import {
  downRangeMap,
  leftRangeMap,
  mergePosPaths,
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
  singlePosPaths,
  upRangeMap,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class SamuraiPiece extends Piece {
  constructor(team: Team) {
    super('Samurai', Classification.Major, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return mergePosPaths(
      singlePosPaths([posForLeft(pos), posForRight(pos), posForDown(pos)]),
      multiPosPaths([
        upRangeMap(pos, idx => posForUp(pos, idx)),
        leftRangeMap(pos, idx => posForUpLeft(pos, idx)),
        rightRangeMap(pos, idx => posForUpRight(pos, idx)),
      ]),
    );
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
