import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { task } from "../../../Types";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";

import { addSubTask } from "../api/AddApi";

const AddSubTaskForms = ({ taskValue, setOpen }: any) => {
  const modalValue = useRecoilValue(separateAtom);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newData: task) => addSubTask(modalValue.id, newData),
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
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<task & { task_id: number }>({
    defaultValues: {
      task_id: modalValue.id,
      name: "",
      box: taskValue.box,
      date: taskValue.date,
      due_date: "",
      weight: "",
      statement: false,
      memo: "",
    },
  });
  const onSubmit: SubmitHandler<task & { task_id: number }> = (data) => {
    mutation.mutate(data);
    setOpen(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput placeholder="Name" {...register("name")}></TextInput>
        <Group>
          <Weight control={control} />
          <DueDate control={control} />
        </Group>
        <Textarea placeholder="Memo" {...register("memo")}></Textarea>
        <Group>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="light"
            color="red"
            radius="md"
            type="button"
          >
            キャンセル
          </Button>
          <Button type="submit" variant="light" color="brown" radius="md">
            追加
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default AddSubTaskForms;
