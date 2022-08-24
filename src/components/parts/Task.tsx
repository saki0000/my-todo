import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSetting,
} from "react-icons/ai";
import useDeleteTask from "../hooks/DeleteTask";
import UpdateTask from "../templates/UpdateTask";
import DueDate from "./DueDate";
import SubTask from "./SubTask";
import Weight from "./Weight";

const Task = ({ task, allTask, setAllTask, first, index }: any) => {
  const [tasks, setTasks] = useSetState({
    id: task.id,
    user_id: task.user_id,
    name: task.name,
    date: task.date,
    due_date: task.due_date,
    weight: task.weight,
    subtasks: task.subtasks,
    statement: task.statement,
    memo: task.memo,
  });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const deleteTask = useDeleteTask();
  return (
    <>
      {tasks.statement ? (
        open ? (
          <UpdateTask task={tasks} setOpen={setOpen} setTasks={setTasks} />
        ) : (
          <Stack>
            <Group
              position="apart"
              style={{ marginRight: 30, marginLeft: 30, marginTop: 20 }}
            >
              <Group>
                <Checkbox
                  checked={!tasks.statement}
                  onChange={() => {
                    setTasks({ statement: !tasks.statement });
                  }}
                />

                <Text>{tasks?.name}</Text>
              </Group>
              {first && (
                <Group>
                  <Weight weight={tasks?.weight} />
                  <DueDate dueDate={tasks?.due_date} />
                  <Menu opened={menu} onChange={setMenu}>
                    <Menu.Target>
                      <ActionIcon>
                        <AiOutlineSetting></AiOutlineSetting>
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => setOpen(true)}
                        icon={<AiOutlineEdit></AiOutlineEdit>}
                      >
                        Update the task
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        icon={<AiOutlineDelete></AiOutlineDelete>}
                        onClick={() => {
                          deleteTask(tasks.id);
                          allTask.splice(index, 1);
                          setAllTask(allTask);
                        }}
                      >
                        Delete the task
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                  {/* <ActionIcon onClick={() => setOpen(true)}></ActionIcon> */}
                  {/* <ActionIcon></ActionIcon> */}
                </Group>
              )}
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
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Task;
