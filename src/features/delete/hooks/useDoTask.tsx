import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "../../../types/Types";
import { updateTaskAPI } from "../../update/api/UpdateApi";

const useDoneTask = (task: TaskType, index: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData: TaskType) => updateTaskAPI(task.id, newData),
    {
      onMutate: async (newData: TaskType) => {
        queryClient.cancelQueries(["doneGoal"]);
        const previousData = queryClient.getQueryData(["doneGoal"]);
        queryClient.setQueryData(
          ["doneGoal"],
          (old: TaskType[] | undefined) => {
            if (old) {
              const newAry = [...old];
              newAry.splice(index, 1);
              return newAry;
            }
          }
        );
        queryClient.setQueryData(
          ["goal"],
          (old: TaskType[] | undefined) => old && [...old, newData]
        );
        return { previousData };
      },
      onError: (err, newData, context) => {
        queryClient.setQueryData(["doneGoal"], context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["doneGoal"]);
        queryClient.invalidateQueries(["goal"]);
      },
    }
  );
  return mutation;
};

export default useDoneTask;
