import { Loader } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import { BoxType, TaskType } from "../../../types/Types";
import Task from "../../task/Task";

type PropsType = {
  data: TaskType[];
  isLoading: any;
  isError: any;
  error: any;
  box: BoxType;
};

const DoneTaskList = ({ data, isLoading, isError, error, box }: PropsType) => {
  const first = useRecoilValue(stateAtom);
  return (
    <>
      {/* <div className="h-full overflow-auto"> */}
      <div>
        {data && data.length !== 0 ? (
          data.map((task: TaskType, index: number) => (
            <div key={task?.id || 0}>
              <Task task={task} index={index} goal={true} />
            </div>
          ))
        ) : (
          <div className="my-4 ml-10">
            {isLoading || first.first === box || box === "inbox" || (
              <p>No Task</p>
            )}
          </div>
        )}
        {isLoading && (
          <div style={{ marginLeft: 40, marginTop: 10 }}>
            <Loader />
          </div>
        )}
        {isError && <div>{error.message}</div>}
        {/* {(box === "inbox" || first.first === box) && (
            <div className="mt-4">
              <AddTask box={box} />
            </div>
          )} */}
      </div>
      {/* </div> */}
    </>
  );
};

export default DoneTaskList;
