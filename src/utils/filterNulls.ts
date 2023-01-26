export default function filterNulls<T>(array: (T | null)[]): T[] {
  let results: T[] = [];

  for (const el of array) {
    if (el === null) {
      continue;
    }
    results = [...results, el];
  }

  return results;
}
