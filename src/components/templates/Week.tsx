import { stateType } from "../../Types";
import TaskBox from "./TaskBox";

const Week = ({ state }: { state: stateType }) => {
  return (
    <>
      <TaskBox state={state} box={"someday"} />
    </>
  );
};

export default Week;
