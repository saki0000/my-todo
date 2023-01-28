import { Loader, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import AddTask from "../../../features/add/components/AddTask";
import { task } from "../../../Types";
import Task from "../../task/Task";

const TaskList = ({ data, isLoading, isError, error, box }: any) => {
  const first = useRecoilValue(stateAtom);
  console.log(data);
  return (
    <>
      <div className="h-full overflow-auto">
        <div>
          {data && data.length !== 0 ? (
            data.map((task: task & { id: number }, index: number) => (
              <div key={task?.id || 0}>
                <Task task={task} index={index} />
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
          {isError && <div>{error.message}</div>}
          {(box === "inbox" || first.first === box) && (
            <div className="mt-4">
              <AddTask box={box} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
