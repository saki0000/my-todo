import { Badge, Group } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { separateAtom } from "../../atoms/openAtom";
import SeparateButton from "../../features/separate/components/SeparateButton";
import DistributeButton from "../../features/update/components/DistributeButton";
import EditButton from "../../features/update/components/EditButton";
import UpdateTask from "../../features/update/components/UpdateTask";
import { TaskType } from "../../types/Types";
import MenuButton from "../button/MenuButton";
import Memo from "./Memo";
import TaskLayout from "./TaskLayout";

type props = { data?: TaskType[]; task: TaskType; index: number; date?: any };
const Project = ({ data, task, index, date }: props) => {
  const { hovered, ref } = useHover();
  const [open, setOpen] = useState<boolean>(false);

  const setModal = useSetRecoilState(separateAtom);
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
      ref={ref}
      className="w-full h-full px-4 p-2 bg-white rounded border-solid border-gray-200 hover:bg-gray-50"
    >
      <div className="flex justify-between">
        {/* <Checkbox /> */}
        <p className="font-bold text-gray-400 text-2xl my-1">{task?.name}</p>
        {hovered ? (
          task.box === "inbox" ? (
            <div className="self-center">
              <DistributeButton task={task} index={index} size={20} />
            </div>
          ) : (
            <>
              <div className="flex space-x-2 self-center">
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

                <MenuButton task={task} index={index} />
              </div>
            </>
          )
        ) : (
          <></>
        )}
      </div>
      {!task.weight && !task.due_date ? (
        <></>
      ) : (
        <Group className=" mt-2">
          {task.weight && <Badge color="brown">優先度:{task?.weight}</Badge>}
          {task.due_date && <Badge color="brown">期日:{task?.due_date}</Badge>}
        </Group>
      )}
      <div className="mt-2 ml-2">
        <Memo memo={task?.memo} />
      </div>
      <div>
        {data?.map((task: TaskType, index: number) => (
          <div className="my-2" key={index}>
            <TaskLayout task={task} index={index} sub={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
