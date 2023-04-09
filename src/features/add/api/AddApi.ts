import axios from "axios";
import { URL } from "../../../api";
import { AddTaskType } from "../type/FeatureAddType";

export const addSubTask = async (
  id: number,
  body: AddTaskType
): Promise<void> => {
  await axios
    .post(`${URL}/create?id=${id}`, body)
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
