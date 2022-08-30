import { atom } from "recoil";

export const stateAtom = atom({
  key: "numAtom",
  default: {
    first: "inbox",
    second: "separate",
    third: "today",
    fourth: "week",
  },
});
