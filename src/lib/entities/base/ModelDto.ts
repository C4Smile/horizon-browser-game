/**
 * Mirrors the server's `ModelDto` (src/modules/models/dto/model.dto.ts).
 */
export interface ModelDto {
  id: number;
  dateOfCreation: Date;
  lastUpdate: Date;
  deleted: boolean;
}

export interface RelationshipDto {
  id: number;
}
