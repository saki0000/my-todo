import { ActionIcon, Menu } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineSetting } from "react-icons/ai";
import { updateTaskAPI } from "../../features/update/api/UpdateApi";
import { TaskType } from "../../types/Types";

const MenuButton = ({ task }: { task: TaskType }) => {
  const date = new Date();
  const dt = date.toJSON().split("T")[0];
  const mutation = useMutation((newTask: TaskType) =>
    updateTaskAPI(task.id, newTask)
  );
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <AiOutlineSetting />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => mutation.mutate({ ...task, goal: dt })}>
          <p className="m-0">目標に設定</p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuButton;
