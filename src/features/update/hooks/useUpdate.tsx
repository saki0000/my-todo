import { useMutation, useQueryClient } from "@tanstack/react-query";
import { task } from "../../../Types";
import { updateTaskAPI } from "../api/UpdateApi";
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;

const useDistribute = (task: any, index: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((newData) => updateTaskAPI(task.id, newData), {
    onMutate: async (newData: StateTask) => {
      queryClient.cancelQueries([task.box]);
      const previousData = queryClient.getQueryData([task.box]);

      queryClient.setQueryData(
        [newData.box],
        (old: task[] | undefined) => old && [...old, newData]
      );
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
    onSettled: (newData, error, variables, context) => {
      queryClient.invalidateQueries([context?.newData.box]);
    },
  });
  return mutation;
};

export default useDistribute;
