import { useMemo } from "react";

const useCalenderHook = () => {
  const dateTask = useMemo(() => {
    const today = new Date();
    return [...Array(365)].map((_, index) => {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + index
      )
        .toJSON()
        .split("T")[0];
    });
  }, []);
  return [dateTask];
};

export default useCalenderHook;
