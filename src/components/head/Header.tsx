import { Button, Group, Text } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/userSlice";
import { user } from "../../Types";

const Head = React.memo(() => {
  const dispatch = useDispatch();
  const user: user = useSelector(selectUser);
  return (
    <>
      <Group align="center" position="apart" className="bg-darkBlue mx-16">
        <Group>
          <p className="font-bold text-2xl text-white">GHD APP</p>
          <Text>{user.displayName}</Text>
        </Group>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          variant="light"
          radius="md"
          color="brown"
        >
          Logout
        </Button>
      </Group>
    </>
  );
});

export default Head;
