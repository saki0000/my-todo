import { ActionIcon, Checkbox, Group, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { AiOutlineDelete, AiOutlineEnter } from "react-icons/ai";
import useDeleteTask from "../hooks/DeleteTask";
import DueDate from "./DueDate";
import Weight from "./Weight";

const SubTask = (task: any) => {
  const [tasks, setTasks] = useSetState(task.task);
  const deleteTask = useDeleteTask();
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
          <Checkbox checked={false} onChange={() => {}} />
          <Text>{tasks?.name}</Text>
        </Group>
        <Group>
          <Weight weight={tasks?.weight} />
          <DueDate dueDate={tasks?.due_date} />
          <ActionIcon
            onClick={() => {
              deleteTask(tasks.id);
            }}
          >
            <AiOutlineDelete></AiOutlineDelete>
          </ActionIcon>
        </Group>
      </Group>
    </>
  );
};

export default SubTask;
