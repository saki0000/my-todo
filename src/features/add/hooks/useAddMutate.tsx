import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boxType, task } from "../../../Types";
import { addTask } from "../api/AddApi";

const useAddMutate = (box: boxType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onMutate: async (newData) => {
      queryClient.cancelQueries([box]);
      const previousData = queryClient.getQueryData([box]);
      queryClient.setQueryData(
        [box],
        (old: task[] | undefined) => old && [...old, newData]
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
