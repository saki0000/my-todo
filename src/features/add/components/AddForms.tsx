import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { selectUser } from "../../../redux/userSlice";
import { boxType, DateFormat, task, User } from "../../../Types";
import { useFetchTasks } from "../../show/hooks/useFetchTask";

import Box from "../../update/components/Box";
import DateSelect from "../../update/components/Date";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";
import { addTask } from "../api/AddApi";

type Props = {
  box: boxType;
  date?: DateFormat | string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutate: any;
};
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const AddForms = ({ box, date, setOpen }: Props) => {
  const { data, mutate: addMutate } = useFetchTasks(box);
  const user: User = useSelector(selectUser);
  const initialValue = {
    user_id: user.uid,
    name: "",
    box: box,
    date: date || "",
    due_date: "",
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
  const onSubmit: SubmitHandler<StateTask> = async (addData) => {
    const newData = [...data, addData];
    await addTask(addData);
    await addMutate(newData, false);
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
          <div className="flex space-x-4">
            <Weight control={control} />
            <DueDate control={control} />
            <Box control={control} />
            {watch().box === "calender" && <DateSelect control={control} />}
          </div>

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
    </div>
  );
};

export default AddForms;
