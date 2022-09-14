import {
  ActionIcon,
  Autocomplete,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { addSubTask } from "../../api";
import { selectSeparate } from "../../features/counterSlice";
import { task } from "../../Types";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

type props = { task: task; mutate: any };
const AddSubTask = ({ task, mutate }: props) => {
  const id: number = useSelector(selectSeparate);
  const [open, setOpen] = useState<boolean>(true);
  const [addTask, setAddTask] = useSetState<task & { task_id: number }>({
    task_id: id,
    name: "",
    box: task.box,
    date: task.date,
    due_date: "期日",
    weight: 0,
    statement: false,
    memo: "",
  });
  return (
    <div style={{ margin: 30 }}>
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
          <Group position="apart">
            <Autocomplete
              placeholder="Name"
              value={addTask.name}
              onChange={(e) => {
                setAddTask({ name: e });
              }}
              data={[]}
            ></Autocomplete>
            <Group>
              <Weight weight={"重さ"} setAddWeight={setAddTask} />
              <DueDate dueDate={"期日"} setAddDate={setAddTask} />
            </Group>
          </Group>
          <Textarea
            placeholder="Memo"
            value={addTask.memo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setAddTask({ memo: e.currentTarget.value });
            }}
          ></Textarea>
          <Group>
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                mutate(addSubTask(id, addTask));
                setOpen(true);
              }}
            >
              追加
            </Button>
          </Group>
        </Stack>
      )}
    </div>
  );
};

export default AddSubTask;
