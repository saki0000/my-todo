import { ActionIcon, HoverCard, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { hoverAtom } from "../../../atoms/hoverAtom";
import Task from "../../../components/task/Task";
import { TaskType } from "../../../types/Types";
import useFetchBoxTasks from "../../fetch/hooks/useFetchBoxTasks";
import useDnDTask from "../hooks/useDnDTask";

type Props = { goalTasks: TaskType[] };
type GoalRefType = {
  element: HTMLElement | null;
  today: string | null;
  isHover: boolean;
};
type TaskRefType = { element: HTMLElement | null; isHover: boolean };
const date = new Date();
const dt = date.toJSON().split("T")[0];

const GoalSetting = ({ goalTasks }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [hover] = useRecoilState(hoverAtom);
  const goalAreaRef = useRef<GoalRefType>({
    element: null,
    today: null,
    isHover: false,
  }).current;
  const taskAreaRef = useRef<TaskRefType>({
    element: null,
    isHover: false,
  }).current;
  const { data, error, isLoading, isError } = useFetchBoxTasks();

  const result = useDnDTask<TaskType>(
    data ? data.filter((v: TaskType) => v.goal !== dt) : [],
    goalTasks,
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
              className="h-full p-4 border-dashed border-blue-400 rounded"
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
                    Drop and Add Task
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
              className="h-full p-4 border-dashed border-blue-400 rounded"
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
                    Drop and Add Task
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
