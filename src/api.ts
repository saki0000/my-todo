/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useSWR from "swr";
import { user } from "./Types";

const URL = "https://ghd-app-1qx7.onrender.com/api/v1";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const getDoneTasks = (user: any) => {
  const { data, error, mutate } = useSWR(
    `${URL}done_tasks?id=${user.uid}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const getDoTasks = (user: any, box: string) => {
  const { data, error, mutate } = useSWR(
    `${URL}/do_tasks?id=${user.uid}&box=${box}`,
    fetcher
    // {
    //   refreshInterval: 5000,
    // }
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const getTask = (id: any) => {
  const { data, error, mutate } = useSWR(
    id !== 0 && `${URL}/tasks/${id}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const dateTask = (user: user, date: string) => {
  const { data, error, mutate } = useSWR(
    `${URL}/date_tasks?id=${user.uid}&date=${date}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

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

export const updateTask = async (id: number, body: any) => {
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
