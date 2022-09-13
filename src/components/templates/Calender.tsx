import { Stack, Divider, ScrollArea, Text } from "@mantine/core";
import { useElementSize, useSetState } from "@mantine/hooks";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDoTasks } from "../../api";
import { selectUser } from "../../features/userSlice";
import { stateType, user } from "../../Types";
import Task from "../parts/Task";
import AddTask from "./AddTask";

const Calender = ({ state }: { state: stateType }) => {
  const user: user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = getDoTasks(user, "calender");
  const { ref, height } = useElementSize();
  const dates = useMemo(() => {
    return [...Array(365)].map((_, index) => {
      const today = new Date();
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + index
      )
        .toJSON()
        .split("T")[0];
    });
  }, []);
  const [calendar, setCalendar] = useSetState({
    first: "カレンダー",
    second: "今日",
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

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
                        {data &&
                          data.map((task: any, index: number) => (
                            <>
                              {date === task.date && (
                                <Task
                                  task={task}
                                  first={true}
                                  mutate={mutate}
                                />
                              )}
                            </>
                          ))}
                      </div>

                      <AddTask box={state.first} mutate={mutate} date={date} />
                    </div>
                  ))}

                  <Divider />
                </>
              ) : (
                <>
                  {data &&
                    data.map((task: any, index: number) => (
                      <>
                        {dates[0] === task.date && (
                          <Task task={task} first={true} />
                        )}
                      </>
                    ))}
                  <AddTask box={state.first} mutate={mutate} date={dates[0]} />
                </>
              )}
            </ScrollArea.Autosize>
          </div>
        </Stack>
      </>
    </>
  );
};

export default Calender;
