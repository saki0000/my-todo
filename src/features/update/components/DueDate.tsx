import { Button, HoverCard, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineCalendar } from "react-icons/ai";
import DefaultCalendar from "../../calendar/components/Calendar";
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
              <HoverCard width={110} position="top" shadow="md" zIndex={1}>
                <HoverCard.Target>
                  <Button
                    leftIcon={<AiOutlineCalendar />}
                    variant="outline"
                    color="brown"
                    onClick={() => setOpen(true)}
                  >
                    {field.value || "期日"}
                  </Button>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
                  <Text size="sm">期日を設定</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </>
          );
        }}
      />
    </div>
  );
});

export default DueDate;
