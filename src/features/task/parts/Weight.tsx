import { Badge, HoverCard, Menu, NativeSelect, Text } from "@mantine/core";
import React from "react";
import { task } from "../../../Types";

type props = { weight?: string | number; setAddWeight: (arg: task) => void };
const Weight = React.memo(({ weight, setAddWeight }: props) => {
  return (
    <div>
      <HoverCard width={160} position="bottom" shadow="md">
        <HoverCard.Target>
          <Menu>
            <Menu.Target>
              <Badge color="brown">{weight || "priority"}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <NativeSelect
                value={weight}
                onChange={(e) => {
                  setAddWeight({ weight: e.currentTarget.value });
                }}
                data={["高", "中", "低"]}
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
