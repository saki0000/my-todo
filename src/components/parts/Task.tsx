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
import { useRecoilValue } from "recoil";
import { deleteTask, updateTask } from "../../api";
import { stateAtom } from "../../atoms/stateAtom";
import { separate } from "../../features/counterSlice";
import { task } from "../../Types";
import Separate from "../templates/Separate";
import UpdateTask from "../templates/UpdateTask";
import SubTask from "./SubTask";

type taskType = task & { id: number };
type props = {
  task: taskType;
  first: boolean;
  done?: boolean;
  mutate?: any;
};
const Task = React.memo(({ task, done, mutate }: props) => {
  const [tasks, setTasks] = useSetState<taskType>(task);
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const state = useRecoilValue(stateAtom);
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
                <Separate dataMutate={mutate} />
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
                    {state.first === task.box && (
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
                      {state.first === task.box && (
                        <Group style={{ marginLeft: 30 }}>
                          {tasks.weight !== 0 && (
                            <Badge>重さ:{tasks?.weight}/10</Badge>
                          )}
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

                {state.first &&
                  tasks?.subtasks?.length !== 0 &&
                  tasks?.subtasks?.map((task: taskType) => (
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
