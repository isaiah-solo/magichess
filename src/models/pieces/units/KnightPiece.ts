import {BoardPos} from '../../../types/BoardPos';
import {posForOffset, singlePosPaths} from '../../../utils/coordinates';
import Piece from '../Piece';
import Team from '../Team';

export default class KnightPiece extends Piece {
  constructor(team: Team) {
    super('Knight', team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([
      posForOffset(pos, [-1, -2]),
      posForOffset(pos, [-2, -1]),
      posForOffset(pos, [-1, 2]),
      posForOffset(pos, [-2, 1]),
      posForOffset(pos, [1, -2]),
      posForOffset(pos, [2, -1]),
      posForOffset(pos, [1, 2]),
      posForOffset(pos, [2, 1]),
    ]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
