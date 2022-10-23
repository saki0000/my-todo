import {
  Container,
  Divider,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { getDoneTasks } from "../../api";
import Task from "../../features/task/show/Task";
import { selectUser } from "../../redux/userSlice";
import { task, user } from "../../Types";

const DoneTask = () => {
  // const doneTasks = useGetDoneTask();
  const user: user = useSelector(selectUser);
  const { data, isLoading, error } = getDoneTasks(user);
  const { ref, height } = useElementSize();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <Container style={{ height: "100%" }}>
        <Paper p="xl" style={{ width: "100%", height: "100%" }}>
          <Stack style={{ height: "100%" }}>
            <Text>Done Tasks</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {data &&
                  data.map((task: task & { id: number }) => (
                    <Task task={task} done={true} />
                  ))}
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default DoneTask;
