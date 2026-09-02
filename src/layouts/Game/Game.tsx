import { Outlet } from "react-router-dom";

// sections
import Header from "./components/Header";
import Footer from "./components/Footer";

// providers
import { ActionPanelProvider } from "providers/ActionPanel";
import { SocketProvider } from "providers/Socket";

/**
 * Game layout
 * @returns Game layout component
 */
const Game = () => {
  return (
    <SocketProvider>
      <ActionPanelProvider>
        <Header />

        <main className="screen">
          <Outlet />
        </main>
        <Footer />
      </ActionPanelProvider>
    </SocketProvider>
  );
};

export default Game;
