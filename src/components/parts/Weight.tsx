import { Popover, Text, Badge, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const Weight = (weight: any) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <div>
      <Popover
        width={160}
        position="bottom"
        // withArrow
        shadow="md"
        opened={opened}
      >
        <Popover.Target>
          <Menu>
            <Menu.Target>
              <Badge onMouseEnter={open} onMouseLeave={close}>
                {weight.weight}
              </Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>重さ</Menu.Item>
              <Menu.Divider />
              {[...Array(10)].map((_, i: number) => (
                <Menu.Item>
                  <Text>{i}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Popover.Target>

        <Popover.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">タスクの重さを設定</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default Weight;
