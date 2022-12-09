/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize, useSetState } from "@mantine/hooks";
import React from "react";
import CalendarTask from "./CalendarTask";
import useCalenderHook from "./hooks/CalenderHook";

const Calender = React.memo(() => {
  const { ref, height } = useElementSize();
  const today = new Date();
  const [dateTask] = useCalenderHook();
  const [calendar, setCalendar] = useSetState({
    first: "カレンダー",
    second: "今日",
  });

  return (
    <>
      <Stack style={{ height: "100%" }}>
        <Text size="lg">
          {calendar.first}
          <span
            onClick={() => {
              setCalendar({
                first: calendar.second,
                second: calendar.first,
              });
            }}
            style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
          >
            /{calendar.second}
          </span>
        </Text>
        <Divider className="border-brown" />
        <div style={{ height: "100%" }} ref={ref}>
          <ScrollArea.Autosize maxHeight={height}>
            {calendar.first === "カレンダー" ? (
              <>
                {dateTask.map((date: string) => (
                  <div key={date}>
                    <Text style={{ marginBottom: 10 }}>{date}</Text>
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
          </ScrollArea.Autosize>
        </div>
      </Stack>
    </>
  );
});

export default Calender;
