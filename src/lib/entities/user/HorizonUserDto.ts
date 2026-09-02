import { ModelDto } from "../base";
import { PhotoDto } from "../photo";

/**
 * Mirrors the server's `HorizonUser` entity, as returned by
 * `GET horizonUser/byUserId/:userId` and `GET horizonUser/:id`.
 */
export interface HorizonUserDto extends ModelDto {
  name: string;
  username: string;
  phone: string;
  email: string;
  status: number;
  roleId: number;
  userId: number;
  imageId: number;
  image?: PhotoDto;
  lockedBy?: number;
}

/**
 * Body of `PATCH horizonUser/:id`, mirrors the server's `UpdateHorizonUserDto`
 * plus the client-only fields the account form carries.
 */
export interface UpdateHorizonUserDto {
  id: number;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  roleId?: number;
  password?: string;
  rPassword?: string;
  image?: PhotoDto;
  lastUpdate?: string;
}

/** Well known role ids (`horizonRole` table). */
export enum Role {
  administrator = 1,
  player = 2,
}
