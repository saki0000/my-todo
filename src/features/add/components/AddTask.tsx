import { ActionIcon, Group, Text } from "@mantine/core";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BoxType, DateFormat } from "../../../types/Types";
import AddForms from "./AddForms";

type Props = { box: BoxType; date?: DateFormat | string };
const AddTask = ({ box, date }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="h-full pt-2">
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
        <AddForms box={box} date={date} setOpen={setOpen} />
      )}
    </div>
  );
};

export default AddTask;
