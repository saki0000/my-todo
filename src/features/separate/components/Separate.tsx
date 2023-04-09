import { Badge, Divider, Group, Modal } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import Memo from "../../../components/task/Memo";
import TaskLayout from "../../../components/task/TaskLayout";
import { TaskType } from "../../../types/Types";
import AddSubTask from "../../add/components/AddSubTask";
import { fetchSubTask, fetchTask } from "../../fetch/api/fetchApi";

const Separate = () => {
  const [modal, setOpen] = useRecoilState(separateAtom);
  const { data: task } = useQuery(
    ["separate", modal.id],
    () => fetchTask(modal.id),
    {
      enabled: modal.id !== 0,
    }
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: [modal.id],
    queryFn: () => fetchSubTask(modal.id),
  });
  if (isLoading) return <div></div>;
  // if (error) return <div>error</div>;
  return (
    <>
      <Modal
        onClose={() => {
          setOpen({ ...modal, open: false });
        }}
        opened={modal.open}
        size="lg"
        overlayOpacity={0.2}
        overlayBlur={1}
      >
        <div className="m-4 flex flex-col space-y-2">
          <div className="">
            {/* <Checkbox /> */}
            <p className="font-bold text-gray-400 text-4xl m-0">{task?.name}</p>
          </div>
          {task && !task.weight && !task.due_date ? (
            <></>
          ) : (
            <Group className=" mt-3">
              {task && task.weight && (
                <Badge color="brown">優先度:{task?.weight}</Badge>
              )}
              {task && task.due_date && (
                <Badge color="brown">期日:{task?.due_date}</Badge>
              )}
            </Group>
          )}
          <div className="mt-2 ml-2">
            <Memo memo={task?.memo} />
          </div>
          <Divider className="my-4" />
          <div>
            {data?.map((task: TaskType, index: number) => (
              <div className="my-2" key={index}>
                <TaskLayout task={task} index={index} sub={true} />
              </div>
            ))}
          </div>
          <AddSubTask taskId={modal.id} />
        </div>
      </Modal>
    </>
  );
};

export default Separate;
