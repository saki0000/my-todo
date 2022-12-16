import axios from "axios";
import { URL } from "../../../api";

export const addSubTask = async (id: number, body: any) => {
  await axios
    .post(`${URL}/tasks/${id}/subtasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTask = async (body: any) => {
  await axios
    .post(`${URL}/tasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
