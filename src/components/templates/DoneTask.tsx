import {
  Container,
  Divider,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import useGetDoneTask from "../hooks/GetDoneTask";
import Task from "../parts/Task";

const DoneTask = () => {
  const doneTasks = useGetDoneTask();
  const { ref, height } = useElementSize();
  return (
    <>
      <Container style={{ height: "100%" }}>
        <Paper p="xl" style={{ width: "100%", height: "100%" }}>
          <Stack style={{ height: "100%" }}>
            <Text>Done Tasks</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {doneTasks.map((task: any) => (
                  <Task task={task} />
                ))}
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default DoneTask;
