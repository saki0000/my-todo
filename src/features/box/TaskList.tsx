import { Loader, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import { task } from "../../Types";
import AddTask from "../add/components/AddTask";
import Task from "../task/components/Task";

const TaskList = ({ data, isLoading, error, box }: any) => {
  const first = useRecoilValue(stateAtom);
  return (
    <>
      <div className="h-full overflow-auto">
        <div>
          {data && data.length !== 0 ? (
            data.map((task: task & { id: number }, index: number) => (
              <div key={task.id}>
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
          {error && <div>error</div>}
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
