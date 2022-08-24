import { Divider, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSeparate } from "../../features/counterSlice";
import useGetTask from "../hooks/GetTask";
import Task from "../parts/Task";
import AddSubTask from "./AddSubTask";

const Separate = ({ state }: any) => {
  const [task, setTask] = useGetTask();
  const id = useSelector(selectSeparate);
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <>
      {state.first === "separate" ? (
        <div>
          <Stack>
            <Text>{task.name}</Text>
            <Divider />
            {task.subtasks.length === 0 ||
              task.subtasks.map((task: any) => (
                <Task task={task} first={true} sub={true} />
              ))}
            <AddSubTask
              date={task.date}
              tasks={task.subtasks}
              setTasks={setTask}
            />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>{task.name || "Task"}</Text>
              <Divider />
              {task.subtasks.length === 0 || (
                <Task task={task.subtasks[0]} first={false} />
              )}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Separate;
