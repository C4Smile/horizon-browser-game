import { io } from "socket.io-client";
import { createContext, useCallback, useContext, useMemo } from "react";

// providers
import { useAccount } from "providers/Account";

// config
import config from "../../config";

// types
import { SocketContextType, SocketEvent, SocketProviderProps } from "./types";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

/**
 * SocketProvider
 * @param props - Props
 * @returns React component
 */
const SocketProvider = (props: SocketProviderProps) => {
  const { children } = props;

  const { account } = useAccount();

  const playerId = account?.horizonUser?.id;

  const socket = useMemo(() => {
    if (playerId) {
      const socket = io(config.apiUrl, {
        reconnectionDelayMax: 10000,
      });

      socket.on("connect", function () {
        console.log("Connected");

        socket.emit("identity", playerId, (response: number) => console.log("Identity:", response));
      });

      socket.on("exception", function (data: unknown) {
        console.log("event", data);
      });

      socket.on("disconnect", function () {
        console.log("Disconnected");
      });

      return socket;
    }
    return null;
  }, [playerId]);

  const addEvent = useCallback(
    <TPayload,>(eventName: SocketEvent, callback: (payload: TPayload) => void) => {
      if (socket) {
        socket.off(eventName);
        socket.on(eventName, callback as (...args: unknown[]) => void);
      }
    },
    [socket],
  );

  const value = useMemo(() => ({ socket, addEvent }), [socket, addEvent]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

/**
 * useSocket hook
 * @returns the socket and its event registrar
 */
const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) throw new Error("useSocket must be used within a SocketProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SocketProvider, useSocket };
