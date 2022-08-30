import useGetDoTask from "../hooks/GetDoTask";
import TaskBox from "./TaskBox";

const NextAction = ({ state }: any) => {
  const [tasks, setTasks] = useGetDoTask("nextAction");
  return (
    <>
      <TaskBox
        tasks={tasks}
        setTasks={setTasks}
        state={state}
        box={"nextAction"}
      />
    </>
  );
};

export default NextAction;
