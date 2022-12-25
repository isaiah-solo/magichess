import {BoardPos} from '../types/BoardPos';
import {Color} from '../ui/game/Tile';

export default function getTileColorForPos(pos: BoardPos): Color {
  const row = Math.floor(pos / 4);
  const colorPos = row % 2 === 0 ? pos + 1 : pos;

  return colorPos % 2 === 0 ? Color.Positive : Color.Negative;
}
