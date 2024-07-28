import { Dispatch, SetStateAction } from "react";

export type ListViewProps = {
  toggleUpdate: boolean;
  setToggleUpdate: Dispatch<SetStateAction<boolean>>;
};
