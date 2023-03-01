import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../types/Types";
import { deleteTask } from "../api/DeleteApi";
const useDeleteTask = (task: TaskType, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTask, {
    onMutate: async () => {
      console.log(task.box);
      queryClient.cancelQueries([task.box]);
      const previousData = queryClient.getQueryData([task.box]);
      queryClient.setQueryData([task.box], (old: TaskType[] | undefined) => {
        if (old) {
          const newAry = [...old];
          newAry.splice(index, 1);
          return newAry;
        }
      });
      return { previousData };
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
