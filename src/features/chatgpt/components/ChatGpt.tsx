import { ActionIcon } from "@mantine/core";
import { SiOpenai } from "react-icons/si";
import useOpenAiApi from "../hooks/useOpenAiApi";

const ChatGpt = ({ text }: { text: string }) => {
  const { onSubmit } = useOpenAiApi();
  return (
    <div>
      <ActionIcon
        onClick={() => {
          onSubmit(text + "のタスクを細分化して");
        }}
      >
        <SiOpenai />
      </ActionIcon>
    </div>
  );
};

export default ChatGpt;
