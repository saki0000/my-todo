import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { addTask } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { boxType, DateFormat, task, User } from "../../../Types";
import Box from "../edit/Box";
import DateSelect from "../edit/Date";
import DueDate from "../edit/DueDate";
import Weight from "../edit/Weight";

type Props = {
  box: boxType;
  date?: DateFormat | string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutate: any;
};
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const AddForms = ({ box, date, setOpen, mutate }: Props) => {
  const user: User = useSelector(selectUser);
  const initialValue = {
    user_id: user.uid,
    name: "",
    box: box,
    date: date || "",
    due_date: "期日",
    weight: "",
    subtasks: [],
    statement: false,
    memo: "",
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<StateTask>({ defaultValues: initialValue });
  const onSubmit: SubmitHandler<StateTask> = (data) => {
    mutate(addTask(data));
    setOpen(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            placeholder="Name"
            {...register("name")}
            style={{ width: "auto" }}
          />
          <Group>
            <Weight control={control} />
            <DueDate control={control} />
            <Box control={control} />
            {watch().box === "calender" && <DateSelect control={control} />}
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
            <Button
              type="submit"
              variant="light"
              color="brown"
              radius="md"
              // onClick={() => {
              //   // setAddTask(initial);
              //   // mutate(addTask(addTaskData));
              //   setOpen(true);
              // }}
            >
              追加
            </Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
};

export default AddForms;
