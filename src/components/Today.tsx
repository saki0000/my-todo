import { Divider, Stack, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Today = ({ first }: any) => {
  return (
    <div>
      <Stack>
        <Text>今日</Text>
        <Divider />
        <Task />
      </Stack>
    </div>
  );
};

export default Today;
