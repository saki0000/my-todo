import { Stack, Divider, Text, ScrollArea, Center, Group } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import useGetDoTask from "../hooks/GetDoTask";
import Task from "../parts/Task";

const Week = ({ state }: any) => {
  const tasks = useGetDoTask("week");
  const { ref, height } = useElementSize();
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
                  tasks.map((task: any) => <Task task={task} first={true} />)}
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
