import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { SubTaskType } from "../../../types/Types";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";
import useAddSubTask from "../hooks/useAddSubTask";

type Props = { taskValue: any; setOpen: (arg: boolean) => void };

const AddSubTaskForms = ({ taskValue, setOpen }: Props) => {
  const modalValue = useRecoilValue(separateAtom);
  const mutation = useAddSubTask();
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<SubTaskType>({
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
  const onSubmit: SubmitHandler<SubTaskType> = (data: SubTaskType) => {
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
