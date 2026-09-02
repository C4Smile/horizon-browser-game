// config
import config from "../config";

// services
import { makeRequest } from "../db/services";

// utils
import { fromLocal } from "utils";

// types
import { AddPhotoDto, HttpErrorDto, LoggedUserDto, PhotoDto, UploadedPhotoDto } from "lib";

/**
 * @class ImageApiClient
 * @description ImageApiClient
 */
export class ImageApiClient {
  /**
   * @returns the authorization header of the logged user
   */
  private authHeaders(): HeadersInit {
    return {
      Authorization: "Bearer " + fromLocal<LoggedUserDto>(config.user, "object")?.token,
    };
  }

  /**
   * Generate image folder
   * @param dirPath folder path
   * @returns folder path
   */
  generateFolder(dirPath: string) {
    return `${config.appName}/${dirPath.toLowerCase()}`;
  }

  /**
   * Save photo into database
   * @param photo photo object
   * @returns response
   */
  async insertImage(photo: AddPhotoDto) {
    const { error, data, status } = await makeRequest<PhotoDto[], AddPhotoDto>(
      "images",
      "POST",
      photo,
      this.authHeaders(),
    );
    return { error, data, status: status === 204 ? 201 : status };
  }

  /**
   * Read file as base64
   * @param file file to read
   * @returns base64 string
   */
  async readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * @param photos list of images
   * @param folder where to save images
   * @returns uploaded images
   */
  async insertImages(
    photos: File[],
    folder: string,
  ): Promise<UploadedPhotoDto[] | { error: HttpErrorDto }> {
    const uploads: UploadedPhotoDto[] = [];

    for (const photo of photos) {
      const base64 = await this.readFileAsBase64(photo);
      const { data, error } = await makeRequest<PhotoDto[], AddPhotoDto>(
        "images",
        "POST",
        { base64, folder, fileName: photo.name },
        this.authHeaders(),
      );

      if (error) {
        console.error(error.message);
        return { error };
      }
      uploads.push({ fileId: data[0].fileName, url: data[0].url, id: data[0].id });
    }

    return uploads;
  }

  /**
   * Deletes an image
   * @param id image id
   * @returns response status
   */
  async deleteImage(id: number) {
    const { error } = await makeRequest(`images/${id}`, "DELETE", null, this.authHeaders());
    if (error) return error.status;
    return 200;
  }
}
