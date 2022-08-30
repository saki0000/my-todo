import { Text, Badge, Menu, HoverCard } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";

const DueDate = ({ dueDate, setAddDate }: any) => {
  const [date, setDate] = useState<any>(dueDate || "期日");
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
                <Calendar
                  value={date}
                  onChange={(e) => {
                    setDate(e?.toJSON().split("T")[0]);
                    setAddDate({ due_date: e?.toJSON().split("T")[0] });
                  }}
                />
              </Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">期日を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default DueDate;
