import { Text, Badge, Menu, HoverCard } from "@mantine/core";
import { useState } from "react";

const Weight = ({ weight, setAddWeight }: any) => {
  const [taskWeight, setTaskWeight] = useState<number>(weight);
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
};

export default Weight;
