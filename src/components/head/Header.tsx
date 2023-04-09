import { Button, Group } from "@mantine/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Head = React.memo(() => {
  const dispatch = useDispatch();
  // const user: User = useSelector(selectUser);
  return (
    <div className="flex h-full ">
      <Group align="center" position="apart" className="mx-8 w-full self-end">
        <Group>
          <p className="font-bold text-3xl m-0 text-white">ASAP TASK</p>
          {/* <Text>{user.displayName}</Text> */}
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
    </div>
  );
});

export default Head;
