import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/AddApi";
import { AddTaskType } from "../type/FeatureAddType";

const useAddCalendarTask = (date: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTask,
    onMutate: async (newData) => {
      queryClient.cancelQueries(["calender", date]);
      const previousData = queryClient.getQueryData(["calender", date]);
      queryClient.setQueryData(
        ["calender", date],
        (old: AddTaskType[] | undefined) => old && [...old, newData]
      );
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(["calender", date], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["calender", date]);
    },
  });
  return mutation;
};

export default useAddCalendarTask;
