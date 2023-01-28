import { Button, Menu, Modal } from "@mantine/core";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import DefaultCalendar from "../../calendar/components/Calendar";
import useFetchDateTask from "../../calendar/hooks/fetchDateTask";
import useDeleteCache from "../../delete/hooks/useDeleteCache";
import { useFetchTasks } from "../../fetch/hooks/useFetchTask";
import useDistribute from "../hooks/useUpdate";

const DistributeButton = ({ task, index }: { task: any; index: number }) => {
  const setModal = useSetRecoilState(separateAtom);
  const deleteData = useDeleteCache();
  const distribute = useDistribute();
  const { data, mutate } = useFetchTasks("inbox");
  const { data: nextData, mutate: nextMutate } = useFetchTasks("nextAction");
  const { data: someData, mutate: someMutate } = useFetchTasks("someday");
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDate] = useState<any>(null);
  const value = new Date(day);
  const { data: calendarData, mutate: calendarMutate } = useFetchDateTask(
    day || ""
  );

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
                distribute(task, "calendar", calendarData, calendarMutate, day);
                setOpen(false);
                setModal({ open: true, id: task.id });
                deleteData(data, mutate, index);
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
              distribute(task, "nextAction", nextData, nextMutate);
              setModal({ open: true, id: task.id });
              deleteData(data, mutate, index);
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
              distribute(task, "someday", someData, someMutate);
              setModal({ open: true, id: task.id });
              deleteData(data, mutate, index);
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
