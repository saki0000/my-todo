import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubTask } from "../api/AddApi";
import { AddTaskType } from "../type/FeatureAddType";

const useAddSubTask = (id: number) => {
  console.log(id);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData: AddTaskType) => addSubTask(id, newData),
    onMutate: async (newData) => {
      queryClient.cancelQueries([id]);
      const previousData = queryClient.getQueryData([id]);
      queryClient.setQueryData([id], (old: any) => old && [...old, newData]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData([id], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries([id]);
    },
  });
  return mutation;
};

export default useAddSubTask;
