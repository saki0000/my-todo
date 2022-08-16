import { Divider, Stack, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Today = ({ state }: any) => {
  return (
    <>
      {state.first === "today" ? (
        <div>
          <Stack>
            <Text>今日</Text>
            <Divider />
            <Task />
            <Task />
            <Task />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>今日</Text>
              <Divider />
              <Task />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Today;
