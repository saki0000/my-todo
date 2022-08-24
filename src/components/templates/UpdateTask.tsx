import {
  Autocomplete,
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import useUpdateTask from "../hooks/UpdateTask";
import DueDate from "../parts/DueDate";
import Weight from "../parts/Weight";

const UpdateTask = ({ task, setOpen, setTasks }: any) => {
  const [updateTask, setUpdateTask] = useSetState(task);
  const updateTaskApi = useUpdateTask();
  return (
    <div style={{ margin: 30 }}>
      <Stack>
        <Group position="apart">
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
          </Group>
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
              updateTaskApi(updateTask.id, updateTask);
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
