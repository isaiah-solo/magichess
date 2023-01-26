import {BoardPos} from '../../../types/BoardPos';
import {castPos, singlePosPaths} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class JesterPiece extends Piece {
  constructor(team: Team) {
    super('Jester', Classification.Infantry, team);
  }

  public getValidPositions(_pos: BoardPos): BoardPos[][] {
    return singlePosPaths([castPos(Math.random() % 31)]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return this.getValidPositions(pos);
  }
}
