import { useMutation, useQueryClient } from "@tanstack/react-query";
import { task } from "../../../Types";
import { updateSubTask } from "../api/UpdateApi";
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;

const useUpdateSubTask = (task: any, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: StateTask) => updateSubTask(task.task_id, task.id, newData),
    {
      onMutate: async (newData: StateTask) => {
        queryClient.cancelQueries([task.task_id]);
        const previousData = queryClient.getQueryData([task.task_id]);

        queryClient.setQueryData([task.task_id], (old: any) => {
          const newAry = [...old];
          newAry.splice(index, 1, newData);
          return newAry;
        });
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData([task.task_id], context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries([task.task_id]);
      },
    }
  );
  return mutation;
};

export default useUpdateSubTask;
