import { ActionIcon, HoverCard, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import Task from "../../../components/task/Task";
import { selectUser } from "../../../redux/userSlice";
import { TaskType, User } from "../../../types/Types";
import useFetchBoxTasks from "../../fetch/hooks/useFetchBoxTasks";
import useDnDTask from "../hooks/useDnDTask";

type Props = { goalTasks: TaskType[] };
type GoalRefType = { element: HTMLElement | null; today: string | null };
type TaskRefType = { element: HTMLElement | null };
const date = new Date();
const dt = date.toJSON().split("T")[0];
const GoalSetting = ({ goalTasks }: Props) => {
  const user: User = useSelector(selectUser);
  const [opened, { open, close }] = useDisclosure(false);
  const goalAreaRef = useRef<GoalRefType>({
    element: null,
    today: null,
  }).current;
  const taskAreaRef = useRef<TaskRefType>({
    element: null,
  }).current;
  const { data, error, isLoading, isError } = useFetchBoxTasks();

  const result = useDnDTask<TaskType>(
    data && data.filter((v: TaskType) => v.goal !== dt),
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
            className="col-span-4"
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
            className="col-span-4"
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
