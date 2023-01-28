import { Loader } from "@mantine/core";
import { task } from "../../../Types";
import AddTask from "../../add/components/AddTask";
import Task from "../../task/components/Task";
import useFetchDateTask from "../hooks/fetchDateTask";
type taskType = task & { id: number };
const CalendarTask = ({ date }: { date: string }) => {
  const { data: calendarTask, isLoading, error } = useFetchDateTask(date);
  return (
    <>
      <div className="my-6">
        {calendarTask &&
          calendarTask.map((task: taskType, index: number) => (
            <div key={task.id}>
              <Task task={task} index={index} date={date} />
            </div>
          ))}
        {isLoading && (
          <div className="ml-10">
            <Loader />
          </div>
        )}
        {error && <div>error</div>}
        <AddTask box={"calender"} date={date} />
      </div>
    </>
  );
};

export default CalendarTask;
