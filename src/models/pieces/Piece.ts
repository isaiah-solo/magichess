import {BoardPos} from '../../types/BoardPos';
import Team from './Team';

export type PieceObj = {
  name: string;
  team: number;
};

export default abstract class Piece {
  private name: string;
  private team: Team;

  constructor(name: string, team: Team) {
    this.name = name;
    this.team = team;
  }

  public getName(): string {
    return this.name;
  }

  public getTeam(): Team {
    return this.team;
  }

  public getSerializedObj(): PieceObj {
    return {
      name: this.name,
      team: this.team,
    };
  }

  public getValidPositions(_pos: BoardPos): BoardPos[][] {
    throw new Error('Method "getValidPositions()" must be implemented.');
  }

  public getValidCaptures(_pos: BoardPos): BoardPos[][] {
    throw new Error('Method "getValidCaptures()" must be implemented.');
  }
}
