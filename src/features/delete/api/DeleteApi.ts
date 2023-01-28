import axios from "axios";
import { URL } from "../../../api";

export const deleteTask = async (id: number): Promise<void> => {
  await axios
    .delete(`${URL}/tasks/${id}`)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteSubTask = async (taskId: any, id: number): Promise<void> => {
  await axios
    .delete(`${URL}/tasks/${taskId.id}/subtasks/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
