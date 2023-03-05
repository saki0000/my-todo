import { Chip, Divider, Group, Paper, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { URL } from "../../../api";
import { stateAtom } from "../../../atoms/stateAtom";
import BoxInfoIcon from "../../../components/button/BoxInfoIcon";
import DueDateTaskList from "../../../components/layout/list/DueDateTaskList";
import GoalTaskList from "../../../components/layout/list/GoalTaskList";
import PrimaryTaskList from "../../../components/layout/list/PrimaryTaskList";
import TaskList from "../../../components/layout/list/TaskList";
import { selectUser } from "../../../redux/userSlice";
import { BoxType, User } from "../../../types/Types";
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
  const fetchData = async () => {
    const res = await axios.get(
      `${URL}/do_tasks?id=${user.uid}&box=nextAction`
    );
    return res.data;
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["nextAction"],
    queryFn: fetchData,
  });
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
          {label === "goal" && <GoalTaskList />}
        </Stack>
      </Paper>
    </>
  );
};

export default NextActionBox;
