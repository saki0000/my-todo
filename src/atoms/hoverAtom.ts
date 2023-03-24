import { atom } from "recoil";

export const hoverAtom = atom({
  key: "hoverAtom",
  default: { task: false, goal: false },
});
