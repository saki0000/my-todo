/* eslint-disable react-hooks/exhaustive-deps */
import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePartition,
} from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { deleteTask, updateTaskAPI } from "../../api";
import { separateAtom } from "../../atoms/openAtom";
import { stateAtom } from "../../atoms/stateAtom";
import SubTask from "../../features/subTask/show/SubTask";
import UpdateTask from "../../features/task/update/UpdateTask";
import { task } from "../../Types";

type taskType = task & { id: number };
type props = {
  task: taskType;
  mutate?: any;
};
const Task = React.memo(({ task, mutate }: props) => {
  const [tasks, setTasks] = useSetState<taskType>(task);
  const [diffDay, setDiffDay] = useState<Number>();
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const setModal = useSetRecoilState(separateAtom);
  const state = useRecoilValue(stateAtom);

  useEffect(() => {
    if (task.created_at) {
      const createdAtDate = new Date(task.created_at);
      const today = new Date();
      const diffTime = today.getTime() - createdAtDate.getTime();
      setDiffDay(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    }
  }, []);
  console.log(task.name);
  return (
    <>
      {open ? (
        <div className="h-full">
          <UpdateTask
            task={tasks}
            setOpen={setOpen}
            setTasks={setTasks}
            mutate={mutate}
          />
        </div>
      ) : (
        <>
          {tasks === undefined || checked || (
            <>
              {/* <Separate dataMutate={mutate} /> */}
              <Stack key={task.id}>
                <Stack
                  style={{
                    marginRight: 28,
                    marginLeft: 28,
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                  spacing={0}
                >
                  <Group position="apart">
                    <Group>
                      <Checkbox
                        checked={checked}
                        onChange={(e) => {
                          setChecked(e.currentTarget.checked);
                          mutate(
                            updateTaskAPI(tasks.id, {
                              name: tasks.name,
                              box: tasks.box,
                              date: tasks.date,
                              due_date: tasks.due_date,
                              weight: tasks.weight,
                              statement: true,
                              memo: tasks.memo,
                            })
                          );
                        }}
                      />

                      <Text>{tasks?.name}</Text>
                    </Group>

                    {/* buttons */}
                    {(task.box === "inbox" || state.first === task.box) && (
                      <Group>
                        <ActionIcon
                          onClick={() => {
                            setModal({ id: task.id, open: true });
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

                  {/* badges */}
                  <>
                    <Group style={{ marginLeft: 28 }} className="pt-2">
                      {tasks.weight && (
                        <Badge color="brown">優先度:{tasks?.weight}</Badge>
                      )}
                      {tasks.due_date && tasks.due_date !== "期日" && (
                        <Badge color="brown">期日:{tasks?.due_date}</Badge>
                      )}
                    </Group>
                  </>

                  {/* memo */}
                  {tasks.memo && (
                    <Text
                      color="brown"
                      style={{ marginLeft: 28 }}
                      className="mt-2"
                    >
                      {tasks?.memo}
                    </Text>
                  )}
                </Stack>

                {/* subtask */}
                {state.first && tasks?.subtasks?.length !== 0 && (
                  <Stack align="stretch" justify="" style={{ width: "100%" }}>
                    {tasks?.subtasks?.map((task: taskType) => (
                      <>
                        <SubTask id={tasks.id} task={task} mutate={mutate} />
                      </>
                    ))}
                  </Stack>
                )}
                {tasks.box === "inbox" && diffDay && diffDay > 14 ? (
                  <>
                    <Badge color="red">タスクを振り分けてください</Badge>
                  </>
                ) : (
                  <></>
                )}
              </Stack>
            </>
          )}
        </>
      )}
    </>
  );
});

export default Task;
