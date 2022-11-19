import { Badge, HoverCard, Menu, Text } from "@mantine/core";
import { boxType, task } from "../../../Types";

// eslint-disable-next-line no-empty-pattern
type box = { taskBox?: boxType; setTaskBox: (arg: task) => void };

const Box = ({ taskBox, setTaskBox }: box) => {
  return (
    <div>
      <HoverCard
        width={160}
        position="top"
        // withArrow
        shadow="md"
        zIndex={1}
      >
        <HoverCard.Target>
          <Menu position="bottom">
            <Menu.Target>
              <Badge color="indigo">{taskBox || "inbox"}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setTaskBox({ box: "inbox" });
                }}
              >
                <Text>Inbox</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setTaskBox({ box: "nextAction" });
                }}
              >
                <Text>Next Action</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setTaskBox({ box: "calender" });
                }}
              >
                <Text>カレンダー</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setTaskBox({ box: "someday" });
                }}
              >
                <Text>Someday</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">Boxを設定</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default Box;
