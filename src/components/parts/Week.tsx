import { Stack, Divider, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Week = ({ state }: any) => {
  return (
    <>
      {state.first === "week" ? (
        <div>
          <Stack>
            <Text>今週</Text>
            <Divider />
            <Task />
            <Task />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>今週</Text>
              <Divider />
              <Task />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Week;
