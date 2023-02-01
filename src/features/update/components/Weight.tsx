import { HoverCard, Select, Text } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";

type props = { control: any };
const Weight = React.forwardRef(({ control }: props) => {
  return (
    <div>
      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <HoverCard width={160} position="top" shadow="md">
            <HoverCard.Target>
              <Select
                value={field.value}
                onChange={field.onChange}
                ref={field.ref}
                data={["高", "中", "低"]}
                className="w-16"
              />
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
