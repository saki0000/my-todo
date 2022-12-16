import axios from "axios";
import { URL } from "../../../api";

export const deleteTask = (id: number) => {
  axios
    .delete(`${URL}/tasks/${id}`)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteSubTask = (taskId: any, id: number) => {
  axios
    .delete(`${URL}/tasks/${taskId.id}/subtasks/${id}`)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
