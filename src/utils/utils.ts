import config from "../config";

/**
 * @param string - image file name
 * @returns static url photo
 */
export const staticUrlPhoto = (string: string) => `${config.apiUrl}public/images/${string}`;
