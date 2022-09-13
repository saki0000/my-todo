import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { getTask } from "../../api";
import { selectSeparate } from "../../features/counterSlice";
import SubTask from "../parts/SubTask";
import AddSubTask from "./AddSubTask";

const Separate = React.memo(() => {
  const { ref, height } = useElementSize();
  const id: number = useSelector(selectSeparate);
  const { data, isLoading, error, mutate } = getTask(id);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <div>
        <Stack>
          <Text>{data.name}</Text>

          <Divider />
          <div style={{ height: "100%" }} ref={ref}>
            <ScrollArea.Autosize maxHeight={height}></ScrollArea.Autosize>
          </div>
          {data.subtasks.length === 0 ||
            data.subtasks.map((task: any) => (
              <SubTask task={task} mutate={mutate} />
            ))}
          <AddSubTask task={data} mutate={mutate} />
        </Stack>
      </div>
    </>
  );
});

export default Separate;
