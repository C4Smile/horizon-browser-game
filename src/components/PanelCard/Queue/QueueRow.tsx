import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useGame } from "providers/Game";

// types
import { QueueRowProps } from "../types";

/**
 * QueueRow
 * @param props - Props
 * @returns QueueRow component
 */
function QueueRow(props: QueueRowProps) {
  const { t } = useTranslation();

  const { collection, entity, queue, active } = props;

  const { startedAt, endsAt, action } = queue;

  const gameData = useGame();

  const entityData = useMemo(() => {
    const entityId = queue[entity]?.[`${entity}Id`];
    return gameData[collection]?.find((ent) => ent.id === entityId);
  }, [collection, entity, gameData, queue]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const now = Date.now();
        const end = new Date(endsAt).getTime();
        const start = new Date(startedAt).getTime();
        const totalDuration = end - start;
        const elapsedTime = now - start;

        if (elapsedTime < 0) setProgress(0);
        else if (elapsedTime > totalDuration) setProgress(100);
        else setProgress((elapsedTime / totalDuration) * 100);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [startedAt, endsAt, active]);

  return (
    <div className="w-full">
      <div className="text-white flex gap-1 text-sm">
        <p>{entityData?.name}</p> - <p>{t(`_game:${collection}.actions.${action}`)}</p> -{" "}
        <p>{Math.round(progress)}%</p>
      </div>
      <div className="w-full h-2 bg-white rounded-lg">
        <div
          className="h-2 bg-light-primary rounded-lg transition-all ease-in-out"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default QueueRow;
