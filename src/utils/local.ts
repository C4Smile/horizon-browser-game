/**
 * Fetch data from local storage
 * @param key - key to fetch
 * @param as - transform parameter
 * @returns value of key in local storage
 */
export function fromLocal<T>(key: string, as: "object"): T | undefined;
export function fromLocal(key: string, as?: ""): string | undefined;
export function fromLocal<T>(key: string, as: string = ""): T | string | undefined {
  const result = localStorage.getItem(key) ?? undefined;
  if (result && as.length) {
    switch (as) {
      case "object":
        return JSON.parse(result) as T;
      default: // "string"
        return result;
    }
  }
  return result;
}

/**
 * Save data to local storage
 * @param key - key to save
 * @param value - value to save
 */
export const toLocal = (key: string, value: unknown) =>
  localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : String(value));

/**
 * Remove data from local storage
 * @param key - key to remove
 */
export const removeFromLocal = (key: string) => localStorage.removeItem(key);
