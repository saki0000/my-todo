import { ActionIcon, Group, Text } from "@mantine/core";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { boxType, DateFormat } from "../../../Types";
import AddForms from "./AddForms";

type Props = { box: boxType; date?: DateFormat | string; mutate?: any };
const AddTask = ({ box, date, mutate }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="h-full">
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
        <AddForms box={box} date={date} setOpen={setOpen} mutate={mutate} />
      )}
    </div>
  );
};

export default AddTask;
