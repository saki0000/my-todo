import { Divider, Loader, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { getDoTasks } from "../../api";
import { stateAtom } from "../../atoms/stateAtom";
import AddTask from "../../features/task/add/AddTask";
import { selectUser } from "../../redux/userSlice";
import { boxType, task, user } from "../../Types";
import Task from "./Task";

type props = { box: "inbox" | "someday" | "nextAction"; onClick?: () => void };
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

const TaskBox = React.memo(({ box, onClick }: props) => {
  const user: user = useSelector(selectUser);
  const first = useRecoilValue(stateAtom);
  const { data, isLoading, error, mutate } = getDoTasks(user, box);
  const { ref, height } = useElementSize();
  console.log(box, "rendering");
  // useEffect(() => {
  //   console.log("data");
  // }, [data]);
  return (
    <>
      <Paper
        p="xl"
        shadow="lg"
        style={{ height: "100%" }}
        radius="md"
        onClick={onClick}
      >
        <Stack style={{ height: "100%" }}>
          <p className="text-xl  my-2">{boxes[box]}</p>
          <Divider className="border-brown" />
          <div style={{ height: "100%" }} ref={ref}>
            <ScrollArea.Autosize maxHeight={height} className="h-full">
              {data && data.length !== 0 ? (
                data.map((task: task & { id: number }) => (
                  <div key={task.id}>
                    <Task task={task} mutate={mutate} />
                  </div>
                ))
              ) : (
                <div className="my-4 mr-20">
                  {isLoading || first.first === box || <Text>No Task</Text>}
                </div>
              )}
              {isLoading && (
                <div style={{ marginLeft: 40, marginTop: 10 }}>
                  <Loader />
                </div>
              )}
              {error && <div>error</div>}
              {(box === "inbox" || first.first === box) && (
                <>
                  <AddTask box={box} mutate={mutate} />
                  {/* <Divider className="border-brown" /> */}
                </>
              )}
            </ScrollArea.Autosize>
          </div>
        </Stack>
      </Paper>
    </>
  );
});

export default TaskBox;
