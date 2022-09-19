import { useMemo } from "react";
import { DateFormat, task } from "../../Types";
type calendar = {
  [attr: DateFormat | string]: taskType[];
};
type taskType = task & { id: number };
const useCalenderHook = (data: any) => {
  const dateTask = useMemo(() => {
    const today = new Date();
    // let calendarData: calendar = {};
    return [...Array(365)].map((_, index) => {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + index
      )
        .toJSON()
        .split("T")[0];
    });
    // .map((date: DateFormat | string) => {
    //   data &&
    //     data.map((task: taskType) => {
    //       date in calendarData
    //         ? date === task.date && calendarData[date].push(task)
    //         : date === task.date
    //         ? (calendarData[date] = [task])
    //         : (calendarData[date] = []);
    //     });
    // });
    // return calendarData;
  }, []);
  return [dateTask];
};

export default useCalenderHook;
