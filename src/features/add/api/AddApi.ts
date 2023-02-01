import axios from "axios";
import { URL } from "../../../api";
import { AddSubTaskType, AddTaskType } from "../type/FeatureAddType";

export const addSubTask = async (
  id: number,
  body: AddSubTaskType
): Promise<void> => {
  await axios
    .post(`${URL}/tasks/${id}/subtasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTask = async (body: AddTaskType): Promise<void> => {
  await axios
    .post(`${URL}/tasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
