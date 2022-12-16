/* eslint-disable react-hooks/exhaustive-deps */
import { ActionIcon, Badge, Checkbox, Group, Text } from "@mantine/core";
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
import { task } from "../../Types";
import UpdateTask from "../update/UpdateTask";
import SubTask from "./SubTask";

type taskType = task & { id: number };
type props = {
  task: taskType;
  mutate?: any;
};
const Task = React.memo(({ task, mutate }: props) => {
  // const [tasks, setTasks] = useSetState<taskType>(task);
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
  console.log(task.id);
  return (
    <>
      {open ? (
        <div className="h-full">
          <UpdateTask task={task} setOpen={setOpen} mutate={mutate} />
        </div>
      ) : (
        <>
          {task === undefined || checked || (
            <>
              {/* <Separate dataMutate={mutate} /> */}
              <div className="pt-2">
                <div className="pt-2 px-4">
                  <Group position="apart">
                    <Group>
                      <Checkbox
                        checked={checked}
                        onChange={(e) => {
                          setChecked(e.currentTarget.checked);
                          mutate(
                            updateTaskAPI(task.id, {
                              name: task.name,
                              box: task.box,
                              date: task.date,
                              due_date: task.due_date,
                              weight: task.weight,
                              statement: true,
                              memo: task.memo,
                            })
                          );
                        }}
                      />

                      <Text>{task?.name}</Text>
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

                  <Group className="mx-8 mt-2">
                    {task.weight && (
                      <Badge color="brown">優先度:{task?.weight}</Badge>
                    )}
                    {task.due_date && task.due_date !== "期日" && (
                      <Badge color="brown">期日:{task?.due_date}</Badge>
                    )}
                  </Group>

                  {/* memo */}
                  {task.memo && (
                    <Text color="brown" className="ml-9 mt-2">
                      {task?.memo}
                    </Text>
                  )}
                </div>

                {/* subtask */}
                {state.first && task?.subtasks?.length !== 0 && (
                  <div className="my-2 mx-4">
                    {task?.subtasks?.map((task: taskType) => (
                      <div className="my-3">
                        <SubTask id={task.id} task={task} mutate={mutate} />
                      </div>
                    ))}
                  </div>
                )}
                {task.box === "inbox" && diffDay && diffDay > 14 ? (
                  <>
                    <Badge color="red">タスクを振り分けてください</Badge>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
});

export default Task;
