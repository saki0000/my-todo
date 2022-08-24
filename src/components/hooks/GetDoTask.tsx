import axios from "axios";
import { useEffect, useState } from "react";

const useGetDoTask = (date: any) => {
  const [tasks, setTasks] = useState<any>();
  const getTasks = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/do_tasks?id=1&date=${date}`)
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
