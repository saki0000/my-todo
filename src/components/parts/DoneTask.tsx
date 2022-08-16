import {
  Container,
  Divider,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import Task from "./Task";

const DoneTask = () => {
  return (
    <>
      <Container style={{ height: "100%" }}>
        <Paper p="xl" style={{ width: "100%", height: "100%" }}>
          <Stack>
            <Text>Done Tasks</Text>
            <Divider />
            <ScrollArea style={{ height: 600 }} type="hover">
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
            </ScrollArea>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default DoneTask;
