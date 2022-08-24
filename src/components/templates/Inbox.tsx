import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect } from "react";
import useGetDoTask from "../hooks/GetDoTask";
import AddTask from "./AddTask";
import Task from "../parts/Task";

const Inbox = ({ state }: any) => {
  const [tasks, setTasks] = useGetDoTask("inbox");
  const { ref, height } = useElementSize();
  useEffect(() => {
    console.log(0);
  }, [tasks]);
  return (
    <>
      {state.first === "inbox" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text>Inbox</Text>
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
                <AddTask
                  date={"inbox"}
                  tasks={tasks}
                  setTasks={setTasks}
                  done={true}
                />
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div>
            <Stack>
              <Text>Inbox</Text>
              <Divider />
              {tasks && <Task task={tasks[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Inbox;
