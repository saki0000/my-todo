import {
  ActionIcon,
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
  AiOutlineEnter,
  AiOutlinePartition,
  AiOutlineSetting,
} from "react-icons/ai";
import { separate } from "../../features/counterSlice";
import useDeleteSubtask from "../hooks/DeleteSubtask";
import useDeleteTask from "../hooks/DeleteTask";
import useUpdateSubtask from "../hooks/UpdateSubtask";
import UpdateTask from "../templates/UpdateTask";
import DueDate from "./DueDate";
import Weight from "./Weight";

const SubTask = (task: any) => {
  const [tasks, setTasks] = useSetState(task.task);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const updateTaskApi = useUpdateSubtask();
  const deleteTask = useDeleteSubtask();
  return (
    <>
      {open ? (
        <UpdateTask
          task={tasks}
          setOpen={setOpen}
          setTasks={setTasks}
          updateTaskApi={updateTaskApi}
          sub={true}
        />
      ) : (
        <Stack>
          <Group
            position="apart"
            style={{
              marginTop: 10,
              // marginBottom: 10,
              marginRight: 30,
              marginLeft: 40,
            }}
            key={tasks.id}
          >
            <Group>
              <AiOutlineEnter
                style={{ transform: "scale(-1,1)" }}
              ></AiOutlineEnter>
              <Checkbox checked={false} onChange={() => {}} />
              <Text>{tasks?.name}</Text>
            </Group>
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
                    Update
                  </Menu.Item>
                  <Divider />
                  <Menu.Item
                    color="red"
                    icon={<AiOutlineDelete></AiOutlineDelete>}
                    onClick={() => {
                      deleteTask(tasks.id);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
          <Text color="gray" style={{ marginLeft: 70 }}>
            {tasks.memo}
          </Text>
        </Stack>
      )}
    </>
  );
};

export default SubTask;
