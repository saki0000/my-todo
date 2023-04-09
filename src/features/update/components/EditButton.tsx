import { ActionIcon } from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";

const EditButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}) => {
  return (
    <>
      <ActionIcon onClick={onClick}>
        <AiOutlineEdit></AiOutlineEdit>
      </ActionIcon>
    </>
  );
};

export default EditButton;
