import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import AddTask from "./AddTask";
import Task from "../parts/Task";
import { getDoTasks } from "../../api";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import React from "react";
import { boxType, user } from "../../Types";

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
      <>
        <Stack style={{ height: "100%" }}>
          <Text size="lg">{boxes[box]}</Text>
          <Divider />
          <div style={{ height: "100%" }} ref={ref}>
            <ScrollArea.Autosize maxHeight={height}>
              {data &&
                data.map((task: any) => (
                  <Task task={task} first={true} mutate={mutate} />
                ))}
              {isLoading && <div>Loading</div>}
              {error && <div>error</div>}
              {first.first === box && (
                <>
                  <AddTask box={box} mutate={mutate} />
                  <Divider />
                </>
              )}
            </ScrollArea.Autosize>
          </div>
        </Stack>
      </>
    </>
  );
});

export default TaskBox;
