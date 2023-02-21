import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Task from "../../../components/task/Task";
import { selectUser } from "../../../redux/userSlice";
import { TaskType, User } from "../../../Types";
import AddTask from "../../add/components/AddTask";
import { fetchCalendarTask } from "../api/CalendarApi";
const CalendarTask = ({ date }: { date: string }) => {
  const user: User = useSelector(selectUser);

  const {
    data: calendarTask,
    isLoading,
    isError,
    // error,
  } = useQuery(["calender", date], () => fetchCalendarTask(user.uid, date));
  return (
    <>
      <div className="my-6">
        {calendarTask &&
          calendarTask.map((task: TaskType, index: number) => (
            <div key={task.id}>
              <Task task={task} index={index} date={date} />
            </div>
          ))}
        {isLoading && (
          <div className="ml-10">
            <Loader />
          </div>
        )}
        {isError && <div>error</div>}
        <AddTask box={"calender"} date={date} />
      </div>
    </>
  );
};

export default CalendarTask;
