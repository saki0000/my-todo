import { Divider, Loader, Paper, Stack, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import { boxType, task } from "../../../Types";
import AddTask from "../../add/components/AddTask";
import { useFetchTasks } from "../hooks/useFetchTask";
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

const TaskBox = ({ box, onClick }: props) => {
  const first = useRecoilValue(stateAtom);
  const { data, isLoading, error, mutate } = useFetchTasks(box);

  console.log(box, "box", "rendering");
  return (
    <>
      <Paper
        p="xl"
        shadow="lg"
        className="h-full"
        radius="md"
        onClick={onClick}
      >
        <Stack className="h-full" key={box}>
          <p className="text-xl  my-2">{boxes[box]}</p>
          <Divider className="border-brown" />
          <div className="h-full overflow-auto">
            <div>
              {data && data.length !== 0 ? (
                data.map((task: task & { id: number }) => (
                  <div key={task.id}>
                    <Task task={task} mutate={mutate} />
                  </div>
                ))
              ) : (
                <div className="my-4 ml-10">
                  {isLoading || first.first === box || box === "inbox" || (
                    <Text>No Task</Text>
                  )}
                </div>
              )}
              {isLoading && (
                <div style={{ marginLeft: 40, marginTop: 10 }}>
                  <Loader />
                </div>
              )}
              {error && <div>error</div>}
              {(box === "inbox" || first.first === box) && (
                <div className="mt-4">
                  <AddTask box={box} mutate={mutate} />
                </div>
              )}
            </div>
          </div>
        </Stack>
      </Paper>
    </>
  );
};

export default TaskBox;