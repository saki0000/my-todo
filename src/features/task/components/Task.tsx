/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { stateAtom } from "../../../atoms/stateAtom";
import { task } from "../../../Types";
import useFetchDateTask from "../../calendar/hooks/fetchDateTask";
import useDeleteCache from "../../delete/hooks/useDeleteCache";
import SeparateButton from "../../separate/components/SeparateButton";
import DistributeButton from "../../update/components/DistributeButton";
import EditButton from "../../update/components/EditButton";
import UpdateTask from "../../update/components/UpdateTask";
import { useFetchTasks } from "../hooks/useFetchTask";
import MenuButton from "./MenuButton";
import PromptBadge from "./PromptBadge";
import SubTasks from "./SubTasks";

type TaskType = task & { id: number };
type props = {
  task: TaskType;
  index: number;
  date?: string;
};
const Task = ({ task, index, date }: props) => {
  const deleteData = useDeleteCache();
  const { data, mutate: deleteMutate } = useFetchTasks(task.box);
  const { data: calendarTask, mutate } = useFetchDateTask(date || "");
  const [open, setOpen] = useState<boolean>(false);
  const setModal = useSetRecoilState(separateAtom);
  const state = useRecoilValue(stateAtom);

  return (
    <>
      {open ? (
        <div className="h-full" key={task.id}>
          <UpdateTask
            task={task}
            setOpen={setOpen}
            index={index}
            type={date && "calendar"}
          />
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
                        onChange={() => {
                          if (date) {
                            deleteData(calendarTask, mutate, index, task.id);
                          } else {
                            deleteData(data, deleteMutate, index, task.id);
                          }
                        }}
                      />

                      <p className="m-0 text-lg font-sans">{task?.name}</p>
                    </div>

                    {/* buttons */}
                    {(task.box === "inbox" || state.first === task.box) && (
                      <div className="flex space-x-2">
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
                        {task.box === "inbox" ? (
                          <DistributeButton task={task} index={index} />
                        ) : (
                          <MenuButton />
                        )}
                        {/* <Box /> */}
                      </div>
                    )}
                  </Group>

                  {/* badges */}

                  {!task.weight && !task.due_date ? (
                    <></>
                  ) : (
                    <Group className="mx-8 mt-2">
                      {task.weight && (
                        <Badge color="brown">?????????:{task?.weight}</Badge>
                      )}
                      {task.due_date && (
                        <Badge color="brown">??????:{task?.due_date}</Badge>
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
