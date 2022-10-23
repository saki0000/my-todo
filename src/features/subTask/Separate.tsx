import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { getTask } from "../../api";
import { selectSeparate } from "../../redux/counterSlice";
import { task } from "../../Types";
import AddSubTask from "./AddSubTask";
import SubTask from "./SubTask";

const Separate = React.memo(({ dataMutate }: any) => {
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
            data.subtasks.map((task: task & { id: number }) => (
              <SubTask task={task} mutate={dataMutate} />
            ))}
          <AddSubTask task={data} mutate={mutate} />
        </Stack>
      </div>
    </>
  );
});

export default Separate;