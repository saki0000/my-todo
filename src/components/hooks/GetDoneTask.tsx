import axios from "axios";
import { useEffect, useState } from "react";

const useGetDoneTask = () => {
  const [tasks, setTasks] = useState<any>([
    {
      created_at: "",
      date: "",
      due_date: "",
      id: 0,
      memo: "",
      name: "",
      statement: true,
      subtasks: [],
      updated_at: "2022--19T10:21:53.811Z",
      user_id: 0,
      weight: 0,
    },
  ]);
  const getTask = async () => {
    await axios
      .get("http://localhost:4000/api/v1/done_tasks?id=1")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return tasks;
};

export default useGetDoneTask;
