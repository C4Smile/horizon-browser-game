type WithId = { id: number } & Record<string, unknown>;

/**
 * Parse a one-to-many relationship
 * @param remoteAttribute - Remote attribute to compare
 * @param localList - Local list
 * @param remoteList - Local list
 * @returns List of elements to add or remove
 */
export const parseManyToMany = <T extends WithId>(
  remoteAttribute: string,
  localList: T[] = [],
  remoteList: T[] = [],
): (T & { delete: boolean })[] => {
  const toAdd: (T & { delete: boolean })[] = [];
  const toRemove: (T & { delete: boolean })[] = [];

  const getToCompare = (element: T) => {
    const related = element[remoteAttribute] as { id?: number } | number | undefined;
    if (related && typeof related === "object") return related.id ?? element.id;
    return related ?? element.id;
  };

  // adding new elements
  if (localList)
    for (const localElement of localList) {
      const remoteTag = remoteList?.find(
        (element) => getToCompare(element) === getToCompare(localElement),
      );
      if (!remoteTag)
        // create new element
        toAdd.push({
          delete: false,
          ...localElement,
          [remoteAttribute]: getToCompare(localElement),
        });
    }
  // removing elements
  if (remoteList)
    for (const remoteElement of remoteList) {
      const localElement = localList?.find(
        (element) => getToCompare(element) === getToCompare(remoteElement),
      );
      if (!localElement)
        // create new element
        toRemove.push({
          delete: true,
          ...remoteElement,
          [remoteAttribute]: getToCompare(remoteElement),
        });
    }
  return [...toAdd, ...toRemove];
};
