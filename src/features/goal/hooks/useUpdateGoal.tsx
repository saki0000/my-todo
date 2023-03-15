import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../types/Types";
import { updateTaskAPI } from "../../update/api/UpdateApi";
type StateTask = Omit<TaskType, "updated_at" | "created_at">;
const useUpdateGoal = (
  index?: number | undefined,
  type?: string | undefined
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: StateTask) => updateTaskAPI(newData.id, newData),
    {
      onMutate: async (newData: StateTask) => {
        queryClient.cancelQueries(["goal"]);
        const previousData = queryClient.getQueryData(["goal"]);

        queryClient.setQueryData(["goal"], (old: StateTask[] | undefined) => {
          if (old) {
            if (index && type) {
              const newAry = [...old];
              newAry.splice(index, 1, newData);
              return newAry;
            } else {
              return [...old, newData];
            }
          }
        });
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(["goal"], context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["goal"]);
      },
    }
  );
  return mutation;
};

export default useUpdateGoal;
