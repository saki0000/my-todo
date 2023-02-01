import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { addSubTask } from "../api/AddApi";
import { AddSubTaskType } from "../type/FeatureAddType";

const useAddSubTask = () => {
  const modalValue = useRecoilValue(separateAtom);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData: AddSubTaskType) => addSubTask(modalValue.id, newData),
    onMutate: async (newData) => {
      queryClient.cancelQueries([modalValue.id]);
      const previousData = queryClient.getQueryData([modalValue.id]);
      queryClient.setQueryData([modalValue.id], (old: any) => [
        ...old,
        newData,
      ]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData([modalValue.id], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries([modalValue.id]);
    },
  });
  return mutation;
};

export default useAddSubTask;
