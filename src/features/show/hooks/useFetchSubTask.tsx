import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher, URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";
const useFetchSubTask = (taskId: number) => {
  const user: User = useSelector(selectUser);
  const { data, error, mutate } = useSWR(
    `${URL}/tasks/${taskId}/subtasks?id=${user.uid}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export default useFetchSubTask;
