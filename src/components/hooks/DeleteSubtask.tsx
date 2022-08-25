import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectSeparate } from "../../features/counterSlice";

const useDeleteSubtask = () => {
  const taskId = useSelector(selectSeparate);
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/v1/tasks/${taskId.id}/subtasks/${id}`)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return deleteTask;
};

export default useDeleteSubtask;
