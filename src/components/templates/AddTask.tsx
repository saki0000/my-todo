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
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import useAddTask from "../hooks/AddTask";
import Box from "../parts/Box";
import Date from "../parts/Date";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

const AddTask = ({ box, tasks, setTasks, date }: any) => {
  const addTaskAPI = useAddTask();
  const user: any = useSelector(selectUser);
  const [open, setOpen] = useState(true);
  const initial = {
    user_id: user.uid,
    name: "",
    box: box,
    date: date || "",
    due_date: "期日",
    weight: 0,
    subtasks: [],
    statement: false,
    memo: "",
  };
  const [addTask, setAddTask] = useSetState(initial);
  useEffect(() => {
    setAddTask({ box: box });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box]);
  return (
    <div style={{ margin: 30 }}>
      {open ? (
        <Group>
          <ActionIcon
            onClick={() => {
              setOpen(false);
              console.log(addTask);
            }}
          >
            <AiOutlinePlus></AiOutlinePlus>
          </ActionIcon>
          <Text>タスクを追加</Text>
        </Group>
      ) : (
        <Stack>
          <Autocomplete
            placeholder="Name"
            value={addTask.name}
            onChange={(e) => {
              setAddTask({ name: e });
            }}
            data={[]}
            style={{ width: "auto" }}
          ></Autocomplete>
          <Group>
            <Weight weight={"重さ"} setAddWeight={setAddTask} />
            <DueDate dueDate={"期日"} setAddDate={setAddTask} />
            <Box taskBox={addTask.box} setTaskBox={setAddTask} />
            {addTask.box === "calender" && (
              <Date date={addTask.date} setAddDate={setAddTask} />
            )}
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
                console.log(addTask);
                addTaskAPI(addTask);
                setTasks([...tasks, addTask]);
                setAddTask(initial);
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
