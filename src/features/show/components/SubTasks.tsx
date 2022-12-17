import { Loader } from "@mantine/core";
import { task } from "../../../Types";
import useFetchSubTask from "../hooks/useFetchSubTask";
import SubTask from "./SubTask";

type TaskType = task & { id: number };

const SubTasks = ({ taskId }: { taskId: number }) => {
  const { data: subtasks, isLoading, error } = useFetchSubTask(taskId);

  if (isLoading) return <Loader />;
  if (error) return <div>error</div>;
  return (
    <>
      <div className="my-2 mx-4">
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
