import { Text, Badge, Menu, HoverCard } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useEffect, useState } from "react";
import { DateFormat, task } from "../../Types";
type props = {
  dueDate: DateFormat | string;
  // eslint-disable-next-line no-empty-pattern
  setAddDate: ({}: task) => void;
};
// eslint-disable-next-line no-empty-pattern
const DueDate = ({ dueDate, setAddDate }: props) => {
  const [value, setValue] = useState<Date | null>(null);
  useEffect(() => {
    setAddDate({ due_date: value?.toJSON().split("T")[0] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div>
      <HoverCard
        width={160}
        position="top"
        // withArrow
        shadow="md"
        zIndex={1}
      >
        <HoverCard.Target>
          <Menu position="bottom">
            <Menu.Target>
              <Badge>{dueDate}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>
                <Calendar value={value} onChange={setValue} />
              </Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">期日を設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default DueDate;
