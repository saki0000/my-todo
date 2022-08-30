import { HoverCard, Menu, Badge, Text } from "@mantine/core";
import React, { useState } from "react";

const Box = ({ taskBox, setTaskBox }: any) => {
  const [box, setBox] = useState<any>(taskBox);
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
              <Badge>{box}</Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setBox("inbox");
                  setTaskBox({ box: "inbox" });
                }}
              >
                <Text>Inbox</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setBox("nextAction");
                  setTaskBox({ box: "nextAction" });
                }}
              >
                <Text>Next Action</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setBox("calender");
                  setTaskBox({ box: "calender" });
                }}
              >
                <Text>カレンダー</Text>
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
