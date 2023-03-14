import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Task from "../../../components/task/Task";
import { selectUser } from "../../../redux/userSlice";
import { TaskType, User } from "../../../types/Types";
import useFetchBoxTasks from "../../fetch/hooks/useFetchBoxTasks";
import useDnDTask from "../hooks/useDnDTask";

type Props = { goalTasks: TaskType[] };
type RefType = { element: HTMLElement | null };
const GoalSetting = ({ goalTasks }: Props) => {
  const user: User = useSelector(selectUser);

  const [opened, { open, close }] = useDisclosure(false);
  const ref = useRef<RefType>({
    element: null,
  }).current;
  const { data, error, isLoading, isError } = useFetchBoxTasks();
  const result = useDnDTask<TaskType>(goalTasks, ref);
  return (
    <div>
      <Modal
        onClose={close}
        opened={opened}
        fullScreen
        classNames={{ body: "h-5/6" }}
      >
        <div className="h-full grid grid-cols-9">
          <div className="col-span-4">
            {result &&
              result.map((item, index: number) => (
                <div key={item.key} {...item.events}>
                  <Task task={item.value} index={index} />
                </div>
              ))}
          </div>
          <div className="col-span-1"></div>
          <div
            ref={(e) => {
              if (!e) return;
              const rect = e.getBoundingClientRect();
              ref.element = e;
            }}
            className="col-span-4"
          ></div>
        </div>
      </Modal>
      <Button radius="lg" onClick={open}>
        Setting Goals
      </Button>
    </div>
  );
};

export default GoalSetting;
