import { Button, Menu, Modal } from "@mantine/core";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import DefaultCalendar from "../../calendar/components/Calendar";
import useFetchDateTask from "../../calendar/hooks/fetchDateTask";
import { useFetchTasks } from "../../task/hooks/useFetchTask";
import { updateTaskAPI } from "../api/UpdateApi";

const DistributeButton = ({ task, index }: { task: any; index: number }) => {
  const setModal = useSetRecoilState(separateAtom);
  const { data, mutate } = useFetchTasks("inbox");
  const { data: nextData, mutate: nextMutate } = useFetchTasks("nextAction");
  const { data: someData, mutate: someMutate } = useFetchTasks("someday");
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDate] = useState<any>(null);
  const value = new Date(day);
  const { data: calendarData, mutate: calendarMutate } = useFetchDateTask(
    day || ""
  );
  console.log(calendarData);

  return (
    <>
      <div>
        <Modal
          opened={open}
          onClose={() => {
            setOpen(false);
          }}
          size="xs"
        >
          <div>
            <DefaultCalendar value={value} onChange={setDate} />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              color="brown"
              onClick={() => {
                const newTask = { ...task, box: "calender", date: day };
                updateTaskAPI(task.id, newTask);
                const newData = [...data];
                newData.splice(index, 1);
                mutate(newData, false);
                calendarMutate([...calendarData, newTask], false);
                setModal({ open: true, id: task.id });
                setOpen(false);
                setModal({ open: true, id: task.id });
              }}
            >
              決定
            </Button>
          </div>
        </Modal>
      </div>
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
          <Menu.Item
            onClick={() => {
              setOpen(true);
            }}
          >
            Calendarへ
          </Menu.Item>
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
    </>
  );
};

export default DistributeButton;
