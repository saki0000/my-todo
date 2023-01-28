import { Badge } from "@mantine/core";
import useGetDiffDate from "../../features/fetch/hooks/useGetDiffDate";
import { task } from "../../Types";

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
