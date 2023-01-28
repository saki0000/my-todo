import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher, URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";

export const useFetchGoal = () => {
  const user: User = useSelector(selectUser);
  const { data, error, mutate } = useSWR(
    `${URL}/goal_tasks?id=${user.uid}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};
