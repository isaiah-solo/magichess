import {Buffer} from 'buffer';
import {BoardSlot} from '../types/BoardSlot';

export default function serializeBoard(boardSlots: BoardSlot[]): string {
  const str = `[${boardSlots
    .map(slot => {
      const obj = slot?.getSerializedObj() ?? null;

      if (obj === null) {
        return 'null';
      }

      return JSON.stringify(obj);
    })
    .join(',')}]`;

  return Buffer.from(str).toString('base64');
}
