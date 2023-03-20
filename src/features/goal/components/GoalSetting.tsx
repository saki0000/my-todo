import { ActionIcon, HoverCard, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { AiOutlineSetting } from "react-icons/ai";
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
        <div className="h-full grid grid-cols-9" id="parent">
          <div
            className={`col-span-4 ${hover?.goal && "bg-slate-500"}`}
            ref={(e) => {
              if (!e) return;
              taskAreaRef.element = e;
            }}
            id="task"
          >
            {result &&
              result.tasks &&
              result.tasks.map((item, index: number) => (
                <div key={item.key} {...item.events}>
                  <Task task={item.value} index={index} />
                </div>
              ))}
          </div>
          <div className="col-span-1"></div>
          <div
            ref={(e) => {
              if (!e) return;
              goalAreaRef.element = e;
              goalAreaRef.today = dt;
            }}
            className={`col-span-4 ${hover?.task && "bg-slate-500"}`}
            id="goal"
          >
            {result &&
              result.goal &&
              result.goal.map((item, index: number) => (
                <div key={item.key} {...item.events}>
                  <Task task={item.value} index={index} />
                </div>
              ))}
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
