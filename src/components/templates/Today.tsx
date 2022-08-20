import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import useGetDoTask from "../hooks/GetDoTask";
import Task from "../parts/Task";

const Today = ({ state }: any) => {
  const tasks: any = useGetDoTask("today");
  const { ref, height } = useElementSize();
  return (
    <>
      {state.first === "today" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text>今日</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {tasks && tasks.map((task: any) => <Task task={task} />)}
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
              {tasks && <Task task={tasks[0]} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Today;
