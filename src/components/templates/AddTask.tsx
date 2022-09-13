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
import { addTask } from "../../api";
import { selectUser } from "../../features/userSlice";
import { boxType, DateFormat, task, user } from "../../Types";
import Box from "../parts/Box";
import Date from "../parts/Date";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

type props = { box: boxType; date?: DateFormat | string; mutate?: any };
type stateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const AddTask = ({ box, date, mutate }: props) => {
  const user: user = useSelector(selectUser);
  const [open, setOpen] = useState<boolean>(true);
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
  const [addTaskData, setAddTask] = useSetState<stateTask>(initial);
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
            value={addTaskData.name}
            onChange={(e) => {
              setAddTask({ name: e });
            }}
            data={[]}
            style={{ width: "auto" }}
          ></Autocomplete>
          <Group>
            <Weight weight={"重さ"} setAddWeight={setAddTask} />
            <DueDate dueDate={"期日"} setAddDate={setAddTask} />
            <Box taskBox={addTaskData.box} setTaskBox={setAddTask} />
            {addTaskData.box === "calender" && (
              <Date date={addTaskData.date} setAddDate={setAddTask} />
            )}
          </Group>

          <Textarea
            placeholder="Memo"
            value={addTaskData.memo}
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
                setAddTask(initial);
                mutate(addTask(addTaskData));
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
