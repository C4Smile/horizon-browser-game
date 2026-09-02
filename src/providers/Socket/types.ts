import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export type SocketProviderProps = {
  children: ReactNode;
};

/** Events the server (`WebsocketsGateway`) pushes to the player. */
export type SocketEvent = "not.resources" | "building.completed";

export type SocketContextType = {
  socket: Socket | null;
  addEvent: <TPayload>(eventName: SocketEvent, callback: (payload: TPayload) => void) => void;
};
