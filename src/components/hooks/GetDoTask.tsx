import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const useGetDoTask = (date: any) => {
  const [tasks, setTasks] = useState<any>();
  const user = useSelector(selectUser);
  const getTasks = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/do_tasks?id=${user.uid}&date=${date}`)
      .then((res) => {
        setTasks(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [tasks, setTasks];
};

export default useGetDoTask;
