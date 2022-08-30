import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { useEffect } from "react";
import useGetTask from "../hooks/GetTask";
import SubTask from "../parts/SubTask";
import AddSubTask from "./AddSubTask";

const Separate = ({ state }: any) => {
  const [task, setTask] = useGetTask();
  const { ref, height } = useElementSize();
  useEffect(() => {
    console.log("");
  }, [task]);
  return (
    <>
      {state.first === "separate" ? (
        <div>
          <Stack>
            <Text>{task.name}</Text>

            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}></ScrollArea.Autosize>
            </div>
            {task.subtasks.length === 0 ||
              task.subtasks.map((task: any) => <SubTask task={task} />)}
            <AddSubTask
              box={task.box}
              tasks={task.subtasks}
              setTasks={setTask}
            />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>Separate Task</Text>
              <Divider />
              <div style={{ margin: 30 }}>
                <Text>{task.name || "select a task"}</Text>
              </div>
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Separate;
