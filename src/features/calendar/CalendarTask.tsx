import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { dateTask } from "../../api";
import { selectUser } from "../../redux/userSlice";
import { task } from "../../Types";
import AddTask from "../add/AddTask";
import Task from "../show/Task";
type taskType = task & { id: number };
const CalendarTask = ({ date }: { date: string }) => {
  const user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = dateTask(user, date);
  return (
    <>
      <div className="my-6">
        {data &&
          data.map((task: taskType) => (
            <div key={task.id}>
              <Task task={task} mutate={mutate} />
            </div>
          ))}
        {isLoading && (
          <div className="ml-10">
            <Loader />
          </div>
        )}
        {error && <div>error</div>}
        <AddTask box={"calender"} mutate={mutate} date={date} />
      </div>
    </>
  );
};

export default CalendarTask;
