import { ReactNode } from "react";

// types
import { AccountDto } from "lib";

export type AccountProviderProps = {
  children: ReactNode;
};

export type AccountContextType = {
  account: AccountDto;
  logUser: (data: AccountDto) => void;
  logoutUser: () => void;
  logUserFromLocal: () => Promise<void>;
};
