import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../types/Types";
import { updateTaskAPI } from "../../update/api/UpdateApi";

const useDoneTask = (task: TaskType, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: TaskType) => updateTaskAPI(task.id, newData),
    {
      onMutate: async (newData: TaskType) => {
        queryClient.cancelQueries(["goal"]);
        const previousData = queryClient.getQueryData(["goal"]);
        queryClient.setQueryData(["goal"], (old: TaskType[] | undefined) => {
          if (old) {
            const newAry = [...old];
            newAry.splice(index, 1);
            return newAry;
          }
        });
        queryClient.setQueryData(
          ["doneGoal"],
          (old: TaskType[] | undefined) => old && [...old, newData]
        );
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(["goal"], context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["goal"]);
        queryClient.invalidateQueries(["doneGoal"]);
      },
    }
  );
  return mutation;
};

export default useDoneTask;
