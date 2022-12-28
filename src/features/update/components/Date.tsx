import { Badge, HoverCard, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DefaultCalendar from "../../calendar/components/Calendar";

type props = { control: any };
const DateSelect = React.forwardRef(({ control }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Controller
        name="date"
        control={control}
        render={({ field }) => {
          const value = new Date(field.value);
          return (
            <>
              <Modal
                opened={open}
                onClose={() => {
                  setOpen(false);
                }}
                size="xs"
              >
                <div>
                  <DefaultCalendar value={value} onChange={field.onChange} />
                </div>
              </Modal>
              <HoverCard
                width={160}
                position="top"
                // withArrow
                shadow="md"
                zIndex={1}
              >
                <HoverCard.Target>
                  <Badge color="brown" onClick={() => setOpen(true)}>
                    {field.value || "日付"}
                  </Badge>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
                  <Text size="sm">予定日を設定</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </>
          );
        }}
      />
    </div>
  );
});

export default DateSelect;
