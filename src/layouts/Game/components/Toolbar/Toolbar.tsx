import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import Action from "./ToolbarAction";

// images
import edificios from "assets/images/edificios.png";
import armeria from "assets/images/armeria.png";
import investigacion from "assets/images/investigacion.png";
import flota from "assets/images/flota.png";

// types
import { PanelId } from "providers/ActionPanel";
import { ToolbarActionProps } from "./types";

const actions: PanelId[] = ["buildings", "ships", "techs", "guns"];
const images = [edificios, flota, investigacion, armeria];

/**
 * Toolbar
 * @returns Toolbar component
 */
const Toolbar = () => {
  const { t } = useTranslation();

  const parsedActions = useMemo<ToolbarActionProps[]>(() => {
    return actions.map((action, i) => ({
      id: action,
      name: t(`_game:actions.${action}.name`),
      tooltip: t(`_game:actions.${action}.name`),
      aria: t(`_game:actions.${action}.aria`),
      image: images[i],
    }));
  }, [t]);

  return (
    <ul className="flex gap-3 bg-dark p-2 rounded-lg">
      {parsedActions.map((action) => (
        <li key={action.id}>
          <Action {...action} />
        </li>
      ))}
    </ul>
  );
};

export default Toolbar;
