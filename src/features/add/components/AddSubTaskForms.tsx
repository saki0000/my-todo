import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../types/Types";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";
import useAddSubTask from "../hooks/useAddSubTask";
import { AddTaskType } from "../type/FeatureAddType";

type Props = { taskId: number; setOpen: (arg: boolean) => void };

const AddSubTaskForms = ({ taskId, setOpen }: Props) => {
  const user: User = useSelector(selectUser);
  const mutation = useAddSubTask(taskId);
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddTaskType>({
    defaultValues: {
      user_id: user.uid,
      name: "",
      due_date: "",
      weight: "",
      subtasks: [],
      statement: false,
      memo: "",
      goal: "",
    },
  });
  const onSubmit: SubmitHandler<AddTaskType> = (data: AddTaskType) => {
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
