import axios from "axios";
import { URL } from "../../../api";
export const fetchTask = async (id: number) => {
  const res = await axios.get(`${URL}/tasks/${id}`);
  return res.data;
};
