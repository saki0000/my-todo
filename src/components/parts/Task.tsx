import { Badge, Checkbox, Group, Text } from "@mantine/core";

const Task = () => {
  return (
    <Group position="apart" style={{ margin: 30 }}>
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
