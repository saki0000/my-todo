import { task } from "../../../Types";
import useFetchSubTask from "../hooks/useFetchSubTask";
import SubTask from "./SubTask";

type TaskType = task & { id: number };

const SubTasks = ({ taskId }: { taskId: number }) => {
  const { data: subtasks, isLoading, error } = useFetchSubTask(taskId);

  if (isLoading) return <></>;
  if (error) return <div>error</div>;
  return (
    <>
      <div className="my-2 ml-4 mr-2">
        {subtasks &&
          subtasks?.map((task: TaskType, index: number) => (
            <div className="my-3">
              <SubTask task={task} index={index} />
            </div>
          ))}
      </div>
    </>
  );
};

export default SubTasks;
