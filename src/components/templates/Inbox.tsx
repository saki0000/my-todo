import useGetDoTask from "../hooks/GetDoTask";
import TaskBox from "./TaskBox";

const Inbox = ({ state }: any) => {
  const [tasks, setTasks] = useGetDoTask("inbox");
  console.log(state);
  return (
    <>
      <TaskBox tasks={tasks} setTasks={setTasks} state={state} box={"inbox"} />
    </>
  );
};

export default Inbox;
