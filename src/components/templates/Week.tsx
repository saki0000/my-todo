import useGetDoTask from "../hooks/GetDoTask";
import TaskBox from "./TaskBox";

const Week = ({ state }: any) => {
  const [tasks, setTasks] = useGetDoTask("someday");
  return (
    <>
      <TaskBox
        tasks={tasks}
        setTasks={setTasks}
        state={state}
        box={"someday"}
      />
    </>
  );
};

export default Week;
