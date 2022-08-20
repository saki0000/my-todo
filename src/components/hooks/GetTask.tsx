import { useSetState } from "@mantine/hooks";
import axios from "axios";
import { useEffect } from "react";

const useGetTask = () => {
  const [tasks, setTasks] = useSetState<any>([
    {
      created_at: "",
      date: "",
      due_date: "",
      id: 0,
      memo: "",
      name: "",
      statement: true,
      updated_at: "",
      user_id: 0,
      weight: 0,
    },
  ]);
  const getTask = async () => {
    await axios
      .get("http://localhost:4000/api/v1/tasks?id=1")
      .then((res) => {
        setTasks(res.data);
        console.log(tasks);
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

export default useGetTask;
