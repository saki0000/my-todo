import { ActionIcon, Avatar, Button, Group, Text } from "@mantine/core";
import React from "react";
import { AiOutlineBars } from "react-icons/ai";

const Head = ({ setOpened, opened }: any) => {
  return (
    <>
      <Group
        align="center"
        position="apart"
        style={{ marginRight: 30, marginLeft: 30, height: 70 }}
      >
        <Group>
          <ActionIcon
            onClick={() => {
              setOpened(!opened);
            }}
          >
            <AiOutlineBars></AiOutlineBars>
          </ActionIcon>
          <Avatar></Avatar>
          <Text>Name</Text>
        </Group>
        <Button>Logout</Button>
      </Group>
    </>
  );
};

export default Head;
