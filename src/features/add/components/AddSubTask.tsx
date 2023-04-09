import { ActionIcon, Group, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddSubTaskForms from "./AddSubTaskForms";

type props = { taskId: number };
const AddSubTask = ({ taskId }: props) => {
  const [open, setOpen] = useState<boolean>(true);
  console.log(taskId);
  return (
    <div className="my-4">
      {open ? (
        <Group>
          <ActionIcon
            onClick={() => {
              setOpen(false);
            }}
          >
            <AiOutlinePlus></AiOutlinePlus>
          </ActionIcon>
          <Text>タスクを追加</Text>
        </Group>
      ) : (
        <AddSubTaskForms taskId={taskId} setOpen={setOpen} />
      )}
    </div>
  );
};

export default AddSubTask;
