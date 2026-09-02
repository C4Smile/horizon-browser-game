import { MouseEvent, ReactNode } from "react";

export type TabDto = {
  id: number;
  name: string;
  image?: string;
};

export type TabsProps = {
  tabs?: TabDto[];
  currentTab: number;
  onChange: (event: MouseEvent<HTMLButtonElement>, tabId: number) => void;
};

export type ContentProps = {
  content?: ReactNode;
};

export type TabComponentProps = TabsProps & ContentProps;
