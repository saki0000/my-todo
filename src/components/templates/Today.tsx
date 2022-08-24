import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { useEffect } from "react";
import useGetDoTask from "../hooks/GetDoTask";
import AddTask from "./AddTask";
import Task from "../parts/Task";

const Today = ({ state }: any) => {
  const [tasks, setTasks, getTasks] = useGetDoTask("today");
  const { ref, height } = useElementSize();
  useEffect(() => {
    // getTasks();
  }, [tasks]);
  return (
    <>
      {state.first === "today" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text>今日</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {tasks &&
                  tasks.map((task: any, index: number) => (
                    <Task
                      task={task}
                      first={true}
                      allTask={tasks}
                      setAllTask={setTasks}
                      index={index}
                    />
                  ))}
                <AddTask date={"today"} tasks={tasks} setTasks={setTasks} />
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div>
            <Stack>
              <Text>今日</Text>
              <Divider />
              {tasks && <Task task={tasks[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Today;
