import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../types/Types";
import { fetchData } from "../api/fetchApi";

const useFetchBoxTasks = () => {
  const user: User = useSelector(selectUser);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["nextAction"],
    queryFn: () => fetchData(user.uid),
  });
  return { data, error, isLoading, isError };
};

export default useFetchBoxTasks;
