/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";

export const URL = "https://asap-task.onrender.com/api/v1";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);
