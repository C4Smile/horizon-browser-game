import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sortBy } from "some-javascript-utils/array";

// providers
import { useHorizonApiClient } from "providers/Api";
import { useAccount } from "providers/Account";
import { useSocket } from "providers/Socket";

// utils
import { ReactQueryKeys } from "utils";

// components
import Resource from "./Resource";

// types
import { isHttpFailure, NotResourcesDto, PlayerResourceDto } from "lib";

/**
 * Resources
 * @returns Resources component
 */
function Resources() {
  const { account } = useAccount();
  const horizonApiClient = useHorizonApiClient();

  const playerId = account?.horizonUser?.id;

  const [resources, setResources] = useState<PlayerResourceDto[]>([]);

  const { socket, addEvent } = useSocket();

  const myResourcesQuery = useQuery({
    queryFn: () => horizonApiClient.Resource.getMyResources(Number(playerId)),
    queryKey: [ReactQueryKeys.Resources, playerId],
    enabled: !!playerId,
  });

  useEffect(() => {
    const { data } = myResourcesQuery;
    if (data && !isHttpFailure(data)) setResources([...data]);
  }, [myResourcesQuery]);

  useEffect(() => {
    if (resources.length) {
      const interval = setInterval(() => {
        setResources((current) =>
          current.map((res) => ({
            ...res,
            inStock: res.inStock < res.maxCapacity ? res.inStock + res.currentFactor : res.inStock,
          })),
        );
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [resources.length]);

  useEffect(() => {
    if (socket)
      addEvent("not.resources", (payload: NotResourcesDto) => {
        console.log(payload);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <ul className="flex gap-3 bg-dark pb-1 pt-2 px-4 rounded-lg">
      {!myResourcesQuery.isPending
        ? sortBy(resources, "resourceId", true)?.map((resource) => (
            <li key={resource.id}>
              <Resource {...resource} />
            </li>
          ))
        : null}
    </ul>
  );
}

export default Resources;
