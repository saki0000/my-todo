import {
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { separateAtom } from "../../../atoms/openAtom";
import { task } from "../../../Types";
import { updateSubTask, updateTaskAPI } from "../api/UpdateApi";

import Box from "./Box";
import DateSelect from "./Date";
import DueDate from "./DueDate";
import Weight from "./Weight";

type taskType = task & { id: number };
type props = {
  task: taskType;
  setOpen: (arg: boolean) => void;
  setTasks?: (arg: taskType) => void;
  mutate?: any;
  sub?: boolean;
  id?: number;
};
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const UpdateTask = ({ task, setOpen, mutate, sub, id }: props) => {
  const setModal = useSetRecoilState(separateAtom);
  const {
    control,
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<StateTask>({ defaultValues: task });
  const onSubmit: SubmitHandler<StateTask> = (data) => {
    sub && id
      ? mutate(updateSubTask(id, task.id, data))
      : mutate(updateTaskAPI(task.id, data));
    task.box === "inbox" &&
      data.box === "nextAction" &&
      setModal({ id: task.id, open: true });
    setOpen(false);
  };
  return (
    <div className="mx-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput placeholder="Name" {...register("name")}></TextInput>
          <Group>
            <Weight control={control} />
            <DueDate control={control} />
            {!sub && <Box control={control} />}
            {watch().box === "calender" && !sub && (
              <DateSelect control={control} />
            )}
          </Group>

          <Textarea placeholder="Memo" {...register("memo")}></Textarea>
          <Group>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              variant="light"
              color="red"
              radius="md"
              type="button"
            >
              キャンセル
            </Button>
            <Button type="submit" variant="light" color="brown" radius="md">
              変更
            </Button>
          </Group>
          <Divider />
        </Stack>
      </form>
    </div>
  );
};

export default UpdateTask;
