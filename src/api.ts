/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const getDoneTasks = (user: any) => {
  const { data, error, mutate } = useSWR(
    `http://localhost:4000/api/v1/done_tasks?id=${user.uid}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const getDoTasks = (user: any, box: string) => {
  const { data, error, mutate } = useSWR(
    `http://localhost:4000/api/v1/do_tasks?id=${user.uid}&box=${box}`,
    fetcher
    // {
    //   refreshInterval: 5000,
    // }
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const getTask = (id: any) => {
  const { data, error, mutate } = useSWR(
    id !== 0 && `http://localhost:4000/api/v1/tasks/${id}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export const addSubTask = async (id: number, body: any) => {
  await axios
    .post(`http://localhost:4000/api/v1/tasks/${id}/subtasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTask = async (body: any) => {
  await axios
    .post(`http://localhost:4000/api/v1/tasks`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTask = async (id: number, body: any) => {
  await axios
    .put(`http://localhost:4000/api/v1/tasks/${id}`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateSubTask = async (taskId: number, id: number, body: any) => {
  await axios
    .put(`http://localhost:4000/api/v1/tasks/${taskId}/subtasks/${id}`, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteTask = (id: number) => {
  axios
    .delete(`http://localhost:4000/api/v1/tasks/${id}`)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteSubTask = (taskId: any, id: number) => {
  axios
    .delete(`http://localhost:4000/api/v1/tasks/${taskId.id}/subtasks/${id}`)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
