import { Divider, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import { TaskType } from "../../../types/Types";
import Task from "../../task/Task";

type DistributeTasksByPrimary = {
  high: TaskType[];
  middle: TaskType[];
  low: TaskType[];
};
const PrimaryTaskList = ({ data, isLoading, isError, error, box }: any) => {
  const first = useRecoilValue(stateAtom);
  const [primaryTask, setPrimaryTask] = useState<DistributeTasksByPrimary>();
  const distributeTaskByPrimary = (tasks: TaskType[]) => {
    const distributedTask: DistributeTasksByPrimary = {
      high: [],
      middle: [],
      low: [],
    };
    tasks.map((task: TaskType) => {
      switch (task.weight) {
        case "高":
          distributedTask.high.push(task);
          break;
        case "中":
          distributedTask.middle.push(task);
          break;
        case "低":
          distributedTask.low.push(task);
          break;
        default:
          break;
      }
    });
    return distributedTask;
  };
  useEffect(() => {
    const primaryTask = distributeTaskByPrimary(data);
    setPrimaryTask(primaryTask);
  }, [data]);
  return (
    <div className="h-full overflow-auto">
      <div>
        {data && data.length !== 0 ? (
          <>
            {primaryTask?.high.length !== 0 && (
              <div>
                <p className="my-2">優先度：高</p>
                <Divider />
                {primaryTask?.high.map((task: TaskType, index: number) => (
                  <div key={task?.id || 0}>
                    <Task task={task} index={index} />
                  </div>
                ))}
              </div>
            )}
            {primaryTask?.middle.length !== 0 && (
              <div className="mt-3">
                <p className="my-2">優先度：中</p>
                <Divider />
                {primaryTask?.middle.map((task: TaskType, index: number) => (
                  <div key={task?.id || 0}>
                    <Task task={task} index={index} />
                  </div>
                ))}
              </div>
            )}
            {primaryTask?.low.length !== 0 && (
              <div className="mt-3">
                <p className="my-2">優先度：低</p>
                <Divider />
                {primaryTask?.low.map((task: TaskType, index: number) => (
                  <div key={task?.id || 0}>
                    <Task task={task} index={index} />
                  </div>
                ))}
              </div>
            )}
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

export default PrimaryTaskList;
