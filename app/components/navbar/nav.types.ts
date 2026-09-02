import { IconType } from "react-icons/lib";

export type linkType = {
  label: string;
  link: string;
  icon: IconType;
  drop: boolean;
  children?: React.ReactNode;
};

export type section = {
  label: string;
  link: string;
};
