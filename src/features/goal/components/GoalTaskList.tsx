import { Divider, Progress } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { User } from "../../../types/Types";
import { useFetchDoneGoal } from "../hooks/useFetchDoneGoal";
import { useFetchGoal } from "../hooks/useFetchGoal";
import DoneTaskList from "./DoneTaskList";
import GoalSetting from "./GoalSetting";

const GoalTaskList = ({ data, isLoading, isError, error, box }: any) => {
  const user: User = useSelector(selectUser);

  const {
    data: goalData,
    error: goalError,
    isLoading: goalIsLoading,
    isError: goalIsError,
  } = useFetchGoal();
  const {
    data: doneData,
    error: doneError,
    isLoading: doneIsLoading,
    isError: doneIsError,
  } = useFetchDoneGoal();
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (goalData && doneData) {
      const maxDataNumber = goalData.length + doneData.length;
      setProgress(Math.floor((doneData.length / maxDataNumber) * 100));
    }
  }, [goalData]);
  return (
    <div className="h-full overflow-auto space-y-4">
      <div className="grid grid-cols-4  items-center">
        <Progress
          value={progress}
          label={`${progress}%完了`}
          size="xl"
          className="col-span-3"
        />
        <div className="justify-self-end">
          <GoalSetting goalTasks={goalData} nextActionTasks={data} />
        </div>
      </div>

      <div>
        <DoneTaskList
          data={goalData}
          isError={goalIsError}
          isLoading={goalIsLoading}
          box="nextAction"
          error={goalError}
        >
          <p className="my-2">未完了</p>
          <Divider />
        </DoneTaskList>
      </div>

      <div>
        <DoneTaskList
          data={doneData}
          isError={doneIsError}
          isLoading={doneIsLoading}
          box="nextAction"
          error={doneError}
        >
          <p className="my-2">完了</p>
          <Divider />
        </DoneTaskList>
      </div>
    </div>
  );
};

export default GoalTaskList;
