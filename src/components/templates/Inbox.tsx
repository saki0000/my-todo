import TaskBox from "./TaskBox";

const Inbox = ({ state }: any) => {
  return (
    <>
      <TaskBox state={state} box={"inbox"} />
    </>
  );
};

export default Inbox;
