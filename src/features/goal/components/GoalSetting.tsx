import { ActionIcon, HoverCard, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import "moment/locale/ja";
import { useRef } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting } from "react-icons/ai";
import Task from "../../../components/task/Task";
import { TaskType } from "../../../types/Types";
import useDnDTask from "../hooks/useDnDTask";

type Props = { goalTasks: TaskType[]; nextActionTasks?: TaskType[] };
type GoalRefType = {
  element: HTMLElement | null;
  today: string | null;
  isHover: boolean;
};
type TaskRefType = { element: HTMLElement | null; isHover: boolean };
const dt = moment().format("YYYY-MM-DD");

const GoalSetting = ({ goalTasks, nextActionTasks }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const goalAreaRef = useRef<GoalRefType>({
    element: null,
    today: null,
    isHover: false,
  }).current;
  const taskAreaRef = useRef<TaskRefType>({
    element: null,
    isHover: false,
  }).current;

  const result = useDnDTask<TaskType>(
    nextActionTasks
      ? nextActionTasks.filter((v: TaskType) => v.goal !== dt)
      : [],
    goalTasks ? goalTasks : [],
    taskAreaRef,
    goalAreaRef
  );
  return (
    <div>
      <Modal
        onClose={close}
        opened={opened}
        fullScreen
        classNames={{ body: "h-5/6" }}
      >
        <div className="h-full grid grid-cols-8 gap-8" id="parent">
          <div className="col-span-4">
            <div>
              <p className="my-4 font-semibold text-lg">Next Action List</p>
            </div>
            <div
              className="h-full p-4 border-dashed border-blue-400 rounded space-y-1"
              ref={(e) => {
                if (!e) return;
                taskAreaRef.element = e;
              }}
              id="task"
            >
              {result &&
                result.tasks &&
                result.tasks.map((item, index: number) => (
                  <div
                    className="pl-2 bg-white hover:bg-slate-50 hover:cursor-grabbing rounded"
                    key={item.key}
                    {...item.events}
                  >
                    <Task task={item.value} index={index} />
                  </div>
                ))}
              <div
                id="addArea"
                className="border-dashed border-blue-400 rounded h-14  bg-blue-50 invisible grid place-content-center"
              >
                <div className="flex gap-2">
                  <AiOutlinePlusCircle size={20} color="#3b82f6" />
                  <p className="text-blue-500 m-0 leading-5">
                    Drop and Delete Goal
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div>
              <p className="my-4 font-semibold text-lg">Today's Goal</p>
            </div>
            <div
              ref={(e) => {
                if (!e) return;
                goalAreaRef.element = e;
                goalAreaRef.today = dt;
              }}
              className="h-full p-4 border-dashed border-blue-400 rounded space-y-1"
              id="goal"
            >
              {result &&
                result.goal &&
                result.goal.map((item, index: number) => (
                  <div
                    className="pl-2 bg-white hover:bg-slate-50 hover:cursor-grabbing rounded"
                    key={item.key}
                    {...item.events}
                  >
                    <Task task={item.value} index={index} />
                  </div>
                ))}
              <div
                id="addArea"
                className="border-dashed border-blue-400 rounded h-14  bg-blue-50 invisible grid place-content-center"
              >
                <div className="flex gap-2">
                  <AiOutlinePlusCircle size={20} color="#3b82f6" />
                  <p className="text-blue-500 m-0 leading-5">
                    Drop and Set Goal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <HoverCard position="top" shadow="md">
        <HoverCard.Target>
          <ActionIcon onClick={open}>
            <AiOutlineSetting />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <p className="m-0">目標を設定</p>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default GoalSetting;
