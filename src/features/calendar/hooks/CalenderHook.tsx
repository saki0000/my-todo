import { useMemo } from "react";

const useGetDateOfYear = (today: Date) => {
  const dateTask = useMemo(() => {
    return [...Array(365)].map((_, index) => {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + index
      )
        .toJSON()
        .split("T")[0];
    });
  }, [today]);
  return [dateTask];
};

export default useGetDateOfYear;
