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
import { selectSeparate } from "../../features/counterSlice";
import useAddSubTask from "../hooks/AddSubTask";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

const AddSubTask = ({ date, tasks, setTasks }: any) => {
  const addSubTaskAPI = useAddSubTask();
  const id = useSelector(selectSeparate);
  const [open, setOpen] = useState(true);
  const [addTask, setAddTask] = useSetState({
    task_id: id.id,
    name: "",
    date: date,
    due_date: "期日",
    weight: 0,
    subtasks: [],
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
            onChange={(e: any) => {
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
                addSubTaskAPI(id.id, addTask);
                setTasks({ subtasks: [...tasks, addTask] });
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
