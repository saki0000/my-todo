import {
  Autocomplete,
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { updateSubTask, updateTaskAPI } from "../../api";
import { renAtom } from "../../atoms/atom";
import { selectSeparate } from "../../redux/counterSlice";
import { task } from "../../Types";
import Box from "./Box";
import DateSelect from "./Date";
import DueDate from "./DueDate";
import Weight from "./Weight";

type taskType = task & { id: number };
type props = {
  task: taskType;
  setOpen: (arg: boolean) => void;
  setTasks: (arg: taskType) => void;
  mutate?: any;
  sub?: boolean;
};
const UpdateTask = ({ task, setOpen, setTasks, mutate, sub }: props) => {
  const [updateTask, setUpdateTask] = useSetState<taskType>(task);
  const [ren, setRen] = useRecoilState(renAtom);
  const taskId: number = useSelector(selectSeparate);
  return (
    <div style={{ margin: 30 }}>
      <Stack>
        <Autocomplete
          placeholder="Name"
          value={updateTask.name}
          onChange={(e) => {
            setUpdateTask({ name: e });
          }}
          data={[]}
        ></Autocomplete>
        <Group>
          <Weight weight={updateTask.weight} setAddWeight={setUpdateTask} />
          <DueDate dueDate={updateTask.due_date} setAddDate={setUpdateTask} />
          <Box taskBox={updateTask.box} setTaskBox={setUpdateTask} />
          {updateTask.box === "calender" && (
            <DateSelect date={updateTask.date} setAddDate={setUpdateTask} />
          )}
        </Group>

        <Textarea
          placeholder="Memo"
          value={updateTask.memo}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setUpdateTask({ memo: e.currentTarget.value });
          }}
        ></Textarea>
        <Group>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={() => {
              setTasks(updateTask);
              sub
                ? mutate(updateSubTask(taskId, updateTask.id, updateTask))
                : mutate(updateTaskAPI(updateTask.id, updateTask));
              setRen(!ren);
              setOpen(false);
            }}
          >
            変更
          </Button>
        </Group>
        <Divider />
      </Stack>
    </div>
  );
};

export default UpdateTask;
