import {
  ActionIcon,
  Badge,
  Checkbox,
  // Divider,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePartition,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { separate } from "../../features/counterSlice";
import useDeleteTask from "../hooks/DeleteTask";
import useUpdateTask from "../hooks/UpdateTask";
import Separate from "../templates/Separate";
import UpdateTask from "../templates/UpdateTask";
import SubTask from "./SubTask";

const Task = ({ task, allTask, setAllTask, first, index, done }: any) => {
  const [tasks, setTasks] = useSetState({
    id: task?.id,
    user_id: task?.user_id,
    name: task?.name,
    box: task?.box,
    date: task?.date,
    due_date: task?.due_date,
    weight: task?.weight,
    subtasks: task?.subtasks,
    statement: task?.statement,
    memo: task?.memo,
  });
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const updateTaskApi = useUpdateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const dispatch = useDispatch();
  useEffect(() => {
    checked && setTasks({ statement: true });
    checked && updateTask(tasks.id, tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  return (
    <>
      {open ? (
        <UpdateTask
          task={tasks}
          setOpen={setOpen}
          setTasks={setTasks}
          updateTaskApi={updateTaskApi}
        />
      ) : (
        <>
          {checked || (
            <>
              <Modal
                onClose={() => {
                  setModal(false);
                }}
                opened={modal}
                size="lg"
              >
                <Separate state={{ first: "separate" }} />
              </Modal>
              <Stack
                onClick={() => {
                  dispatch(separate(tasks.id));
                  // setModal(true);
                }}
              >
                <Stack
                  style={{ marginRight: 30, marginLeft: 30, marginTop: 20 }}
                >
                  <Group position="apart">
                    <Group>
                      {done ? (
                        <>
                          <div style={{ marginLeft: 20 }}></div>
                        </>
                      ) : (
                        <Checkbox
                          checked={checked}
                          onChange={(e) => {
                            setChecked(e.currentTarget.checked);
                          }}
                        />
                      )}

                      <Text>{tasks?.name}</Text>
                    </Group>
                    <Group>
                      <ActionIcon
                        onClick={() => {
                          dispatch(separate(tasks.id));
                          setModal(true);
                        }}
                      >
                        <AiOutlinePartition></AiOutlinePartition>
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <AiOutlineEdit></AiOutlineEdit>
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => {
                          deleteTask(tasks.id);
                          allTask.splice(index, 1);
                          setAllTask(allTask);
                        }}
                      >
                        <AiOutlineDelete></AiOutlineDelete>
                      </ActionIcon>
                    </Group>
                  </Group>

                  {first && tasks.weight !== 0 && tasks.due_date && (
                    <Group style={{ marginLeft: 30 }}>
                      {tasks.weight && <Badge>{tasks?.weight}</Badge>}
                      {tasks.due_date && <Badge>{tasks?.due_date}</Badge>}
                    </Group>
                  )}
                  <Text color="gray" style={{ marginLeft: 30 }}>
                    {tasks?.memo}
                  </Text>
                </Stack>

                {first &&
                  tasks?.subtasks.length !== 0 &&
                  tasks?.subtasks.map((task: any) => (
                    <>
                      <Stack
                        align="stretch"
                        justify=""
                        style={{ width: "100%" }}
                      >
                        <SubTask task={task} />
                      </Stack>
                    </>
                  ))}
                {/* {first === true && <Divider />} */}
              </Stack>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Task;
