import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useEffect } from "react";

const Task = (task: any) => {
  const [doneTask, setDoneTask] = useSetState(task.task);
  return (
    <Group position="apart" style={{ margin: 30 }}>
      <Group>
        <Checkbox checked={true} onChange={() => {}} />
        <Text>{doneTask?.name}</Text>
      </Group>
      <Group>
        <Badge>{doneTask?.due_date}</Badge>
        <Badge>{doneTask?.weight}</Badge>
        <Checkbox />
      </Group>
    </Group>
  );
};

export default Task;
