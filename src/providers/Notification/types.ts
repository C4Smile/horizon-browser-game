import { ReactNode } from "react";

export type NotificationState = "" | "good" | "bad" | "ugly";

export type NotificationParams = Record<string, unknown>;

export type NotificationProviderProps = {
  children: ReactNode;
};

export type NotificationContextType = {
  notification: string;
  setNotification: (
    notification: string,
    params?: NotificationParams,
    state?: NotificationState,
  ) => void;
  params: NotificationParams;
  state: NotificationState;
};
