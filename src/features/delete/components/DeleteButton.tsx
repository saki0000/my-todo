import { ActionIcon } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <ActionIcon onClick={onClick}>
        <AiOutlineDelete></AiOutlineDelete>
      </ActionIcon>
    </>
  );
};

export default DeleteButton;
