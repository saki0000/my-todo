import { atom } from "recoil";

export const stateAtom = atom({
  key: "stateAtom",
  default: {
    first: "inbox",
  },
});
