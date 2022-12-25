import Piece from './Piece';
import BishopPiece from './units/BishopPiece';
import KingPiece from './units/KingPiece';
import KnightPiece from './units/KnightPiece';
import PawnPiece from './units/PawnPiece';
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
    case 'Rook':
      return new RookPiece(team);
  }

  throw new Error(`Piece with name "${name}" is unimplemented`);
}
