/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { stateAtom } from "../../../atoms/stateAtom";
import { task } from "../../../Types";
import { deleteTask } from "../../delete/api/DeleteApi";
import DeleteButton from "../../delete/components/DeleteButton";
import SeparateButton from "../../separate/components/SeparateButton";
import EditButton from "../../update/components/EditButton";
import UpdateTask from "../../update/components/UpdateTask";
import PromptBadge from "./PromptBadge";
import SubTask from "./SubTask";

type TaskType = task & { id: number };
type props = {
  task: TaskType;
  mutate?: any;
};
const Task = ({ task, mutate }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const setModal = useSetRecoilState(separateAtom);
  const state = useRecoilValue(stateAtom);

  console.log(task.name);
  return (
    <>
      {open ? (
        <div className="h-full">
          <UpdateTask task={task} setOpen={setOpen} mutate={mutate} />
        </div>
      ) : (
        <>
          {task === undefined || !checked || (
            <>
              <div className="pt-2">
                <div className="pt-2 px-2">
                  <Group position="apart">
                    <Group>
                      <Checkbox
                        checked={false}
                        onChange={(e) => {
                          // e.preventDefault();

                          mutate(deleteTask(task.id));
                          setChecked(false);
                        }}
                      />

                      <Text>{task?.name}</Text>
                    </Group>

                    {/* buttons */}
                    {(task.box === "inbox" || state.first === task.box) && (
                      <Group>
                        <SeparateButton
                          onClick={() => {
                            setModal({ id: task.id, open: true });
                          }}
                        />

                        <EditButton
                          onClick={() => {
                            setOpen(true);
                          }}
                        />
                        <DeleteButton
                          onClick={() => {
                            mutate(deleteTask(task.id));
                          }}
                        />
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
                    {task?.subtasks?.map((task: TaskType) => (
                      <div className="my-3">
                        <SubTask id={task.id} task={task} mutate={mutate} />
                      </div>
                    ))}
                  </div>
                )}
                <PromptBadge task={task} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Task;
