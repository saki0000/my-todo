import axios from "axios";
import React from "react";

const useAddTask = () => {
  const addTask = async (body: any) => {
    await axios
      .post(`http://localhost:4000/api/v1/tasks`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addSubTask = async (id: number, body: any) => {
    await axios
      .post(`http://localhost:4000/api/v1/tasks/${id}/subtasks`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return addTask;
};

export default useAddTask;
