import { Badge, HoverCard, Modal, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

type props = { control: any };
const DateSelect = React.forwardRef(({ control }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  // useEffect(() => {
  //   // const newDate: any = dateData?.setHours(dateData?.getHours() + 12);
  //   // const dt = new Date(newDate);
  //   // dt && newDate
  //   //   ? setAddDate({ date: dt.toJSON().split("T")[0] })
  //   //   : setAddDate({ date: date });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dateData]);
  return (
    <div>
      <Controller
        name="date"
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
        )}
      />
    </div>
  );
});

export default DateSelect;
