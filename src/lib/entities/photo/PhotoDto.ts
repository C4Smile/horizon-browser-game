/**
 * Mirrors the server's `BlobDto` (src/modules/image/dto/blob.dto.ts).
 */
export interface PhotoDto {
  id: number;
  url: string;
  fileName: string;
}

/** Payload accepted by `POST images`. */
export interface AddPhotoDto {
  base64: string;
  folder: string;
  fileName: string;
}

/** What `insertImages` hands back to the callers. */
export interface UploadedPhotoDto {
  id: number;
  url: string;
  fileId: string;
}
