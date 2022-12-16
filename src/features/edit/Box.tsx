import { Badge, HoverCard, Menu, Select, Text } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";
import { boxType } from "../../Types";

// eslint-disable-next-line no-empty-pattern
type box = { taskBox?: boxType; control?: any };

const Box = React.forwardRef(({ taskBox, control }: box) => {
  return (
    <div>
      <Controller
        name="box"
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
                    data={[
                      { value: "inbox", label: "Inbox" },
                      { value: "nextAction", label: "Next Action List" },
                      { value: "calender", label: "Calendar" },
                      { value: "someday", label: "Someday" },
                    ]}
                    ref={field.ref}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </Menu.Dropdown>
              </Menu>
            </HoverCard.Target>

            <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
              <Text size="sm">ボックスを設定</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      />
    </div>
  );
});

export default Box;
