import { useQuery } from "@tanstack/react-query";
import AddSubTask from "../../../features/add/components/AddSubTask";
import { fetchSubTask } from "../../../features/fetch/api/fetchApi";
import { SubTaskType } from "../../../types/Types";
import Task from "../../task/TaskLayout";

const SubTasks = ({ taskId, open }: { taskId: number; open?: boolean }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [taskId],
    queryFn: () => fetchSubTask(taskId),
  });
  if (isLoading) return <></>;
  if (isError) return <div></div>;
  return (
    <>
      {data && data.length != 0 && (
        <div className="my-1 pl-8" key={taskId}>
          {data?.map((task: SubTaskType, index: number) => (
            <div className="my-2 flex space-x-2" key={index}>
              <Task task={task} index={index} sub={true} openadd={open} />
            </div>
          ))}
        </div>
      )}
      {open && (
        <>
          <div className="mt-4">
            <AddSubTask taskId={taskId} />
          </div>
        </>
      )}
    </>
  );
};

export default SubTasks;
