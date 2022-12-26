import {BoardPos} from '../../../types/BoardPos';
import {
  leftRangeMap,
  posForDownLeft,
  posForDownRight,
  posForUpLeft,
  posForUpRight,
  rightRangeMap,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class BishopPiece extends Piece {
  constructor(team: Team) {
    super('Bishop', Classification.Minor, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return [
      leftRangeMap(pos, idx => posForUpLeft(pos, idx)),
      rightRangeMap(pos, idx => posForUpRight(pos, idx)),
      leftRangeMap(pos, idx => posForDownRight(pos, idx)),
      rightRangeMap(pos, idx => posForDownLeft(pos, idx)),
    ];
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
