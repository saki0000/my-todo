import { Button, Menu } from "@mantine/core";
import { useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { useFetchTasks } from "../../task/hooks/useFetchTask";
import { updateTaskAPI } from "../api/UpdateApi";

const DistributeButton = ({ task, index }: { task: any; index: number }) => {
  const setModal = useSetRecoilState(separateAtom);
  const { data, mutate } = useFetchTasks("inbox");
  const { data: nextData, mutate: nextMutate } = useFetchTasks("nextAction");
  const { data: someData, mutate: someMutate } = useFetchTasks("someday");
  return (
    <Menu>
      <Menu.Target>
        <Button color="brown" size="xs" variant="light" radius="lg">
          振り分け
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            const newTask = { ...task, box: "nextAction" };
            updateTaskAPI(task.id, newTask);
            const newData = [...data];
            newData.splice(index, 1);
            mutate(newData, false);
            nextMutate([...nextData, newTask], false);
            setModal({ open: true, id: task.id });
          }}
        >
          Next Action Listへ
        </Menu.Item>
        <Menu.Item>Calendarへ</Menu.Item>
        <Menu.Item
          onClick={() => {
            const newTask = { ...task, box: "someday" };
            updateTaskAPI(task.id, newTask);
            const newData = [...data];
            newData.splice(index, 1);
            mutate(newData, false);
            someMutate([...someData, newTask], false);
            setModal({ open: true, id: task.id });
          }}
        >
          Somedayへ
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default DistributeButton;
