import { ReactNode } from "react";

// api
import { HorizonApiClient } from "api";

export type HorizonApiClientProviderProps = {
  children: ReactNode;
};

export type HorizonApiClientContextType = {
  client: HorizonApiClient;
};
