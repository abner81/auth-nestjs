export function isObject<T extends object>(value: T): value is T & object {
  return typeof value === 'object' && value != null;
}
