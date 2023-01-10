import filterNulls from './filterNulls';

export default function compactMap<T, V>(
  array: T[],
  cb: (el: T) => V | null,
): V[] {
  return filterNulls(array.map(cb));
}
