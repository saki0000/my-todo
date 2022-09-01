import TaskBox from "./TaskBox";

const NextAction = ({ state }: any) => {
  return (
    <>
      <TaskBox state={state} box={"nextAction"} />
    </>
  );
};

export default NextAction;
