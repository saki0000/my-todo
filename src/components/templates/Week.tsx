import { Stack, Divider, Text, ScrollArea } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { useEffect } from "react";
import useGetDoTask from "../hooks/GetDoTask";
import AddTask from "./AddTask";
import Task from "../parts/Task";

const Week = ({ state }: any) => {
  const [tasks, setTasks, getTasks] = useGetDoTask("week");
  const { ref, height } = useElementSize();
  useEffect(() => {
    // getTasks();
  }, [tasks]);
  return (
    <>
      {state.first === "week" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <div>
              <Text>今週</Text>
            </div>
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
                <AddTask date={"week"} tasks={tasks} setTasks={setTasks} />
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <Stack>
            <Text>今週</Text>
            <Divider />

            {tasks && <Task task={tasks[0]} first={false} />}
          </Stack>
        </>
      )}
    </>
  );
};

export default Week;
