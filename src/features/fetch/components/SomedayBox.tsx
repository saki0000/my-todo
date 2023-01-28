import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../../../api";
import TaskBox from "../../../components/layout/box/TaskBox";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";

const SomedayBox = () => {
  const user: User = useSelector(selectUser);
  const fetchData = async () => {
    const res = await axios.get(`${URL}/do_tasks?id=${user.uid}&box=someday`);
    return res.data;
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["someday"],
    queryFn: fetchData,
  });
  return (
    <>
      <TaskBox
        box="someday"
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
      />
    </>
  );
};

export default SomedayBox;
