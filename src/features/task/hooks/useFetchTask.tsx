import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher, URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";

export const useFetchTasks = (box: string) => {
  const user: User = useSelector(selectUser);
  const { data, error, mutate } = useSWR(
    `${URL}/do_tasks?id=${user.uid}&box=${box}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};
