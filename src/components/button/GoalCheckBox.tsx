import { Checkbox } from "@mantine/core";
import useDoneTask from "../../features/delete/hooks/useDoneTask";
import useDoTask from "../../features/delete/hooks/useDoTask";
import { TaskType } from "../../types/Types";

const GoalCheckBox = ({ task, index }: { task: TaskType; index: number }) => {
  const doneMutation = useDoneTask(task, index);
  const doMutation = useDoTask(task, index);
  return (
    <div>
      <Checkbox
        checked={task.statement}
        onChange={() =>
          task.statement
            ? doMutation.mutate({ ...task, statement: !task.statement })
            : doneMutation.mutate({ ...task, statement: !task.statement })
        }
      />
    </div>
  );
};

export default GoalCheckBox;
