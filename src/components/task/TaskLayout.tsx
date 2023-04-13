/* eslint-disable react-hooks/exhaustive-deps */
import { ActionIcon, Badge, Checkbox, Group } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { separateAtom } from "../../atoms/openAtom";
import { stateAtom } from "../../atoms/stateAtom";
import ChatGpt from "../../features/chatgpt/components/ChatGpt";
import useDeleteTask from "../../features/delete/hooks/useDeleteTask";
import SeparateButton from "../../features/separate/components/SeparateButton";
import DistributeButton from "../../features/update/components/DistributeButton";
import EditButton from "../../features/update/components/EditButton";
import UpdateTask from "../../features/update/components/UpdateTask";
import { TaskType } from "../../types/Types";
import GoalCheckBox from "../button/GoalCheckBox";
import MenuButton from "../button/MenuButton";
import PromptBadge from "../button/PromptBadge";
import SubTasks from "../layout/list/SubTaskList";
import Memo from "./Memo";

type props = {
  task: TaskType;
  index: number;
  date?: string;
  goal?: boolean;
  sub?: boolean;
  openadd?: boolean;
};
const TaskLayout = ({ task, index, date, goal, sub, openadd }: props) => {
  const mutation = useDeleteTask(task, index, sub ? task.parent_id : task.box);
  const [open, setOpen] = useState<boolean>(false);
  const setModal = useSetRecoilState(separateAtom);
  const state = useRecoilValue(stateAtom);
  const { hovered, ref } = useHover();
  const [subtask, setSubtask] = useState<boolean>(false);
  if (open)
    return (
      <div className="h-full" key={task.id}>
        <UpdateTask
          task={task}
          setOpen={setOpen}
          index={index}
          type={date && "calendar"}
        />
      </div>
    );
  return (
    <div
      className={`w-full rounded  ${
        sub ? "" : "border-solid border-gray-200 px-4 py-2"
      }`}
      ref={ref}
    >
      {task && (
        <div className="w-full h-full flex-col">
          <div className="my-0 flex justify-between">
            <div className="flex space-x-2 self-center">
              {sub ? (
                subtask ? (
                  <ActionIcon onClick={() => setSubtask(false)} size="sm">
                    <AiOutlineDown color="gray" />
                  </ActionIcon>
                ) : (
                  <ActionIcon onClick={() => setSubtask(true)} size="sm">
                    <AiOutlineRight color="gray" />
                  </ActionIcon>
                )
              ) : (
                <div></div>
              )}
              {goal ? (
                <div className="self-center">
                  <GoalCheckBox task={task} index={index} />
                </div>
              ) : (
                <div className="self-center">
                  <Checkbox
                    checked={false}
                    onChange={() =>
                      mutation.mutate({ ...task, statement: true })
                    }
                  />
                </div>
              )}

              <p className="m-0 text-lg font-semibold font-sans text-textBlack">
                {task?.name}
              </p>
            </div>

            {/* buttons */}

            {hovered &&
            (task.box == "inbox" || state.first === task.box || sub) ? (
              <>
                <div className="flex space-x-2">
                  <EditButton
                    onClick={(e) => {
                      setOpen(true);
                      e?.stopPropagation();
                    }}
                  />
                  <SeparateButton
                    onClick={(e) => {
                      setModal({ id: task.id, open: true });
                      e.stopPropagation();
                    }}
                  />
                  {task.box === "inbox" ? (
                    <DistributeButton task={task} index={index} />
                  ) : (
                    <MenuButton task={task} index={index} />
                  )}
                  <ChatGpt text={task.name} />
                </div>
              </>
            ) : (
              <div className="h-7"></div>
            )}
          </div>

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
            <div className="ml-9 mr-1 mt-2 m-0">
              <Memo memo={task?.memo} />
            </div>
          )}

          {subtask && <SubTasks taskId={task.id} open={openadd} />}
          <PromptBadge task={task} />
        </div>
      )}
    </div>
  );
};

export default TaskLayout;
