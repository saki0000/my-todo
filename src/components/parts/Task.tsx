import {
  ActionIcon,
  Badge,
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
  AiOutlinePartition,
  AiOutlineSetting,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { separate } from "../../features/counterSlice";
import useDeleteTask from "../hooks/DeleteTask";
import useUpdateTask from "../hooks/UpdateTask";
import UpdateTask from "../templates/UpdateTask";
import SubTask from "./SubTask";

const Task = ({ task, allTask, setAllTask, first, index, sub }: any) => {
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
  // const [isDone, setIsDone] = useState(done || task.statement);

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const dispatch = useDispatch();
  return (
    <>
      {open ? (
        <UpdateTask task={tasks} setOpen={setOpen} setTasks={setTasks} />
      ) : (
        <Stack>
          <Group
            position="apart"
            style={{ marginRight: 30, marginLeft: 30, marginTop: 20 }}
          >
            <Group>
              <Checkbox
                checked={tasks.statement}
                onChange={() => {
                  setTasks({ statement: !tasks.statement });
                  // setIsDone(true);
                  updateTask(tasks.id, tasks);
                }}
              />

              <Text>{tasks?.name}</Text>
            </Group>
            {first && (
              <Group>
                <Badge>{tasks?.weight}</Badge>
                <Badge>{tasks?.due_date}</Badge>
                <Menu opened={menu} onChange={setMenu}>
                  <Menu.Target>
                    <ActionIcon>
                      <AiOutlineSetting></AiOutlineSetting>
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<AiOutlinePartition></AiOutlinePartition>}
                      onClick={() => dispatch(separate(tasks.id))}
                    >
                      Separate
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setOpen(true)}
                      icon={<AiOutlineEdit></AiOutlineEdit>}
                    >
                      Update
                    </Menu.Item>
                    <Divider />
                    <Menu.Item
                      color="red"
                      icon={<AiOutlineDelete></AiOutlineDelete>}
                      onClick={() => {
                        deleteTask(tasks.id);
                        allTask.splice(index, 1);
                        setAllTask(allTask);
                      }}
                    >
                      Delete
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
          {!sub &&
            first &&
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
      )}
    </>
  );
};

export default Task;
