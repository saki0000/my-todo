import { useQuery } from "@tanstack/react-query";
import { fetchSubTask } from "../../features/fetch/api/fetchApi";
import { TaskType } from "../../types/Types";
import Project from "./Project";
import TaskLayout from "./TaskLayout";

type props = {
  task: TaskType;
  index: number;
  date?: string;
  goal?: boolean;
  sub?: boolean;
  openadd?: boolean;
};
const Task = ({ task, index, date, goal, sub, openadd }: props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [task.id],
    queryFn: () => fetchSubTask(task.id),
    retry: 5,
    enabled: task.id != 0,
  });
  if (isLoading) return <></>;
  if (isError) return <div></div>;
  if (data && data.length)
    return (
      <div>
        <Project data={data} task={task} index={index} />
      </div>
    );
  return (
    <div>
      <TaskLayout
        task={task}
        index={index}
        date={date}
        goal={goal}
        sub={sub}
        openadd={openadd}
      />
    </div>
  );
};

export default Task;
