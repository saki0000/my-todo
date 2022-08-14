import { Avatar, Button, Group, Text } from "@mantine/core";
import React from "react";

const Header = () => {
  return (
    <div>
      <Group
        align="center"
        position="apart"
        style={{ height: 60, marginRight: 30, marginLeft: 30 }}
      >
        <Group>
          <Avatar></Avatar>
          <Text>Name</Text>
        </Group>
        <Button>Logout</Button>
      </Group>
    </div>
  );
};

export default Header;
