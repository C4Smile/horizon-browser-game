import { useMemo } from "react";

// components
import Toolbar from "./Toolbar/Toolbar";
import { Panel } from "components/PanelCard";

// providers
import { useActionPanel } from "providers/ActionPanel";

// panels
import Buildings from "../Buildings/Buildings";
import Ships from "../Ships/Ships";
import Techs from "../Techs/Techs";
import Forge from "../Forge/Forge";

/**
 * Game footer
 * @returns Footer component
 */
export default function Footer() {
  const { showPanel } = useActionPanel();

  const dialog = useMemo(() => {
    switch (showPanel) {
      case "buildings":
        return <Buildings />;
      case "ships":
        return <Ships />;
      case "techs":
        return <Techs />;
      default:
        return <Forge />;
    }
  }, [showPanel]);

  return (
    <>
      <Panel>{dialog}</Panel>
      <footer className="flex p-3 w-full justify-between">
        <div></div>
        <Toolbar />
      </footer>
    </>
  );
}
