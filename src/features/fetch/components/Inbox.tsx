import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../../../api";
import TaskBox from "../../../components/layout/box/TaskBox";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../Types";

const Inbox = () => {
  const user: User = useSelector(selectUser);
  const fetchData = async () => {
    const res = await axios.get(`${URL}/do_tasks?id=${user.uid}&box=inbox`);
    return res.data;
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["inbox"],
    queryFn: fetchData,
  });

  return (
    <>
      <TaskBox
        box={"inbox"}
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
      />
    </>
  );
};

export default Inbox;
