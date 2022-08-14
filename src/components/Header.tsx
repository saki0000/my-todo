import { Avatar, Button, Group, Text } from "@mantine/core";
import React from "react";

const Head = () => {
  return (
    <>
      <Group
        align="center"
        position="apart"
        style={{ marginRight: 30, marginLeft: 30, height: 70 }}
      >
        <Group>
          <Avatar></Avatar>
          <Text>Name</Text>
        </Group>
        <Button>Logout</Button>
      </Group>
    </>
  );
};

export default Head;
