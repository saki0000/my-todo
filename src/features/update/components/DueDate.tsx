import { Badge, HoverCard, Modal, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
type props = {
  control: any;
};
// eslint-disable-next-line no-empty-pattern
const DueDate = React.forwardRef(({ control }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Controller
        name="due_date"
        control={control}
        render={({ field }) => (
          <>
            <Modal
              opened={open}
              onClose={() => {
                setOpen(false);
              }}
              size="xs"
            >
              <div>
                <Calendar
                  value={field.value}
                  onChange={(value) => {
                    const newDate: any = value?.setHours(
                      value?.getHours() + 12
                    );
                    const dt = new Date(newDate);
                    const date = dt.toJSON().split("T")[0];
                    field.onChange(date);
                  }}
                  className="mx-auto"
                />
              </div>
            </Modal>
            <HoverCard width={110} position="top" shadow="md" zIndex={1}>
              <HoverCard.Target>
                <Badge color="brown" onClick={() => setOpen(true)}>
                  {field.value || "期日"}
                </Badge>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
                <Text size="sm">期日を設定</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </>
        )}
      />
    </div>
  );
});

export default DueDate;
