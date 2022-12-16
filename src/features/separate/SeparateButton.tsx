import { ActionIcon } from "@mantine/core";
import { AiOutlinePartition } from "react-icons/ai";

const SeparateButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <ActionIcon onClick={onClick}>
        <AiOutlinePartition></AiOutlinePartition>
      </ActionIcon>
    </>
  );
};

export default SeparateButton;
