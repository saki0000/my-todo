import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { BoxType, DateFormat, User } from "../../../types/Types";
import DateSelect from "../../update/components/Date";
import DueDate from "../../update/components/DueDate";
import Weight from "../../update/components/Weight";
import useAddCalendarTask from "../hooks/useAddCalendarTask";
import useAddMutate from "../hooks/useAddMutate";
import { AddTaskType } from "../type/FeatureAddType";

type Props = {
  box: BoxType;
  date?: DateFormat | string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const AddForms = ({ box, date, setOpen }: Props) => {
  const mutation = useAddMutate(box);
  const calendarMutation = useAddCalendarTask(date || "");
  const user: User = useSelector(selectUser);
  const initialValue: AddTaskType = {
    user_id: user.uid,
    name: "",
    box: box,
    date: date || "",
    due_date: "",
    weight: "",
    subtasks: [],
    statement: false,
    memo: "",
    goal: false,
  };
  const {
    control,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AddTaskType>({ defaultValues: initialValue });
  const onSubmit: SubmitHandler<AddTaskType> = (addData) => {
    if (date) {
      calendarMutation.mutate(addData);
    } else {
      mutation.mutate(addData);
    }
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
            {/* <Box control={control} /> */}
            {box === "calender" && <DateSelect control={control} />}
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
