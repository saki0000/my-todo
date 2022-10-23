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
import { useRecoilState, useSetRecoilState } from "recoil";
import { updateSubTask, updateTaskAPI } from "../../../../api";
import { renAtom } from "../../../../atoms/atom";
import { separateAtom } from "../../../../atoms/openAtom";
import { task } from "../../../../Types";
import Box from "../../parts/Box";
import DateSelect from "../../parts/Date";
import DueDate from "../../parts/DueDate";
import Weight from "../../parts/Weight";

type taskType = task & { id: number };
type props = {
  task: taskType;
  setOpen: (arg: boolean) => void;
  setTasks: (arg: taskType) => void;
  mutate?: any;
  sub?: boolean;
  id?: number;
};
const UpdateTask = ({ task, setOpen, setTasks, mutate, sub, id }: props) => {
  const [updateTask, setUpdateTask] = useSetState<taskType>(task);
  const [ren, setRen] = useRecoilState(renAtom);
  const setModal = useSetRecoilState(separateAtom);
  console.log(task);
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
          {updateTask.box === "calender" && !sub && (
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
            variant="light"
            color="red"
            radius="md"
          >
            キャンセル
          </Button>
          <Button
            onClick={() => {
              sub && id
                ? mutate(updateSubTask(id, updateTask.id, updateTask))
                : mutate(updateTaskAPI(updateTask.id, updateTask));
              task.box === "inbox" &&
                updateTask.box === "nextAction" &&
                setModal({ id: task.id, open: true });
              setTasks(updateTask);

              setRen(!ren);
              setOpen(false);
            }}
            variant="light"
            color="indigo"
            radius="md"
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
