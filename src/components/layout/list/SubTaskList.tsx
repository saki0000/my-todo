import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { SubTaskType, User } from "../../../types/Types";
import SubTask from "../../task/SubTask";

const SubTasks = ({ taskId }: { taskId: number }) => {
  const user: User = useSelector(selectUser);

  const fetchData = async () => {
    const res = await axios.get(
      `${URL}/tasks/${taskId}/subtasks?id=${user.uid}`
    );
    return res.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [taskId],
    queryFn: fetchData,
  });
  if (isLoading) return <></>;
  if (isError) return <div></div>;
  console.log(data);
  return (
    <>
      <div className="my-2 ml-4 mr-2" key={taskId}>
        {data &&
          data?.map((task: SubTaskType, index: number) => (
            <div className="my-3">
              <SubTask task={task} index={index} taskId={taskId} />
            </div>
          ))}
      </div>
    </>
  );
};

export default SubTasks;
