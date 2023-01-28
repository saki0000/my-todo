import { useMutation, useQueryClient } from "@tanstack/react-query";
import { task } from "../../../Types";
import { deleteTask } from "../api/DeleteApi";
type TaskType = task & { id: number };
const useDeleteTask = (task: TaskType, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTask, {
    onMutate: async (newData) => {
      queryClient.cancelQueries([task.box]);
      const previousData = queryClient.getQueryData([task.box]);
      queryClient.setQueryData([task.box], (old: task[] | undefined) => {
        if (old) {
          const newAry = [...old];
          newAry.splice(index, 1);
          return newAry;
        }
      });
      return { previousData, newData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData([task.box], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries([task.box]);
    },
  });
  return mutation;
};

export default useDeleteTask;
