import { ReactNode } from "react";

// types
import { GameBasicsDto } from "lib";

export type GameProviderProps = {
  children: ReactNode;
};

/** The game basics are empty until `GET game/:userId` answers. */
export type GameContextType = Partial<GameBasicsDto>;
