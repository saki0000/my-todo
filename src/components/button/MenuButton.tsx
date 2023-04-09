import { ActionIcon, Menu } from "@mantine/core";
import moment from "moment";
import "moment/locale/ja";
import { AiOutlineSetting } from "react-icons/ai";
import useUpdateGoal from "../../features/goal/hooks/useUpdateGoal";
import { TaskType } from "../../types/Types";

const MenuButton = ({ task, index }: { task: TaskType; index: number }) => {
  const dt = moment().format("YYYY-MM-DD");
  const mutation = useUpdateGoal(index);
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon onClick={(e) => e.stopPropagation()}>
          <AiOutlineSetting />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={(e) => {
            mutation.mutate({ ...task, goal: dt });
            e.stopPropagation();
          }}
        >
          <p className="m-0">目標に設定</p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuButton;
