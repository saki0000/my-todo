import { useMantineTheme } from "@mantine/core";
import { Calendar } from "@mantine/dates";

const DefaultCalendar = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (arg: any) => void;
}) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Calendar
        value={value}
        onChange={(value) => {
          const newDate: any = value?.setHours(value?.getHours() + 12);
          const dt = new Date(newDate);
          const newdt = dt.toJSON().split("T")[0];
          onChange(newdt);
        }}
        className="mx-auto"
        dayStyle={(date, modifiers) =>
          modifiers.selected
            ? { backgroundColor: theme.colors.dullblue[5] }
            : {}
        }
      />
    </div>
  );
};

export default DefaultCalendar;
