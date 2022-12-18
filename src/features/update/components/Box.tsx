import { Badge, HoverCard, Menu, Select, Text } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";

// eslint-disable-next-line no-empty-pattern
type box = { control?: any };

const Box = React.forwardRef(({ control }: box) => {
  return (
    <div>
      <Controller
        name="box"
        control={control}
        render={({ field }) => (
          <HoverCard width={133} position="top" shadow="md">
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
                    className="w-fit"
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
