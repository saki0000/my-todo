import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import useGetDoTask from "../hooks/GetDoTask";
import Task from "../parts/Task";

const Inbox = ({ state }: any) => {
  const tasks = useGetDoTask("inbox");
  const { ref, height } = useElementSize();
  return (
    <>
      {state.first === "inbox" ? (
        <>
          <Stack style={{ height: "100%" }}>
            <Text>Inbox</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {tasks &&
                  tasks.map((task: any) => <Task task={task} first={true} />)}
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div>
            <Stack>
              <Text>Inbox</Text>
              <Divider />
              {tasks && <Task task={tasks[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Inbox;
