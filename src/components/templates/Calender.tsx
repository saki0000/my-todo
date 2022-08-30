import { Stack, Divider, ScrollArea, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { useMemo } from "react";
import useGetDoTask from "../hooks/GetDoTask";
import Task from "../parts/Task";
import AddTask from "./AddTask";

const Calender = (state: any) => {
  const [tasks, setTasks] = useGetDoTask("calender");
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

  return (
    <>
      {state.state.first === "calender" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text>カレンダー</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                <>
                  {dates.map((date: any) => (
                    <div>
                      <Text>{date}</Text>
                      <Divider />
                      {tasks &&
                        tasks.map((task: any, index: number) => (
                          <>
                            {date === task.date && (
                              <Task
                                task={task}
                                first={true}
                                allTask={tasks}
                                setAllTask={setTasks}
                                index={index}
                              />
                            )}
                          </>
                        ))}
                      <AddTask
                        box={state.state.first}
                        tasks={tasks}
                        setTasks={setTasks}
                        date={date}
                      />
                    </div>
                  ))}

                  <Divider />
                </>
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div>
            <Stack>
              <Text>カレンダー</Text>
              <Divider />
              {tasks && <Task task={tasks[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Calender;
