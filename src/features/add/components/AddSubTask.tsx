import { ActionIcon, Group, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { task } from "../../../Types";
import AddSubTaskForms from "./AddSubTaskForms";

type props = { task: task };
const AddSubTask = ({ task }: props) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className=" my-4">
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
        <AddSubTaskForms taskValue={task} setOpen={setOpen} />
      )}
    </div>
  );
};

export default AddSubTask;
