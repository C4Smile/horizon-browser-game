import Tippy from "@tippyjs/react";
import { memo, useMemo } from "react";

// providers
import { useGame } from "providers/Game";

// utils
import { staticUrlPhoto } from "utils";

// types
import { ResourceProps } from "./types";

/**
 * Resource
 * @param props - Props
 * @returns Resource component
 */
const Resource = (props: ResourceProps) => {
  const { resources } = useGame();

  const { resourceId, inStock, maxCapacity } = props;

  const resourceData = useMemo(
    () => resources?.find((res) => res.id === resourceId),
    [resources, resourceId],
  );

  const tooltip = useMemo(() => {
    return `${resourceData?.name ?? ""} ${inStock} / ${maxCapacity}`;
  }, [inStock, maxCapacity, resourceData]);

  return (
    <Tippy content={tooltip}>
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-8 h-8 rounded-lg object-cover"
          src={staticUrlPhoto(resourceData?.image ?? "")}
          alt={resourceData?.name}
        />
        <p className="text-light-primary">{Math.floor(inStock)}</p>
      </div>
    </Tippy>
  );
};

export default memo(Resource);
