import { Divider, Progress } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchDoneGoal } from "../../../features/fetch/hooks/useFetchDoneGoal";
import { useFetchGoal } from "../../../features/fetch/hooks/useFetchGoal";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../types/Types";
import DoneTaskList from "./DoneTaskList";

const GoalTaskList = () => {
  const user: User = useSelector(selectUser);

  const { data, error, isLoading, isError } = useFetchGoal();
  const {
    data: doneData,
    error: doneError,
    isLoading: doneIsLoading,
    isError: doneIsError,
  } = useFetchDoneGoal();
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const maxDataNumber = data.length + doneData.length;
    setProgress((doneData.length / maxDataNumber) * 100);
  }, [data]);
  return (
    <div className="h-full overflow-auto space-y-4">
      <Progress value={progress} label={`${progress}%完了`} size="xl" />
      <div>
        <p className="my-2">未完了</p>
        <Divider />
        <DoneTaskList
          data={data}
          isError={isError}
          isLoading={isLoading}
          box="nextAction"
          error={error}
        />
      </div>

      <div>
        <p className="my-2">完了</p>
        <Divider />
        <DoneTaskList
          data={doneData}
          isError={doneIsError}
          isLoading={doneIsLoading}
          box="nextAction"
          error={doneError}
        />
      </div>
    </div>
  );
};

export default GoalTaskList;
