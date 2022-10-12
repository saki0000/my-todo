import { Button, Group, Text } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { user } from "../../Types";

const Head = React.memo(() => {
  const dispatch = useDispatch();
  const user: user = useSelector(selectUser);
  return (
    <>
      <Group
        align="center"
        position="apart"
        style={{ marginRight: 30, marginLeft: 30, height: 70 }}
      >
        <Group>
          <p className="font-bold text-xl text-indigo-500">GHD APP</p>
          <Text>{user.displayName}</Text>
        </Group>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          variant="light"
          color="indigo"
          radius="md"
        >
          Logout
        </Button>
      </Group>
    </>
  );
});

export default Head;
