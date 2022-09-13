import { stateType } from "../../Types";
import TaskBox from "./TaskBox";

const Inbox = ({ state }: { state: stateType }) => {
  return (
    <>
      <TaskBox box={"inbox"} />
    </>
  );
};

export default Inbox;
