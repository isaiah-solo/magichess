import JesterPiece from './experimental/JesterPiece';
import JumperPiece from './experimental/JumperPiece';
import MinerPiece from './experimental/MinerPiece';
import NinjaPiece from './experimental/NinjaPiece';
import SamuraiPiece from './experimental/SamuraiPiece';
import Piece from './Piece';
import BishopPiece from './units/BishopPiece';
import KingPiece from './units/KingPiece';
import KnightPiece from './units/KnightPiece';
import PawnPiece from './units/PawnPiece';
import QueenPiece from './units/QueenPiece';
import RookPiece from './units/RookPiece';

export default function getPieceFromSerializedObj(
  name: string,
  team: number,
): Piece {
  switch (name) {
    case 'Bishop':
      return new BishopPiece(team);
    case 'King':
      return new KingPiece(team);
    case 'Knight':
      return new KnightPiece(team);
    case 'Pawn':
      return new PawnPiece(team);
    case 'Queen':
      return new QueenPiece(team);
    case 'Rook':
      return new RookPiece(team);
    case 'Jester':
      return new JesterPiece(team);
    case 'Jumper':
      return new JumperPiece(team);
    case 'Miner':
      return new MinerPiece(team);
    case 'Ninja':
      return new NinjaPiece(team);
    case 'Samurai':
      return new SamuraiPiece(team);
  }

  throw new Error(`Piece with name "${name}" is unimplemented`);
}
