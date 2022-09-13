import { stateType } from "../../Types";
import TaskBox from "./TaskBox";

const Inbox = ({ state }: { state: stateType }) => {
  return (
    <>
      <TaskBox state={state} box={"inbox"} />
    </>
  );
};

export default Inbox;
