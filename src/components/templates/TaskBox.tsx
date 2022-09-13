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

const TaskBox = React.memo(({ box }: any) => {
  const user = useSelector(selectUser);
  const first = useRecoilValue(stateAtom);
  const { data, isLoading, error, mutate } = getDoTasks(user, box);
  const { ref, height } = useElementSize();
  const boxes: any = {
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
                  <AddTask box={box} tasks={data} done={true} mutate={mutate} />
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
