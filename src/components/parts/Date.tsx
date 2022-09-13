import { Text, Badge, Menu, HoverCard } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React from "react";
import { useEffect, useState } from "react";
import { DateFormat, task } from "../../Types";

type props = { date: DateFormat | string; setAddDate: (arg: task) => void };
const Date = React.memo(({ date, setAddDate }: props) => {
  const [dateData, setDate] = useState<Date | null>(null);
  useEffect(() => {
    setAddDate({ date: dateData?.toJSON().split("T")[0] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateData]);
  return (
    <div>
      <HoverCard
        width={160}
        position="top"
        // withArrow
        shadow="md"
        zIndex={1}
      >
        <HoverCard.Target>
          <Menu position="bottom">
            <Menu.Target>
              <Badge>{date}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>
                <Calendar value={dateData} onChange={setDate} />
              </Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">予定日を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
});

export default Date;
