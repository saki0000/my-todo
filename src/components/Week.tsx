import { Stack, Divider, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Week = ({ first }: any) => {
  return (
    <div>
      <Stack>
        <Text>今週</Text>
        <Divider />
        <Task />
      </Stack>
    </div>
  );
};

export default Week;
