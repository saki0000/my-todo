import { Chip, Divider, Group, Paper, Stack } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import BoxInfoIcon from "../../../components/button/BoxInfoIcon";
import DueDateTaskList from "../../../components/layout/list/DueDateTaskList";
import PrimaryTaskList from "../../../components/layout/list/PrimaryTaskList";
import TaskList from "../../../components/layout/list/TaskList";
import { selectUser } from "../../../redux/userSlice";
import { BoxType, User } from "../../../types/Types";
import GoalTaskList from "../../goal/components/GoalTaskList";
import useFetchBoxTasks from "../hooks/useFetchBoxTasks";
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

const NextActionBox = () => {
  const user: User = useSelector(selectUser);

  const { data, error, isLoading, isError } = useFetchBoxTasks();
  const [label, setLabel] = useState<string | string[]>("all");
  const state = useRecoilValue(stateAtom);

  return (
    <>
      <Paper p="xl" shadow="lg" className="h-full" radius="md">
        <Stack className="h-full px-2" key={"nextAction"}>
          <Group>
            <p className="text-xl my-2 font-medium">{boxes["nextAction"]}</p>
            <BoxInfoIcon box={"nextAction"} />
          </Group>

          <Divider className="border-brown" />
          {state.first === "nextAction" && (
            <Chip.Group position="left" value={label} onChange={setLabel}>
              <Chip variant="outline" value="all">
                All
              </Chip>
              <Chip variant="outline" value="primary">
                Primary
              </Chip>
              <Chip variant="outline" value="dueDate">
                Due Date
              </Chip>
              <Chip variant="filled" color="indigo" value="goal">
                Goal
              </Chip>
            </Chip.Group>
          )}
          {label === "all" && (
            <TaskList
              data={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              box={"nextAction"}
            />
          )}
          {label === "primary" && (
            <PrimaryTaskList
              data={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              box={"nextAction"}
            />
          )}
          {label === "dueDate" && (
            <DueDateTaskList
              data={data}
              isLoading={isLoading}
              isError={isError}
              error={error}
              box={"nextAction"}
            />
          )}
          {label === "goal" && <GoalTaskList data={data} />}
        </Stack>
      </Paper>
    </>
  );
};

export default NextActionBox;
