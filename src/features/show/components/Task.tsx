/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { stateAtom } from "../../../atoms/stateAtom";
import { task } from "../../../Types";
import { deleteTask } from "../../delete/api/DeleteApi";
import SeparateButton from "../../separate/components/SeparateButton";
import EditButton from "../../update/components/EditButton";
import UpdateTask from "../../update/components/UpdateTask";
import { useFetchTasks } from "../hooks/useFetchTask";
import PromptBadge from "./PromptBadge";
import SubTasks from "./SubTasks";

type TaskType = task & { id: number };
type props = {
  task: TaskType;
  mutate?: any;
  index: number;
};
const Task = ({ task, mutate, index }: props) => {
  const { data, mutate: deleteMutate } = useFetchTasks(task.box);
  const [open, setOpen] = useState<boolean>(false);
  const setModal = useSetRecoilState(separateAtom);
  const state = useRecoilValue(stateAtom);

  console.log(task.name);
  return (
    <>
      {open ? (
        <div className="h-full" key={task.id}>
          <UpdateTask task={task} setOpen={setOpen} mutate={mutate} />
        </div>
      ) : (
        <>
          {task === undefined || (
            <>
              <div className="pt-2" key={task.id}>
                <div className="pt-2 px-2">
                  <Group position="apart" className="my-0">
                    <div className="flex space-x-4">
                      <Checkbox
                        checked={false}
                        onChange={(e) => {
                          // e.preventDefault();
                          const newData = [...data];
                          newData.splice(index, 1);
                          deleteTask(task.id);
                          deleteMutate(newData, false);
                        }}
                      />

                      <p className="m-0 text-lg font-sans">{task?.name}</p>
                    </div>

                    {/* buttons */}
                    {(task.box === "inbox" || state.first === task.box) && (
                      <Group>
                        <EditButton
                          onClick={() => {
                            setOpen(true);
                          }}
                        />
                        <SeparateButton
                          onClick={() => {
                            setModal({ id: task.id, open: true });
                          }}
                        />
                      </Group>
                    )}
                  </Group>

                  {/* badges */}

                  {!task.weight && !task.due_date ? (
                    <></>
                  ) : (
                    <Group className="mx-8 mt-2">
                      {task.weight && (
                        <Badge color="brown">優先度:{task?.weight}</Badge>
                      )}
                      {task.due_date && (
                        <Badge color="brown">期日:{task?.due_date}</Badge>
                      )}
                    </Group>
                  )}

                  {/* memo */}
                  {task.memo && (
                    <Text color="brown" className="ml-9 mt-2">
                      {task?.memo}
                    </Text>
                  )}
                </div>

                {/* subtask */}
                <SubTasks taskId={task.id} />
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
