import { Divider, Group, Paper, Stack } from "@mantine/core";
import { boxType } from "../../../Types";
import BoxInfoIcon from "../../button/BoxInfoIcon";
import TaskList from "../tasks/TaskList";

type props = {
  box: "inbox" | "someday" | "nextAction";
  isLoading: any;
  isError: any;
  data: any;
  error: any;
};
type boxName = Omit<
  {
    [attr in boxType]: string;
  },
  "calender"
>;
const boxes: boxName = {
  inbox: "Inbox",
  someday: "Someday",
  nextAction: "Next Action List",
};

const TaskBox = ({ box, isLoading, isError, data, error }: props) => {
  // const setInboxNumber = useSetRecoilState(inboxNumber);

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
