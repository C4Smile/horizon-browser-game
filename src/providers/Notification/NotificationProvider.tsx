import { createContext, useState, useContext, useCallback, useMemo } from "react";

// types
import {
  NotificationContextType,
  NotificationParams,
  NotificationProviderProps,
  NotificationState,
} from "./types";

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * Notification Provider
 * @param props - provider props
 * @returns Provider
 */
const NotificationProvider = (props: NotificationProviderProps) => {
  const { children } = props;

  const [notification, setNotification] = useState("");
  const [params, setParams] = useState<NotificationParams>({});
  const [state, setState] = useState<NotificationState>("");

  /**
   * @param string - string to parse
   * @param params - interpolation params
   * @param state - notification flavor
   */
  const setNotificationFunction = useCallback(
    (string: string, params: NotificationParams = {}, state: NotificationState = "") => {
      setNotification(string);
      setParams(params);
      setState(state);
    },
    [],
  );

  const value = useMemo(
    () => ({ notification, setNotification: setNotificationFunction, params, state }),
    [notification, setNotificationFunction, params, state],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

/**
 * useNotification hook
 * @returns function hook
 */
const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) throw new Error("notificationContext must be used within a Provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { NotificationProvider, useNotification };
