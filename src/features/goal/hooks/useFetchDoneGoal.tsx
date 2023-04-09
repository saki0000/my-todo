import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import "moment/locale/ja";
import { useSelector } from "react-redux";
import { URL } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../types/Types";

export const useFetchDoneGoal = () => {
  const user: User = useSelector(selectUser);

  const fetchData = async () => {
    const dt = moment().format("YYYY-MM-DD");
    const res = await axios.get(
      `${URL}/goal_done_tasks?id=${user.uid}&goal=${dt}`
    );
    return res.data;
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["doneGoal"],
    queryFn: fetchData,
  });
  return { data, isLoading, error, isError };
};
