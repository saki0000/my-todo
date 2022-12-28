import { updateTaskAPI } from "../api/UpdateApi";
const useDistribute = () => {
  const distribute = (
    task: any,
    box: string,
    data: any,
    mutate: any,
    date?: any
  ) => {
    const newTask = date
      ? { ...task, box: box, date: date }
      : { ...task, box: box };
    updateTaskAPI(task.id, newTask);
    mutate([...data, newTask], false);
  };
  return distribute;
};

export default useDistribute;
