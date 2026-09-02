/**
 * Reads the http status carried by a thrown value, the way the pages report it.
 * @param error - whatever was thrown
 * @param fallback - what to answer when there is no status
 * @returns the status as a string, or the fallback
 */
export const errorStatus = (error: unknown, fallback = "notConnected"): string => {
  if (error && typeof error === "object" && "status" in error) {
    const { status } = error as { status?: number | string };
    if (status !== undefined && status !== null) return String(status);
  }
  return fallback;
};
