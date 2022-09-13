import { stateType } from "../../Types";
import TaskBox from "./TaskBox";

const NextAction = ({ state }: { state: stateType }) => {
  return (
    <>
      <TaskBox state={state} box={"nextAction"} />
    </>
  );
};

export default NextAction;
