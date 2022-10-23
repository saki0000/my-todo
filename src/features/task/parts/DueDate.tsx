import { Badge, HoverCard, Modal, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { DateFormat, task } from "../../../Types";
type props = {
  dueDate?: DateFormat | string;
  setAddDate: (arg: task) => void;
};
// eslint-disable-next-line no-empty-pattern
const DueDate = React.memo(({ dueDate, setAddDate }: props) => {
  const [value, setValue] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const newDate: any = value?.setHours(value?.getHours() + 12);
    const dt = new Date(newDate);
    dt && newDate && setAddDate({ due_date: dt.toJSON().split("T")[0] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div>
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        size="xs"
      >
        <div>
          <Calendar value={value} onChange={setValue} className="mx-auto" />
        </div>
      </Modal>
      <HoverCard
        width={160}
        position="top"
        // withArrow
        shadow="md"
        zIndex={1}
      >
        <HoverCard.Target>
          <Badge color="indigo" onClick={() => setOpen(true)}>
            {dueDate || "期日"}
          </Badge>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">期日を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
});

export default DueDate;
