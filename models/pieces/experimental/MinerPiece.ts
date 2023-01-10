import {BoardPos} from '../../../types/BoardPos';
import {posForUp, singlePosPaths} from '../../../utils/coordinates';
import Classification from '../Classification';
import Piece from '../Piece';
import Team from '../Team';

export default class MinerPiece extends Piece {
  constructor(team: Team) {
    super('Miner', Classification.Infantry, team);
  }

  public getValidPositions(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([posForUp(pos)]);
  }

  public getValidCaptures(pos: BoardPos): BoardPos[][] {
    return singlePosPaths([posForUp(pos, 1)]);
  }
}
