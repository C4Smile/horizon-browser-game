import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

// providers
import { HorizonApiClientProvider } from "providers/Api";
import { AccountProvider } from "providers/Account";
import { NotificationProvider } from "providers/Notification";
import { GameProvider } from "providers/Game";

// styles
import "./index.css";

// i18
import "./i18";

// app
import App from "./App";

// fonts
import "@fontsource/poppins";

createRoot(document.getElementById("root")!).render(
  <Router>
    <HorizonApiClientProvider>
      <AccountProvider>
        <GameProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </GameProvider>
      </AccountProvider>
    </HorizonApiClientProvider>
  </Router>,
);
