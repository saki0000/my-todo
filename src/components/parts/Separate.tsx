import { Divider, Stack, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Separate = ({ state }: any) => {
  return (
    <div>
      <Stack>
        <Text>タスク</Text>
        <Divider />
        <Task />
      </Stack>
    </div>
  );
};

export default Separate;
