import { Divider, Group, Paper, Stack } from "@mantine/core";
import { BoxType } from "../../../Types";
import BoxInfoIcon from "../../button/BoxInfoIcon";
import TaskList from "../list/TaskList";

type props = {
  box: "inbox" | "someday" | "nextAction";
  isLoading: any;
  isError: any;
  data: any;
  error: any;
};
type BoxName = Omit<
  {
    [attr in BoxType]: string;
  },
  "calender"
>;
const boxes: BoxName = {
  inbox: "Inbox",
  someday: "Someday",
  nextAction: "Next Action List",
};

const TaskBox = ({ box, isLoading, isError, data, error }: props) => {
  return (
    <>
      <Paper p="xl" shadow="lg" className="h-full" radius="md">
        <Stack className="h-full px-2" key={box}>
          <Group>
            <p className="text-xl my-2">{boxes[box]}</p>
            <BoxInfoIcon box={box} />
          </Group>

          <Divider className="border-brown" />

          <TaskList
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            box={box}
          />
        </Stack>
      </Paper>
    </>
  );
};

export default TaskBox;
