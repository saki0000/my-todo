import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import AddTask from "./AddTask";
import Task from "../parts/Task";
import { getDoTasks } from "../../api";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const TaskBox = ({ state, box }: any) => {
  const user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = getDoTasks(user, box);
  const { ref, height } = useElementSize();
  const boxes: any = {
    inbox: "Inbox",
    someday: "Someday",
    nextAction: "Next Action",
  };
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {state.first === box ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text size="lg">{boxes[box]}</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {data &&
                  data.map((task: any) => (
                    <Task task={task} first={true} mutate={mutate} />
                  ))}
                <AddTask
                  box={state.first}
                  tasks={data}
                  done={true}
                  mutate={mutate}
                />
                <Divider />
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div style={{ cursor: "pointer" }}>
            <Stack>
              <Text>{boxes[box]}</Text>
              <Divider />
              {data && <Task task={data[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default TaskBox;
