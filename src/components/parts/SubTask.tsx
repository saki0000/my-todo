import { Checkbox, Group, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { AiOutlineEnter } from "react-icons/ai";
import DueDate from "./DueDate";
import Weight from "./Weight";

const SubTask = (task: any) => {
  const [tasks, setTasks] = useSetState(task.task);
  return (
    <>
      <Group
        position="apart"
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginRight: 30,
          marginLeft: 40,
        }}
        key={tasks.id}
      >
        <Group>
          <AiOutlineEnter style={{ transform: "scale(-1,1)" }}></AiOutlineEnter>
          <Checkbox checked={true} onChange={() => {}} />
          <Text>{tasks?.name}</Text>
        </Group>
        <Group>
          <Weight weight={tasks?.weight} />
          <DueDate dueDate={tasks?.due_date} />
          <Checkbox />
        </Group>
      </Group>
    </>
  );
};

export default SubTask;
