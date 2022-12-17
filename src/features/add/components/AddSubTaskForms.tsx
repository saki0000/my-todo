import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { task } from "../../../Types";
import useFetchSubTask from "../../show/hooks/useFetchSubTask";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";

import { addSubTask } from "../api/AddApi";

const AddSubTaskForms = ({ taskValue, setOpen, mutate }: any) => {
  const modalValue = useRecoilValue(separateAtom);
  const { data: subtasks, mutate: subMutate } = useFetchSubTask(taskValue.id);
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
  const onSubmit: SubmitHandler<task & { task_id: number }> = async (data) => {
    await addSubTask(modalValue.id, data);
    await subMutate([...subtasks, data], false);
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
