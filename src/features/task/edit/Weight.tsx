import { Badge, HoverCard, Menu, Select, Text } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";

type props = { weight?: string | number; control: any };
const Weight = React.forwardRef(({ weight, control }: props) => {
  return (
    <div>
      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <HoverCard width={160} position="bottom" shadow="md">
            <HoverCard.Target>
              <Menu>
                <Menu.Target>
                  <Badge color="brown">{field.value || "priority"}</Badge>
                </Menu.Target>
                <Menu.Dropdown>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                    data={["高", "中", "低"]}
                  />
                </Menu.Dropdown>
              </Menu>
            </HoverCard.Target>

            <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
              <Text size="sm">タスクの優先度を設定</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      />
    </div>
  );
});

export default Weight;
