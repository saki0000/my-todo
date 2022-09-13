import { stateType } from "../../Types";
import TaskBox from "./TaskBox";

const Week = ({ state }: { state: stateType }) => {
  return (
    <>
      <TaskBox box={"someday"} />
    </>
  );
};

export default Week;
