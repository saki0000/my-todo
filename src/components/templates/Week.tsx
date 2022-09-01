import TaskBox from "./TaskBox";

const Week = ({ state }: any) => {
  return (
    <>
      <TaskBox state={state} box={"someday"} />
    </>
  );
};

export default Week;
