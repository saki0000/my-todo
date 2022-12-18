import { Badge } from "@mantine/core";
import { task } from "../../../Types";
import useGetDiffDate from "../hooks/useGetDiffDate";

type TaskType = task & { id: number };
const PromptBadge = ({ task }: { task: TaskType }) => {
  const diffDay = useGetDiffDate(task);
  return (
    <div>
      {task.box === "inbox" && diffDay && diffDay > 7 ? (
        <>
          <Badge color="red">タスクを振り分けてください</Badge>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptBadge;
