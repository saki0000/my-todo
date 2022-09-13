/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, Divider, ScrollArea, Text } from "@mantine/core";
import { useElementSize, useSetState } from "@mantine/hooks";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDoTasks } from "../../api";
import { selectUser } from "../../features/userSlice";
// import { stateType, user } from "../../Types";
import Task from "../parts/Task";
import AddTask from "./AddTask";

const Calender = React.memo(() => {
  const user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = getDoTasks(user, "calender");
  const { ref, height } = useElementSize();
  const today = new Date();
  const dates = useMemo(() => {
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
  const dateTask = useMemo(() => {
    let calendarData: any = {};
    dates.map((date) => {
      data &&
        data.map((task: any) => {
          date in calendarData
            ? date === task.date && calendarData[date].push(task)
            : date === task.date
            ? (calendarData[date] = [task])
            : (calendarData[date] = []);
        });
    });
    return calendarData;
  }, [data, dates]);
  const [calendar, setCalendar] = useSetState({
    first: "カレンダー",
    second: "今日",
  });

  return (
    <>
      <>
        <Stack style={{ height: "100%" }}>
          <Text size="lg">
            {calendar.first}
            <span
              onClick={() => {
                setCalendar({
                  first: calendar.second,
                  second: calendar.first,
                });
              }}
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            >
              /{calendar.second}
            </span>
          </Text>
          <Divider />
          <div style={{ height: "100%" }} ref={ref}>
            <ScrollArea.Autosize maxHeight={height}>
              {calendar.first === "カレンダー" ? (
                <>
                  {dates.map((date: any) => (
                    <div style={{ margin: 10 }}>
                      <Text>{date}</Text>
                      <Divider />
                      <div style={{ margin: 5 }}>
                        {dateTask[date] &&
                          dateTask[date].map((task: any) => (
                            <>
                              <Task task={task} first={true} mutate={mutate} />
                            </>
                          ))}
                        {isLoading && <div>Loading</div>}
                        {error && <div>error</div>}
                      </div>

                      <AddTask box={"calender"} mutate={mutate} date={date} />
                    </div>
                  ))}

                  <Divider />
                </>
              ) : (
                <>
                  {dateTask[dates[0]] &&
                    dateTask[dates[0]].map((task: any) => (
                      <>
                        <Task task={task} first={true} mutate={mutate} />
                      </>
                    ))}
                  <AddTask mutate={mutate} box={"calender"} date={dates[0]} />
                  <Divider />
                </>
              )}
            </ScrollArea.Autosize>
          </div>
        </Stack>
      </>
    </>
  );
});

export default Calender;
