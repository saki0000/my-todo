import { useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher, URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";

const useFetchDateTask = (date: string) => {
  const user: User = useSelector(selectUser);
  const { data, error, mutate } = useSWR(
    `${URL}/date_tasks?id=${user.uid}&date=${date}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export default useFetchDateTask;
