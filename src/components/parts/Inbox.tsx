import { Divider, Stack, Text } from "@mantine/core";
import Task from "./Task";

const Inbox = ({ state }: any) => {
  return (
    <>
      {state.first === "inbox" ? (
        <div>
          <Stack>
            <Text>Inbox</Text>
            <Divider />
            <Task />
            <Task />
            <Task />
            <Task />
          </Stack>
        </div>
      ) : (
        <>
          <div>
            <Stack>
              <Text>Inbox</Text>
              <Divider />
              <Task />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Inbox;
