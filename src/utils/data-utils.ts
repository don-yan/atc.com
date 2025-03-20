/**
 * Helper function to pick only allowed keys from an object
 * @param obj
 * @param keys
 */
export function mapPick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
