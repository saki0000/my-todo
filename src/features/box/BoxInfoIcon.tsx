import { ActionIcon, HoverCard, Text } from "@mantine/core";
import { AiOutlineQuestionCircle } from "react-icons/ai";
type props = { box: "inbox" | "someday" | "nextAction" | "calendar" };

const BoxInfoIcon = ({ box }: props) => {
  const message = {
    inbox: "タスクや興味があることを書き出して振り分けましょう",
    nextAction: "具体的なタスクのリスト",
    someday: "いつかやるタスクのリスト",
    calendar: "日時が決まっているタスクのリスト",
  };
  return (
    <div>
      <HoverCard position="top" shadow="md">
        <HoverCard.Target>
          <ActionIcon>
            <AiOutlineQuestionCircle size={24} />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
          <Text size="sm">{message[box]}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default BoxInfoIcon;
