import { createContext, useContext, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// api
import { HorizonApiClient } from "api";

// types
import { HorizonApiClientContextType, HorizonApiClientProviderProps } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: true,
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const HorizonApiClientContext = createContext<HorizonApiClientContextType | undefined>(undefined);

/**
 * HorizonApiClientProvider
 * @param props - Props
 * @returns React component
 */
const HorizonApiClientProvider = (props: HorizonApiClientProviderProps) => {
  const { children } = props;

  const horizonApiClient = useMemo(() => new HorizonApiClient(), []);

  return (
    <HorizonApiClientContext.Provider value={{ client: horizonApiClient }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HorizonApiClientContext.Provider>
  );
};

/**
 * @returns HorizonApiClient
 */
const useHorizonApiClient = (): HorizonApiClient => {
  const context = useContext(HorizonApiClientContext);
  if (context === undefined)
    throw new Error("useHorizonApiClient must be used within a HorizonApiClientProvider");
  return context.client;
};

// eslint-disable-next-line react-refresh/only-export-components
export { queryClient, HorizonApiClientProvider, useHorizonApiClient };
