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
import { addTask } from "../../../api";
import { selectUser } from "../../../redux/userSlice";
import { boxType, DateFormat, task, user } from "../../../Types";
import Box from "../parts/Box";
import DateSelect from "../parts/Date";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

type props = { box: boxType; date?: DateFormat | string; mutate?: any };
type stateTask = Required<Omit<task, "updated_at" | "created_at" | "id">>;
const AddTask = ({ box, date, mutate }: props) => {
  const [open, setOpen] = useState<boolean>(true);
  const user: user = useSelector(selectUser);
  const initial = {
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
  const [addTaskData, setAddTask] = useSetState<stateTask>(initial);
  useEffect(() => {
    setAddTask({ box: box });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box]);
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
            <Weight weight={addTaskData.weight} setAddWeight={setAddTask} />
            <DueDate dueDate={addTaskData.due_date} setAddDate={setAddTask} />
            <Box taskBox={addTaskData.box} setTaskBox={setAddTask} />
            {addTaskData.box === "calender" && (
              <DateSelect date={addTaskData.date} setAddDate={setAddTask} />
            )}
          </Group>

          <Textarea
            placeholder="Memo"
            value={addTaskData.memo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setAddTask({ memo: e.currentTarget.value });
            }}
          ></Textarea>
          <Group>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              variant="light"
              color="red"
              radius="md"
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                setAddTask(initial);
                mutate(addTask(addTaskData));
                setOpen(true);
              }}
              variant="light"
              color="indigo"
              radius="md"
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
