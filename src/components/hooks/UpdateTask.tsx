import axios from "axios";

const useUpdateTask = () => {
  const updateTask = async (id: number, body: any) => {
    await axios
      .put(`http://localhost:4000/api/v1/tasks/${id}`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return updateTask;
};

export default useUpdateTask;
