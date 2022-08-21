import { Checkbox, Divider, Group, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import DueDate from "./DueDate";
import SubTask from "./SubTask";
import Weight from "./Weight";

const Task = ({ task, first }: any) => {
  const [tasks, setTasks] = useSetState(task);
  console.log(first);
  return (
    <Stack>
      <Group
        position="apart"
        style={{ marginRight: 30, marginLeft: 30, marginTop: 20 }}
      >
        <Group>
          <Checkbox checked={true} onChange={() => {}} />

          <Text>{tasks?.name}</Text>
        </Group>
        <Group>
          <Weight weight={tasks?.weight} />
          <DueDate dueDate={tasks?.due_date} />
          <Checkbox />
        </Group>
      </Group>
      <Text color="gray" style={{ marginLeft: 65 }}>
        {tasks?.memo}
      </Text>
      {first &&
        tasks?.subtasks.length !== 0 &&
        tasks?.subtasks.map((task: any) => (
          <>
            <Stack align="stretch" justify="" style={{ width: "100%" }}>
              <SubTask task={task} />
            </Stack>
          </>
        ))}
      {first === true && <Divider />}
    </Stack>
  );
};

export default Task;
