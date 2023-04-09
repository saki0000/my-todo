/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import moment from "moment";
import "moment/locale/ja";
import BoxInfoIcon from "../../../components/button/BoxInfoIcon";
import useGetDateOfYear from "../hooks/CalenderHook";
import CalendarTask from "./CalendarTaskList";

const Calender = ({ onClick }: { onClick?: () => void }) => {
  const today = moment().format("YYYY-MM-DD");
  const [dateTask] = useGetDateOfYear();
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
        <Stack className="h-full m-2" key="calendar">
          <Group>
            <p className="text-2xl my-2 font-medium">
              {calendar.first}
              <span
                onClick={() => {
                  setCalendar({
                    first: calendar.second,
                    second: calendar.first,
                  });
                }}
                className="text-gray-400 cursor text-lg cursor-pointer font-normal"
              >
                /{calendar.second}
              </span>
            </p>
            <BoxInfoIcon box="calendar" />
          </Group>

          <Divider />
          <div className="h-full overflow-auto">
            {calendar.first === "カレンダー" ? (
              <>
                {dateTask.map((date: string) => (
                  <div key={date}>
                    <Text className="mb-2">{date}</Text>
                    <Divider />
                    <CalendarTask date={date} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <CalendarTask date={today} />
              </>
            )}
          </div>
        </Stack>
      </Paper>
    </>
  );
};

export default Calender;
