import { Divider, Stack, Text } from "@mantine/core";
import React from "react";
import Task from "./Task";

const Inbox = ({ first }: any) => {
  return (
    <>
      {first ? (
        <div>
          <Stack>
            <Text>Inbox</Text>
            <Divider />
            <Task />
          </Stack>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Inbox;
