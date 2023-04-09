import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoxType, TaskType } from "../../../types/Types";
import { updateTaskAPI } from "../../update/api/UpdateApi";
const useDeleteTask = (
  task: TaskType,
  index: number,
  key: BoxType | number | null
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: TaskType) => updateTaskAPI(task.id, newData),
    {
      onMutate: async () => {
        queryClient.cancelQueries([key]);
        const previousData = queryClient.getQueryData([key]);
        queryClient.setQueryData([key], (old: TaskType[] | undefined) => {
          if (old) {
            const newAry = [...old];
            newAry.splice(index, 1);
            return newAry;
          }
        });
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData([key], context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries([key]);
      },
    }
  );
  return mutation;
};

export default useDeleteTask;
