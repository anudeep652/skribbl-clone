import { Dispatch, SetStateAction } from "react";

export type TSetBoardTools = {
  setStrokeColor: Dispatch<SetStateAction<string>>;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
};
