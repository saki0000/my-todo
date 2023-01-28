import axios from "axios";
import { URL } from "../../../api";

export const fetchCalendarTask = async (uid: string, date: string) => {
  const res = await axios.get(`${URL}/date_tasks?id=${uid}&date=${date}`);
  return res.data;
};
