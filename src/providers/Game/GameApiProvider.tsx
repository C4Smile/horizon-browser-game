import { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

// providers
import { queryClient, useHorizonApiClient } from "providers/Api";
import { useAccount } from "providers/Account";

// utils
import { ReactQueryKeys } from "utils";

// types
import { isHttpFailure } from "lib";
import { GameContextType, GameProviderProps } from "./types";

const GameClientContext = createContext<GameContextType | undefined>(undefined);

/**
 * GameProvider
 * @param props - Props
 * @returns React component
 */
const GameProvider = (props: GameProviderProps) => {
  const { children } = props;

  const horizonApiClient = useHorizonApiClient();
  const { account } = useAccount();

  const playerId = account?.horizonUser?.id;

  const gameDataQuery = useQuery({
    queryFn: () => horizonApiClient.GameBasics.gameData(Number(playerId)),
    queryKey: [ReactQueryKeys.GameData, playerId],
    enabled: !!playerId,
  });

  const gameData = useMemo<GameContextType>(() => {
    const { data } = gameDataQuery;
    if (!data || isHttpFailure(data)) return {};
    return data;
  }, [gameDataQuery]);

  useEffect(() => {
    if (gameData.resources) {
      horizonApiClient.Resource.gameResources = gameData.resources;
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.Resources, playerId] });
    }
  }, [playerId, gameData, horizonApiClient]);

  return <GameClientContext.Provider value={gameData}>{children}</GameClientContext.Provider>;
};

/**
 * useGame hook
 * @returns the game basics
 */
const useGame = (): GameContextType => {
  const context = useContext(GameClientContext);
  if (context === undefined) throw new Error("useGame must be used within a GameProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { GameProvider, useGame };
