import { Popover, Text, Badge, Menu } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

const DueDate = (dueDate: any) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [date, setDate] = useState<any>(dueDate.dueDate);
  return (
    <div>
      <Popover
        width={160}
        position="top"
        // withArrow
        shadow="md"
        opened={opened}
      >
        <Popover.Target>
          <Menu>
            <Menu.Target>
              <Badge onMouseEnter={open} onMouseLeave={close}>
                {date}
              </Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>期日</Menu.Label>
              <Menu.Divider />
              <Menu.Label>
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e?.toJSON().split("T")[0])}
                />
              </Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </Popover.Target>

        <Popover.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">期日を設定</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default DueDate;
