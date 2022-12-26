import {BoardPos} from '../../types/BoardPos';
import Classification from './Classification';
import Team from './Team';

export type PieceObj = {
  classification: number;
  name: string;
  team: number;
};

export default abstract class Piece {
  private classification: Classification;
  private name: string;
  private team: Team;

  constructor(name: string, classification: Classification, team: Team) {
    this.classification = classification;
    this.name = name;
    this.team = team;
  }

  public getClassification(): Classification {
    return this.classification;
  }

  public getName(): string {
    return this.name;
  }

  public getTeam(): Team {
    return this.team;
  }

  public getSerializedObj(): PieceObj {
    return {
      classification: this.classification,
      name: this.name,
      team: this.team,
    };
  }

  public isPieceOnOppositeTeam(piece: Piece): boolean {
    return this.team !== piece.team;
  }

  public getValidPositions(_pos: BoardPos): BoardPos[][] {
    throw new Error('Method "getValidPositions()" must be implemented.');
  }

  public getValidCaptures(_pos: BoardPos): BoardPos[][] {
    throw new Error('Method "getValidCaptures()" must be implemented.');
  }
}
