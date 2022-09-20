import React from "react";
import { useSelector } from "react-redux";
import { dateTask } from "../../api";
import { selectUser } from "../../features/userSlice";
import { task } from "../../Types";
import AddTask from "../templates/AddTask";
import Task from "./Task";
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
              <Task task={task} first={true} mutate={mutate} />
            </div>
          ))}
        {isLoading && <div>Loading</div>}
        {error && <div>error</div>}
        <AddTask box={"calender"} mutate={mutate} date={date} />
      </div>
    </>
  );
};

export default CalendarTask;
