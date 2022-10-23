import { Badge, HoverCard, Menu, Text } from "@mantine/core";
import React, { useState } from "react";
import { task } from "../../../Types";

type props = { weight?: number | string; setAddWeight: (arg: task) => void };
const Weight = React.memo(({ weight, setAddWeight }: props) => {
  const [taskWeight, setTaskWeight] = useState<number | string>(
    weight || "weight"
  );
  return (
    <div>
      <HoverCard width={160} position="bottom" shadow="md">
        <HoverCard.Target>
          <Menu>
            <Menu.Target>
              <Badge>{taskWeight}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>重さ</Menu.Item>
              <Menu.Divider />
              {[...Array(10)].map((_, i: number) => (
                <Menu.Item
                  onClick={() => {
                    setTaskWeight(i);
                    setAddWeight({ weight: i });
                  }}
                >
                  <Text>{i}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">タスクの重さを設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
});

export default Weight;
