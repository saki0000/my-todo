import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { dateTask } from "../../api";
import Task from "../../components/layout/Task";
import { selectUser } from "../../redux/userSlice";
import { task } from "../../Types";
import AddTask from "../task/add/AddTask";
type taskType = task & { id: number };
const CalendarTask = ({ date }: { date: string }) => {
  const user = useSelector(selectUser);
  const { data, isLoading, error, mutate } = dateTask(user, date);
  return (
    <>
      <div style={{ marginTop: 20 }}>
        {data &&
          data.map((task: taskType) => (
            <div key={task.id}>
              <Task task={task} mutate={mutate} />
            </div>
          ))}
        {isLoading && (
          <div style={{ marginLeft: 40, marginTop: 10 }}>
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
