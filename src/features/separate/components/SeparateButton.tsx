import { ActionIcon } from "@mantine/core";
import { AiOutlinePartition } from "react-icons/ai";

const SeparateButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <>
      <ActionIcon onClick={onClick}>
        <AiOutlinePartition></AiOutlinePartition>
      </ActionIcon>
    </>
  );
};

export default SeparateButton;
