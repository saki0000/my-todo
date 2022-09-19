/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, Divider, ScrollArea, Text } from "@mantine/core";
import { useElementSize, useSetState } from "@mantine/hooks";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDoTasks } from "../../api";
import { selectUser } from "../../features/userSlice";
import { DateFormat, task } from "../../Types";
import useCalenderHook from "../hooks/CalenderHook";
import CalendarTask from "../parts/CalendarTask";
// import { stateType, user } from "../../Types";
import Task from "../parts/Task";
import AddTask from "./AddTask";

type calendar = {
  [attr: DateFormat | string]: taskType[];
};
type taskType = task & { id: number };

const Calender = React.memo(() => {
  const user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = getDoTasks(user, "calender");
  const { ref, height } = useElementSize();
  const today = new Date();
  const [dateTask] = useCalenderHook(data);
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
                  {
                    dateTask.map((date: string) => (
                      <div key={date}>
                        <Text>{date}</Text>
                        <Divider />
                        <CalendarTask date={date} />
                      </div>
                    ))
                    /* {Object.entries(dateTask).map(
                    (value: [string, taskType[]]) => (
                      <div key={value[0]}>
                        <Text>{value[0]}</Text>
                        <Divider />
                        <div>
                          {value[1].map((task: taskType) => (
                            <div key={task.id}>
                              <Task task={task} first={true} mutate={mutate} />
                            </div>
                          ))}
                          {isLoading && <div>Loading</div>}
                          {error && <div>error</div>}
                        </div>
                        <AddTask
                          box={"calender"}
                          mutate={mutate}
                          date={value[0]}
                        />
                      </div>
                    )
                  )} */
                  }
                  <Divider />
                </>
              ) : (
                <>
                  {/* {dateTask[today.toJSON().split("T")[0]] &&
                    dateTask[today.toJSON().split("T")[0]].map(
                      (task: taskType) => (
                        <>
                          <Task task={task} first={true} mutate={mutate} />
                        </>
                      )
                    )}
                  <AddTask
                    mutate={mutate}
                    box={"calender"}
                    date={today.toJSON().split("T")[0]}
                  />
                  <Divider /> */}
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
