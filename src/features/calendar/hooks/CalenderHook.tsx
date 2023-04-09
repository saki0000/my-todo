import moment from "moment";
import "moment/locale/ja";
import { useMemo } from "react";
const useGetDateOfYear = () => {
  const dateTask = useMemo(() => {
    return [...Array(365)].map((_, index) => {
      return moment().add(index, "days").format("YYYY-MM-DD");
    });
  }, []);
  return [dateTask];
};

export default useGetDateOfYear;
