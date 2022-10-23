import { Badge, HoverCard, Modal, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { DateFormat, task } from "../../../Types";

type props = { date?: DateFormat | string; setAddDate: (arg: task) => void };
const DateSelect = React.memo(({ date, setAddDate }: props) => {
  const [dateData, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const newDate: any = dateData?.setHours(dateData?.getHours() + 12);
    const dt = new Date(newDate);
    dt && newDate
      ? setAddDate({ date: dt.toJSON().split("T")[0] })
      : setAddDate({ date: date });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateData]);
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
          <Calendar value={dateData} onChange={setDate} className="mx-auto" />
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
            {date || "日付"}
          </Badge>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">予定日を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
});

export default DateSelect;
