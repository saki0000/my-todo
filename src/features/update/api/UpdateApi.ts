import axios from "axios";
import { URL } from "../../../api";

export const updateTaskAPI = async (id: number, body: any) => {
  console.log(body);
  await axios
    .put(`${URL}/tasks/${id}`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateSubTask = async (taskId: number, id: number, body: any) => {
  await axios
    .put(`${URL}/tasks/${taskId}/subtasks/${id}`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
