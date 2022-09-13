/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePartition,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../api";
import { separate } from "../../features/counterSlice";
import { task } from "../../Types";
import Separate from "../templates/Separate";
import UpdateTask from "../templates/UpdateTask";
import SubTask from "./SubTask";

type props = {
  task: task & { id: number };
  first: boolean;
  done?: boolean;
  mutate?: any;
};
const Task = React.memo(({ task, first, done, mutate }: props) => {
  const [tasks, setTasks] = useSetState<task & { id: number }>(task);
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    checked &&
      mutate(
        updateTask(tasks.id, {
          name: tasks.name,
          box: tasks.box,
          date: tasks.date,
          due_date: tasks.due_date,
          weight: tasks.weight,
          statement: true,
          memo: tasks.memo,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  useEffect(() => {
    setTasks(task);
  }, [task]);
  console.log(tasks);
  return (
    <>
      {open ? (
        <UpdateTask
          task={tasks}
          setOpen={setOpen}
          setTasks={setTasks}
          updateTaskApi={updateTask}
        />
      ) : (
        <>
          {tasks === undefined || checked || (
            <>
              <Modal
                onClose={() => {
                  setModal(false);
                }}
                opened={modal}
                size="lg"
              >
                <Separate />
              </Modal>
              <Stack>
                <Stack
                  style={{ marginRight: 30, marginLeft: 30, marginTop: 10 }}
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
                    {first && (
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
                            mutate(deleteTask(task.id));
                          }}
                        >
                          <AiOutlineDelete></AiOutlineDelete>
                        </ActionIcon>
                      </Group>
                    )}
                  </Group>

                  {tasks.weight === 0 &&
                  (tasks.due_date === "" || tasks.due_date === "期日") ? (
                    <></>
                  ) : (
                    <>
                      {first && (
                        <Group style={{ marginLeft: 30 }}>
                          {tasks.weight !== 0 && <Badge>{tasks?.weight}</Badge>}
                          {tasks.due_date && tasks.due_date !== "期日" && (
                            <Badge>期日:{tasks?.due_date}</Badge>
                          )}
                        </Group>
                      )}
                    </>
                  )}
                  <Text color="gray" style={{ marginLeft: 30 }}>
                    {tasks?.memo}
                  </Text>
                </Stack>

                {first &&
                  tasks?.subtasks?.length !== 0 &&
                  tasks?.subtasks?.map((task: any) => (
                    <>
                      <Stack
                        align="stretch"
                        justify=""
                        style={{ width: "100%" }}
                      >
                        <SubTask task={task} mutate={mutate} />
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
});

export default Task;
