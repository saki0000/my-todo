import { Divider, Loader, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { getDoTasks } from "../../api";
import { stateAtom } from "../../atoms/stateAtom";
import { selectUser } from "../../redux/userSlice";
import { boxType, task, user } from "../../Types";
import AddTask from "../task/add/AddTask";
import Task from "../task/show/Task";

type props = { box: "inbox" | "someday" | "nextAction" };
type boxName = Omit<
  {
    [attr in boxType]: string;
  },
  "calender"
>;
const TaskBox = React.memo(({ box }: props) => {
  const user: user = useSelector(selectUser);
  const first = useRecoilValue(stateAtom);
  const { data, isLoading, error, mutate } = getDoTasks(user, box);
  const { ref, height } = useElementSize();
  const boxes: boxName = {
    inbox: "Inbox",
    someday: "Someday",
    nextAction: "Next Action List",
  };
  return (
    <>
      <Stack style={{ height: "100%" }}>
        <Text size="lg">{boxes[box]}</Text>
        <Divider className="border-indigo-100" />
        <div style={{ height: "100%" }} ref={ref}>
          <ScrollArea.Autosize maxHeight={height}>
            {data && data.length !== 0 ? (
              data.map((task: task & { id: number }) => (
                <Task task={task} mutate={mutate} />
              ))
            ) : (
              <>{isLoading || first.first === box || <Text>No Task</Text>}</>
            )}
            {isLoading && (
              <div style={{ marginLeft: 40, marginTop: 10 }}>
                <Loader />
              </div>
            )}
            {error && <div>error</div>}
            {first.first === box && (
              <>
                <AddTask box={box} mutate={mutate} />
                <Divider className="border-indigo-100" />
              </>
            )}
          </ScrollArea.Autosize>
        </div>
      </Stack>
    </>
  );
});

export default TaskBox;
