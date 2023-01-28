/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import BoxInfoIcon from "../../box/BoxInfoIcon";
import useGetDateOfYear from "../hooks/CalenderHook";
import CalendarTask from "./CalendarTaskList";

const Calender = ({ onClick }: { onClick?: () => void }) => {
  const today = new Date();
  const [dateTask] = useGetDateOfYear(today);
  const [calendar, setCalendar] = useSetState({
    first: "カレンダー",
    second: "今日",
  });
  console.log("calendar box rendering");

  return (
    <>
      <Paper
        p="xl"
        shadow="lg"
        radius="md"
        onClick={onClick}
        className="h-full"
      >
        <Stack className="h-full mx-2" key="calendar">
          <Group>
            <p className="text-xl  my-2">
              {calendar.first}
              <span
                onClick={() => {
                  setCalendar({
                    first: calendar.second,
                    second: calendar.first,
                  });
                }}
                className="text-gray-400 cursor text-lg cursor-pointer"
              >
                /{calendar.second}
              </span>
            </p>
            <BoxInfoIcon box="calendar" />
          </Group>

          <Divider className="border-brown" />
          <div className="h-full overflow-auto">
            {calendar.first === "カレンダー" ? (
              <>
                {dateTask.map((date: string) => (
                  <div key={date}>
                    <Text className="mb-2">{date}</Text>
                    <Divider className="border-brown" />
                    <CalendarTask date={date} />
                  </div>
                ))}
                <Divider className="border-brown" />
              </>
            ) : (
              <>
                <CalendarTask date={today.toJSON().split("T")[0]} />

                <Divider className="border-brown" />
              </>
            )}
          </div>
        </Stack>
      </Paper>
    </>
  );
};

export default Calender;
