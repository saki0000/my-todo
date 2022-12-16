import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { addSubTask } from "../../api";
import { separateAtom } from "../../atoms/openAtom";
import { task } from "../../Types";
import DueDate from "../edit/DueDate";
import Weight from "../edit/Weight";

const AddSubTaskForms = ({ taskValue, setOpen, mutate }: any) => {
  const modalValue = useRecoilValue(separateAtom);
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
      due_date: "期日",
      weight: "",
      statement: false,
      memo: "",
    },
  });
  const onSubmit: SubmitHandler<task & { task_id: number }> = (data) => {
    mutate(addSubTask(modalValue.id, data));
    setOpen(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Group position="apart">
          <TextInput placeholder="Name" {...register("name")}></TextInput>
          <Group>
            <Weight control={control} />
            <DueDate control={control} />
          </Group>
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
