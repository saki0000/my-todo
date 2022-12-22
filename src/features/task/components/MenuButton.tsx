import { ActionIcon, Menu } from "@mantine/core";
import { AiOutlineSetting } from "react-icons/ai";

const MenuButton = () => {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <AiOutlineSetting />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <p className="m-0">目標に設定</p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuButton;
