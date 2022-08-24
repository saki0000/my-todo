import axios from "axios";

const useDeleteTask = () => {
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/v1/tasks/${id}`)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return deleteTask;
};

export default useDeleteTask;
