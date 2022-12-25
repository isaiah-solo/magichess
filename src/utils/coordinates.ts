import {NumberRange} from '../types/NumberRange';

export type Coordinates = [x: NumberRange<0, 4>, y: NumberRange<0, 8>];

export function posToCoordinates(pos: number): Coordinates {
  return [castX(pos % 4), castY(Math.floor(pos / 4))];
}

export function coordinatesToPos(coordinates: Coordinates): NumberRange<0, 32> {
  return castPos(coordinates[0] + coordinates[1] * 4);
}

export function castX(coordinate: number): NumberRange<0, 4> {
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

export function castY(coordinate: number): NumberRange<0, 8> {
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

export function castPos(coordinate: number): NumberRange<0, 32> {
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
