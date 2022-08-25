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
import { selectUser } from "../../features/userSlice";
import useAddTask from "../hooks/AddTask";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

const AddTask = ({ date, tasks, setTasks }: any) => {
  const addTaskAPI = useAddTask();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(true);
  const [addTask, setAddTask] = useSetState({
    user_id: user.uid,
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
                addTaskAPI(addTask);
                setTasks([...tasks, addTask]);
                console.log(addTask.user_id);
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

export default AddTask;
