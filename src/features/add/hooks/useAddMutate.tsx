import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoxType } from "../../../types/Types";
import { addTask } from "../api/AddApi";
import { AddTaskType } from "../type/FeatureAddType";
const useAddMutate = (box: BoxType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onMutate: async (newData: AddTaskType) => {
      queryClient.cancelQueries([box]);
      const previousData = queryClient.getQueryData([box]);
      queryClient.setQueryData(
        [box],
        (old: AddTaskType[] | undefined) => old && [...old, newData]
      );
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData([box], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries([box]);
    },
  });
  return mutation;
};

export default useAddMutate;
