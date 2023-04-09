import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../types/Types";
import { deleteTask } from "../api/DeleteApi";
const useDeleteTask = (
  task: TaskType,
  index: number,
  key?: string | number
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((newData: TaskType) => deleteTask(task.id), {
    onMutate: async () => {
      queryClient.cancelQueries([task.parent_id]);
      const previousData = queryClient.getQueryData([task.parent_id]);
      queryClient.setQueryData(
        [task.parent_id],
        (old: TaskType[] | undefined) => {
          if (old) {
            console.log(old);
            const newAry = [...old];
            newAry.splice(index, 1);
            return newAry;
          }
        }
      );
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData([task.parent_id], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries([task.parent_id]);
    },
  });
  return mutation;
};

export default useDeleteTask;
