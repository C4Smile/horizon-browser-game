import { createContext, useState, useContext, useCallback, useMemo } from "react";

// providers
import { useHorizonApiClient } from "providers/Api";

// utils
import { toLocal, fromLocal, removeFromLocal } from "utils";

// config
import config from "../../config";

// types
import { AccountDto, LoggedUserDto } from "lib";
import { AccountContextType, AccountProviderProps } from "./types";

const AccountContext = createContext<AccountContextType | undefined>(undefined);

/**
 * Account Provider
 * @param props - provider props
 * @returns JSX.Element
 */
const AccountProvider = (props: AccountProviderProps) => {
  const { children } = props;

  const horizonApiClient = useHorizonApiClient();

  const [account, setAccount] = useState<AccountDto>({});

  const logUser = useCallback((data: AccountDto) => {
    setAccount(data);
    toLocal(config.user, data);
  }, []);

  const logoutUser = useCallback(() => {
    setAccount({});
    removeFromLocal(config.user);
  }, []);

  const logUserFromLocal = useCallback(async () => {
    try {
      const { status } = await horizonApiClient.User.getSession();
      if (status === 200) {
        const loggedUser = fromLocal<LoggedUserDto>(config.user, "object");
        if (loggedUser) {
          const request = await horizonApiClient.User.fetchOwner(loggedUser.user.id);
          const horizonUser = await request.json();
          if (horizonUser) setAccount({ ...loggedUser, horizonUser });
          else setAccount(loggedUser);
        }
      } else logoutUser();
    } catch (err) {
      console.error(err);
      logoutUser();
    }
  }, [logoutUser, horizonApiClient.User]);

  const value = useMemo(
    () => ({ account, logUser, logoutUser, logUserFromLocal }),
    [account, logUser, logoutUser, logUserFromLocal],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

/**
 * useAccount hook
 * @returns function hook
 */
const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) throw new Error("accountContext must be used within a Provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AccountProvider, useAccount };
