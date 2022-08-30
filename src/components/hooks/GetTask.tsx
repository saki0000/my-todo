import { useSetState } from "@mantine/hooks";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSeparate } from "../../features/counterSlice";

const useGetTask = () => {
  const id: any = useSelector(selectSeparate);
  const [tasks, setTasks] = useSetState<any>({
    box: "",
    created_at: "",
    date: "",
    due_date: "",
    id: 0,
    memo: "",
    name: "",
    statement: true,
    subtasks: [],
    updated_at: "",
    user_id: 0,
    weight: 0,
  });
  const getTask = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/tasks/${id.id}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    id.id !== undefined && getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [tasks, setTasks];
};

export default useGetTask;
