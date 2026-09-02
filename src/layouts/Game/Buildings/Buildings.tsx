import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// icons
import { faDownLong, faHammer, faFire, faUpLong } from "@fortawesome/free-solid-svg-icons";

// providers
import { queryClient, useHorizonApiClient } from "providers/Api";
import { useGame } from "providers/Game";
import { useAccount } from "providers/Account";
import { useSocket } from "providers/Socket";

// utils
import { ReactQueryKeys } from "utils";

// components
import { Tabs } from "components/Tabs";
import { LinkedCostDto, PanelCard, PanelCardProps, Queue } from "components/PanelCard";

// actions
import { useEnqueueAction } from "./actions/useEnqueue";

// types
import { BuildingQueueActions, GameBuildingDto, isHttpFailure, PlayerBuildingDto } from "lib";

/**
 * Buildings panel
 * @returns Buildings component
 */
function Buildings() {
  const { t } = useTranslation();

  const { socket, addEvent } = useSocket();

  const { buildings = [], buildingCosts = [], resources = [], buildingTypes = [] } = useGame();

  const horizonApiClient = useHorizonApiClient();

  const { account } = useAccount();

  const playerId = account?.horizonUser?.id;

  const playerBuildings = useQuery({
    queryFn: () => horizonApiClient.Building.getMyBuildings(Number(playerId)),
    queryKey: [ReactQueryKeys.Buildings, playerId],
    enabled: !!playerId,
  });

  const playerQueue = useQuery({
    queryFn: () => horizonApiClient.Building.getMyQueue(Number(playerId)),
    queryKey: [ReactQueryKeys.BuildingsQueue, playerId],
    enabled: !!playerId,
  });

  const myBuildings = useMemo<PlayerBuildingDto[]>(() => {
    const { data } = playerBuildings;
    if (!data || isHttpFailure(data)) return [];
    return data;
  }, [playerBuildings]);

  const [currentTab, setCurrentTab] = useState(1);

  //#region Actions
  const build = useEnqueueAction({
    userId: playerId,
    buildingAction: BuildingQueueActions.Building,
    icon: faHammer,
    tooltip: t("_game:buildings.actions.build.label"),
    aria: t("_game:buildings.actions.build.aria"),
  });

  const upgrade = useEnqueueAction({
    userId: playerId,
    buildingAction: BuildingQueueActions.Upgrading,
    icon: faUpLong,
    tooltip: t("_game:buildings.actions.upgrade.label"),
    aria: t("_game:buildings.actions.upgrade.aria"),
  });

  const downgrade = useEnqueueAction({
    userId: playerId,
    buildingAction: BuildingQueueActions.Downgrading,
    icon: faDownLong,
    tooltip: t("_game:buildings.actions.downgrade.label"),
    aria: t("_game:buildings.actions.downgrade.aria"),
  });

  const demolish = useEnqueueAction({
    userId: playerId,
    buildingAction: BuildingQueueActions.Demolishing,
    icon: faFire,
    tooltip: t("_game:buildings.actions.demolish.label"),
    aria: t("_game:buildings.actions.demolish.aria"),
  });

  const actions = useCallback(
    (row: GameBuildingDto) => {
      const found = myBuildings.find((b) => b.buildingId === row.id);
      return [
        build.action(row, !!found),
        upgrade.action(row, !found),
        downgrade.action(row, !found || found.level <= 1),
        demolish.action(row, !found || found.level !== 1),
      ];
    },
    [build, demolish, downgrade, myBuildings, upgrade],
  );

  //#endregion Actions

  const linkedResourcesWithCost = useMemo<LinkedCostDto[]>(() => {
    return buildingCosts.flatMap((cost) => {
      const found = resources.find((resource) => resource.id === cost.resourceId);
      return found ? [{ ...cost, resource: found }] : [];
    });
  }, [buildingCosts, resources]);

  const prepareBuilding = useCallback(
    (building: GameBuildingDto): PanelCardProps => {
      const costs = linkedResourcesWithCost.filter((b) => b.entityId === building.id);
      const inPlayer = myBuildings.find((b) => b.buildingId === building.id);
      const toReturn: PanelCardProps = { ...building, costs };

      if (inPlayer?.state !== undefined) {
        toReturn.state = `${t("_accessibility:labels.state")}: ${t(`_game:buildings.states.${inPlayer.state}`)}`;
        toReturn.realLevel = inPlayer.level;
        toReturn.level = `${t("_accessibility:labels.level")} ${inPlayer.level}`;
      }

      return toReturn;
    },
    [linkedResourcesWithCost, myBuildings, t],
  );

  useEffect(() => {
    if (socket)
      addEvent("building.completed", () => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.Buildings, playerId] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.BuildingsQueue, playerId] });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <>
      <h3 className="text-light-primary text-3xl mb-3">{t("_game:buildings.title")}</h3>
      <Queue playerQueue={playerQueue} collection="buildings" entity="building" />
      <Tabs
        currentTab={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        tabs={buildingTypes.map(({ id, name, image }) => ({ id, name, image }))}
      />
      <ul className="flex flex-col gap-5 mt-5">
        {buildings
          .filter((b) => b.typeId === currentTab)
          .map((b) => (
            <li key={b.id}>
              <PanelCard actions={actions(b)} {...prepareBuilding(b)} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default Buildings;
