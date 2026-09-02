import { ReactNode } from "react";

export type PageDto = {
  key: string;
  component: ReactNode;
  path: string;
  /** Roles allowed to reach the page, every role when omitted. */
  role?: number[];
  children?: PageDto[];
};
