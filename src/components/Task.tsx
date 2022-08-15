import { Badge, Checkbox, Group, Text } from "@mantine/core";
import React from "react";

const Task = () => {
  return (
    <Group position="apart">
      <Group>
        <Checkbox checked={true} onChange={() => {}} />
        <Text>Taskaaaaaaaaaaaaaaaa</Text>
      </Group>
      <Group>
        <Badge>予定</Badge>
        <Badge>重さ</Badge>
        <Checkbox />
      </Group>
    </Group>
  );
};

export default Task;
