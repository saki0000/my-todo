import { ActionIcon, Group, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { task } from "../../Types";
import AddSubTaskForms from "./AddSubTaskForms";

type props = { task: task; mutate: any };
const AddSubTask = ({ task, mutate }: props) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className="mx-4 my-6">
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
        <AddSubTaskForms taskValue={task} setOpen={setOpen} mutate={mutate} />
      )}
    </div>
  );
};

export default AddSubTask;
