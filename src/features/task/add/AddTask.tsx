import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { boxType, DateFormat, task, user } from "../../../Types";
import Box from "../edit/Box";

type Props = { box: boxType; date?: DateFormat | string; mutate?: any };
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const AddTask = ({ box, date, mutate }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const user: user = useSelector(selectUser);
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
    formState: { errors },
  } = useForm<StateTask>({ defaultValues: initialValue });
  const onSubmit: SubmitHandler<StateTask> = (data) => console.log(data);
  // const [addTaskData, setAddTask] = useSetState<stateTask>(initial);
  return (
    <div style={{ margin: 30 }} className="h-full">
      {open ? (
        <Group>
          <ActionIcon
            onClick={() => {
              setOpen(false);
            }}
          >
            <AiOutlinePlus></AiOutlinePlus>
          </ActionIcon>
          <Text>タスクを追加</Text>
        </Group>
      ) : (
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              placeholder="Name"
              {...register("name")}
              style={{ width: "auto" }}
            />
            <Group>
              {/* <Weight weight={watch().weight} setAddWeight={setAddTask} /> */}
              {/* <DueDate dueDate={watch().due_date} setAddDate={setAddTask} /> */}
              <Box taskBox={watch().box} control={control} />
              {/* {watch().box === "calender" && (
                <DateSelect date={watch.date} setAddDate={setAddTask} />
              )} */}
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
          </form>
        </Stack>
      )}
    </div>
  );
};

export default AddTask;
