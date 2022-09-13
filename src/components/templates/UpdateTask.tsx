import {
  Autocomplete,
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { renAtom } from "../../atoms/atom";
import { selectSeparate } from "../../features/counterSlice";
import { task } from "../../Types";
import Box from "../parts/Box";
import Date from "../parts/Date";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";
type taskType = Required<task>;
const UpdateTask = ({ task, setOpen, setTasks, updateTaskApi, sub }: any) => {
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
            <Date date={updateTask.date} setAddDate={setUpdateTask} />
          )}
        </Group>

        <Textarea
          placeholder="Memo"
          value={updateTask.memo}
          onChange={(e: any) => {
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
                ? updateTaskApi(taskId, updateTask.id, updateTask)
                : updateTaskApi(updateTask.id, updateTask);
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
