/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { separateAtom } from "../../atoms/openAtom";
import { stateAtom } from "../../atoms/stateAtom";
import useDeleteTask from "../../features/delete/hooks/useDeleteTask";
import SeparateButton from "../../features/separate/components/SeparateButton";
import DistributeButton from "../../features/update/components/DistributeButton";
import EditButton from "../../features/update/components/EditButton";
import UpdateTask from "../../features/update/components/UpdateTask";
import { TaskType } from "../../Types";
import MenuButton from "../button/MenuButton";
import PromptBadge from "../button/PromptBadge";
import SubTasks from "../layout/list/SubTaskList";

type props = {
  task: TaskType;
  index: number;
  date?: string;
};
const Task = ({ task, index, date }: props) => {
  const mutation = useDeleteTask(task, index);
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
                        onChange={() => mutation.mutate(task.id)}
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
