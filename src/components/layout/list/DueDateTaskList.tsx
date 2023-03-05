import { Divider, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import { TaskType } from "../../../types/Types";
import Task from "../../task/Task";

type DistributeTasksByDueDate = { [index: string]: TaskType[] };
const DueDateTaskList = ({ data, isLoading, isError, error, box }: any) => {
  const first = useRecoilValue(stateAtom);
  const [tasks, setTasks] = useState<DistributeTasksByDueDate>();
  const distributeTaskByDueDate = (tasks: TaskType[]) => {
    let distributedTask: DistributeTasksByDueDate = {};
    tasks.map((task) => {
      if (!task.due_date) {
      } else if (distributedTask[task.due_date]) {
        distributedTask[task.due_date].push(task);
      } else {
        distributedTask[task.due_date] = [task];
      }
    });
    const sortDistributedTask = Object.entries(distributedTask).sort(
      (a: [string, TaskType[]], b: [string, TaskType[]]) => {
        const date1 = new Date(a[0]);
        const date2 = new Date(b[0]);
        if (date1 > date2) {
          return 1;
        } else {
          return -1;
        }
      }
    );
    distributedTask = Object.fromEntries(sortDistributedTask);
    return distributedTask;
  };
  useEffect(() => {
    const primaryTask = distributeTaskByDueDate(data);
    setTasks(primaryTask);
  }, [data]);
  return (
    <div className="h-full overflow-auto">
      <div>
        {data && data.length !== 0 ? (
          <>
            {tasks &&
              Object.entries(tasks).map((value: [string, TaskType[]]) => (
                <div key={value[0]}>
                  <p className="my-2">{value[0]}</p>
                  <Divider />
                  {value[1]?.map((task: TaskType, index: number) => (
                    <div key={task?.id || 0}>
                      <Task task={task} index={index} />
                    </div>
                  ))}
                </div>
              ))}
          </>
        ) : (
          <div className="my-4 ml-10">
            {isLoading || first.first === box || box === "inbox" || (
              <Text>No Task</Text>
            )}
          </div>
        )}
        {isLoading && (
          <div style={{ marginLeft: 40, marginTop: 10 }}>
            <Loader />
          </div>
        )}
        {isError && <div>{error.message}</div>}
        {/* {(box === "inbox" || first.first === box) && (
          <div className="mt-4">
            <AddTask box={box} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DueDateTaskList;
