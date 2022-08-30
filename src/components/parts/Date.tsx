import { Text, Badge, Menu, HoverCard } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";

const Date = ({ date, setAddDate }: any) => {
  const [dateData, setDate] = useState<any>(date || "予定日");
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
              <Badge>{dateData}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>
                <Calendar
                  value={dateData}
                  onChange={(e) => {
                    setDate(e?.toJSON().split("T")[0]);
                    setAddDate({ date: e?.toJSON().split("T")[0] });
                  }}
                />
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
};

export default Date;
