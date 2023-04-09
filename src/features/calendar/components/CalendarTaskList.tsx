import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import Task from "../../../components/task/TaskLayout";
import { selectUser } from "../../../redux/userSlice";
import { TaskType, User } from "../../../types/Types";
import AddTask from "../../add/components/AddTask";
import { fetchCalendarTask } from "../api/CalendarApi";
const CalendarTask = ({ date }: { date: string }) => {
  const user: User = useSelector(selectUser);

  const {
    data: calendarTask,
    isLoading,
    isError,
  } = useQuery(["calender", date], () => fetchCalendarTask(user.uid, date));
  const state = useRecoilValue(stateAtom);

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
        {state.first == "calender" && <AddTask box={"calender"} date={date} />}
      </div>
    </>
  );
};

export default CalendarTask;
