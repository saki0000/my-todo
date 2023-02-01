import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../Types";
import { updateTaskAPI } from "../api/UpdateApi";
type StateTask = Omit<TaskType, "updated_at" | "created_at" | "id">;

const useUpdateTask = (task: any, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: StateTask) => updateTaskAPI(task.id, newData),
    {
      onMutate: async (newData: StateTask) => {
        queryClient.cancelQueries([task.box]);
        const previousData = queryClient.getQueryData([task.box]);

        queryClient.setQueryData([task.box], (old: StateTask[] | undefined) => {
          if (old) {
            const newAry = [...old];
            newAry.splice(index, 1, newData);
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
    }
  );
  return mutation;
};

export default useUpdateTask;
