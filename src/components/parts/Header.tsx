import { ActionIcon, Avatar, Button, Group, Text } from "@mantine/core";
import React from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";

const Head = ({ setOpened, opened }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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

          <Text>{user.displayName}</Text>
        </Group>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Group>
    </>
  );
};

export default Head;
