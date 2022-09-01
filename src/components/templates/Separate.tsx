import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { getTask } from "../../api";
import { selectSeparate } from "../../features/counterSlice";
import SubTask from "../parts/SubTask";
import AddSubTask from "./AddSubTask";

const Separate = ({ state }: any) => {
  const { ref, height } = useElementSize();
  const id: any = useSelector(selectSeparate);
  const { data, isLoading, error, mutate } = getTask(id);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      {state.first === "separate" ? (
        <div>
          <Stack>
            <Text>{data.name}</Text>

            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}></ScrollArea.Autosize>
            </div>
            {data.subtasks.length === 0 ||
              data.subtasks.map((task: any) => <SubTask task={task} />)}
            <AddSubTask task={data} tasks={data.subtasks} mutate={mutate} />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>Separate Task</Text>
              <Divider />
              <div style={{ margin: 30 }}>
                <Text>{data.name || "select a task"}</Text>
              </div>
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Separate;
