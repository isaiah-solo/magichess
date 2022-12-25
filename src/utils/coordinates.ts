import {BoardPos} from '../types/BoardPos';
import {XPosNumber} from '../types/XPosNumber';
import {YPosNumber} from '../types/YPosNumber';
import compactMap from './compactMap';
import filterNulls from './filterNulls';
import hasAtLeastOneElement from './hasAtLeastOneElement';
import range from './range';

export type Coordinates = [x: number, y: number];

export function posToCoordinates(pos: number): Coordinates {
  return [castX(pos % 4), castY(Math.floor(pos / 4))];
}

export function boardRangeMap<T>(cb: (idx: BoardPos) => T): T[] {
  return range(32).map(castPos).map(cb);
}

export function leftRangeMap(
  pos: BoardPos,
  cb: (idx: XPosNumber) => BoardPos | null,
): BoardPos[] {
  const [x] = posToCoordinates(pos);

  return compactMap(range(x).map(castX), cb);
}

export function rightRangeMap(
  pos: BoardPos,
  cb: (idx: XPosNumber) => BoardPos | null,
): BoardPos[] {
  const [x] = posToCoordinates(pos);

  return compactMap(range(4 - x - 1).map(castX), cb);
}

export function upRangeMap(
  pos: BoardPos,
  cb: (idx: YPosNumber) => BoardPos | null,
): BoardPos[] {
  const [_x, y] = posToCoordinates(pos);

  return compactMap(range(y).map(castY), cb);
}

export function downRangeMap(
  pos: BoardPos,
  cb: (idx: YPosNumber) => BoardPos | null,
): BoardPos[] {
  const [_x, y] = posToCoordinates(pos);

  return compactMap(range(8 - y - 1).map(castY), cb);
}

export function posForLeft(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [(idx + 1) * -1, 0]);
}

export function posForRight(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [idx + 1, 0]);
}

export function posForUp(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [0, (idx + 1) * -1]);
}

export function posForDown(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [0, idx + 1]);
}

export function posForUpLeft(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [(idx + 1) * -1, (idx + 1) * -1]);
}

export function posForUpRight(pos: BoardPos, idx: number = 0): BoardPos | null {
  return posForOffset(pos, [idx + 1, (idx + 1) * -1]);
}

export function posForDownRight(
  pos: BoardPos,
  idx: number = 0,
): BoardPos | null {
  return posForOffset(pos, [(idx + 1) * -1, idx + 1]);
}

export function posForDownLeft(
  pos: BoardPos,
  idx: number = 0,
): BoardPos | null {
  return posForOffset(pos, [idx + 1, idx + 1]);
}

export function posForOffset(
  pos: BoardPos,
  coordinates: Coordinates,
): BoardPos | null {
  const [x, y] = posToCoordinates(pos);
  const [xOffset, yOffset] = coordinates;

  if (
    (xOffset > 0 && x + xOffset >= 4) ||
    (xOffset < 0 && x + xOffset < 0) ||
    (yOffset > 0 && y + yOffset >= 8) ||
    (yOffset < 0 && y + yOffset < 0)
  ) {
    return null;
  }

  return coordinatesToPos([castX(x + xOffset), castY(y + yOffset)]);
}

export function singlePosPaths(posArray: (BoardPos | null)[]): BoardPos[][] {
  return filterNulls(posArray).map(pos => [pos]);
}

export function multiPosPaths(posArray: (BoardPos | null)[][]): BoardPos[][] {
  return filterNulls(posArray.map(filterNulls).filter(hasAtLeastOneElement));
}

export function mergePosPaths(...posArrays: BoardPos[][][]): BoardPos[][] {
  const [firstPosArray, restPosArrays] = posArrays;

  return firstPosArray.concat(...restPosArrays);
}

export function castPos(coordinate: number): BoardPos {
  if (
    coordinate === 0 ||
    coordinate === 1 ||
    coordinate === 2 ||
    coordinate === 3 ||
    coordinate === 4 ||
    coordinate === 5 ||
    coordinate === 6 ||
    coordinate === 7 ||
    coordinate === 8 ||
    coordinate === 9 ||
    coordinate === 10 ||
    coordinate === 11 ||
    coordinate === 12 ||
    coordinate === 13 ||
    coordinate === 14 ||
    coordinate === 15 ||
    coordinate === 16 ||
    coordinate === 17 ||
    coordinate === 18 ||
    coordinate === 19 ||
    coordinate === 20 ||
    coordinate === 21 ||
    coordinate === 22 ||
    coordinate === 23 ||
    coordinate === 24 ||
    coordinate === 25 ||
    coordinate === 26 ||
    coordinate === 27 ||
    coordinate === 28 ||
    coordinate === 29 ||
    coordinate === 30 ||
    coordinate === 31
  ) {
    return coordinate;
  }

  throw new Error('Method "castPos" casted an invalid coordinate number.');
}

function coordinatesToPos(coordinates: Coordinates): BoardPos {
  return castPos(coordinates[0] + coordinates[1] * 4);
}

function castX(coordinate: number): XPosNumber {
  if (
    coordinate === 0 ||
    coordinate === 1 ||
    coordinate === 2 ||
    coordinate === 3
  ) {
    return coordinate;
  }

  throw new Error('Method "castX" casted an invalid coordinate number.');
}

function castY(coordinate: number): YPosNumber {
  if (
    coordinate === 0 ||
    coordinate === 1 ||
    coordinate === 2 ||
    coordinate === 3 ||
    coordinate === 4 ||
    coordinate === 5 ||
    coordinate === 6 ||
    coordinate === 7
  ) {
    return coordinate;
  }

  throw new Error('Method "castY" casted an invalid coordinate number.');
}
