import {BoardPos} from '../../../types/BoardPos';
import {
  posForDown,
  posForLeft,
  posForRight,
  posForUpLeft,
  posForUpRight,
  singlePosPaths,
} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class NinjaPiece extends Piece {
  constructor(team: Team) {
    super('Ninja', Classification.Infantry, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([posForUpLeft(pos), posForUpRight(pos)]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([posForLeft(pos), posForRight(pos), posForDown(pos)]);
  }
}
