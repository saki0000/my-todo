import { deleteTask } from "../api/DeleteApi";

const useDeleteCache = () => {
  const deleteData = (
    data: any,
    mutate: (data: any, refetch: boolean) => void,
    index: number,
    id?: number
  ) => {
    const newData = [...data];
    newData.splice(index, 1);
    id && deleteTask(id);
    mutate(newData, false);
  };
  return deleteData;
};

export default useDeleteCache;
