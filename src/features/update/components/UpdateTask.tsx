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
import useFetchDateTask from "../../calendar/hooks/fetchDateTask";
import useFetchSubTask from "../../task/hooks/useFetchSubTask";
import { useFetchTasks } from "../../task/hooks/useFetchTask";
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
  type?: string;
  id?: number;
  index: number;
};
type StateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const UpdateTask = ({ task, setOpen, type, id, index }: props) => {
  const { data: taskData, mutate: taskMutate } = useFetchTasks(task.box);
  const { data: subData, mutate: subMutate } = useFetchSubTask(task.id);
  const { data: calendarData, mutate: calendarMutate } = useFetchDateTask(
    task.date || ""
  );
  const setModal = useSetRecoilState(separateAtom);
  const {
    control,
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<StateTask>({ defaultValues: task });
  const onSubmit: SubmitHandler<StateTask> = async (data) => {
    if (type === "sub" && id) {
      const newData = [...subData];
      newData.splice(index, 1, data);
      updateSubTask(id, task.id, data);
      subMutate(newData, false);
    } else if (type === "calendar") {
      const newData = [...calendarData];
      newData.splice(index, 1, data);
      updateTaskAPI(task.id, data);
      calendarMutate(newData, false);
    } else {
      const newData = [...taskData];
      newData.splice(index, 1, data);
      updateTaskAPI(task.id, data);
      taskMutate(newData, false);
    }

    task.box === "inbox" &&
      data.box !== "inbox" &&
      setModal({ id: task.id, open: true });
    setOpen(false);
  };
  return (
    <div className="mt-4 mx-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput placeholder="Name" {...register("name")}></TextInput>
          <Group>
            <Weight control={control} />
            <DueDate control={control} />
            {type !== "sub" && <Box control={control} />}
            {watch().box === "calender" && type !== "sub" && (
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
