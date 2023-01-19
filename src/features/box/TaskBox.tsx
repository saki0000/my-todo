import { Divider, Group, Paper, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { inboxNumber } from "../../atoms/inboxNumberAtom";
import { boxType } from "../../Types";
import { useFetchTasks } from "../task/hooks/useFetchTask";
import BoxInfoIcon from "./BoxInfoIcon";
import TaskList from "./TaskList";

type props = { box: "inbox" | "someday" | "nextAction" };
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

const TaskBox = ({ box }: props) => {
  const setInboxNumber = useSetRecoilState(inboxNumber);
  const { data, isLoading, error } = useFetchTasks(box);
  // const {
  //   data: goalData,
  //   isLoading: goalIsLoading,
  //   error: goalError,
  // } = useFetchGoal();

  useEffect(() => {
    if (box === "inbox" && data) {
      setInboxNumber(data.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  console.log(data);
  return (
    <>
      <Paper p="xl" shadow="lg" className="h-full" radius="md">
        <Stack className="h-full px-2" key={box}>
          <Group>
            <p className="text-xl my-2">{boxes[box]}</p>
            <BoxInfoIcon box={box} />
          </Group>

          <Divider className="border-brown" />

          <TaskList data={data} isLoading={isLoading} error={error} box={box} />
        </Stack>
      </Paper>
    </>
  );
};

export default TaskBox;
