import axios from "axios";
import { useSelector } from "react-redux";
import { selectSeparate } from "../../features/counterSlice";

const useUpdateSubtask = () => {
  const updateSubTask = async (taskId: number, id: number, body: any) => {
    await axios
      .put(`http://localhost:4000/api/v1/tasks/${taskId}/subtasks/${id}`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return updateSubTask;
};

export default useUpdateSubtask;
