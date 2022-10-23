import { Badge, HoverCard, Menu, NumberInput, Text } from "@mantine/core";
import React from "react";
import { task } from "../../../Types";

type props = { weight?: number; setAddWeight: (arg: task) => void };
const Weight = React.memo(({ weight, setAddWeight }: props) => {
  return (
    <div>
      <HoverCard width={160} position="bottom" shadow="md">
        <HoverCard.Target>
          <Menu>
            <Menu.Target>
              <Badge color="indigo">{weight || "priority"}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <NumberInput
                value={weight}
                onChange={(val) => setAddWeight({ weight: val })}
                max={10}
                min={0}
              />
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">タスクの優先度を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
});

export default Weight;
