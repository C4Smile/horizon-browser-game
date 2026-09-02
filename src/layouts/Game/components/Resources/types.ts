// types
import { PlayerResourceDto } from "lib";

export type ResourceProps = Pick<PlayerResourceDto, "resourceId" | "inStock" | "maxCapacity">;
