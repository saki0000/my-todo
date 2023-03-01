import { useMemo } from "react";
import { TaskType } from "../../../types/Types";
const useGetDiffDate = (task: TaskType) => {
  const diffDate = useMemo(() => {
    if (task.created_at) {
      const createdAtDate = new Date(task.created_at);
      const today = new Date();
      const diffTime = today.getTime() - createdAtDate.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
  }, [task.created_at]);

  return diffDate;
};

export default useGetDiffDate;
