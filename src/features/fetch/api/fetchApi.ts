import axios from "axios";
import { URL } from "../../../api";
export const fetchData = async (uid: string) => {
  const res = await axios.get(`${URL}/do_tasks?id=${uid}&box=nextAction`);
  return res.data;
};
export const fetchTask = async (id: number) => {
  const res = await axios.get(`${URL}/tasks/${id}`);
  return res.data;
};
