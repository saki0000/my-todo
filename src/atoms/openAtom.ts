import { atom } from "recoil";

export const separateAtom = atom({
  key: "openAtom",
  default: { open: false, id: 0 },
});
