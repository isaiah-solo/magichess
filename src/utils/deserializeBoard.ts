import {Buffer} from 'buffer';
import {PieceObj} from '../models/pieces/Piece';
import getPieceFromSerializedObj from '../models/pieces/PieceMap';
import {BoardSlot} from '../types/BoardSlot';

export default function deserializeBoard(serial: string): BoardSlot[] {
  const jsonObjs: (PieceObj | null)[] = JSON.parse(
    Buffer.from(serial, 'base64').toString('ascii'),
  );

  return jsonObjs.map(obj =>
    obj !== null ? getPieceFromSerializedObj(obj?.name, obj?.team) : null,
  );
}
