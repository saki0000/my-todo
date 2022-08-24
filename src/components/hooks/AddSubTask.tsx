import axios from "axios";
import React from "react";

const useAddSubTask = () => {
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
  return addSubTask;
};

export default useAddSubTask;
