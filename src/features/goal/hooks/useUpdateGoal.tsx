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
        const previousGoalData = queryClient.getQueryData(["goal"]);

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

        return { previousGoalData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(["goal"], context?.previousGoalData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["goal"] });
        queryClient.invalidateQueries({ queryKey: ["nextAction"] });
      },
    }
  );
  return mutation;
};

export default useUpdateGoal;
