import { ActionIcon, Button, Menu, Modal } from "@mantine/core";
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import DefaultCalendar from "../../calendar/components/Calendar";
import useDistribute from "../hooks/useUpdate";

const DistributeButton = ({
  task,
  index,
  size,
}: {
  task: any;
  index: number;
  size?: number;
}) => {
  const setModal = useSetRecoilState(separateAtom);
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDate] = useState<any>(null);
  const value = new Date(day);
  const mutation = useDistribute(task, index);
  const navigate = useNavigate();

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
              onClick={(e) => {
                mutation.mutate({ ...task, date: day, box: "calender" });
                setOpen(false);
                setModal({ open: true, id: task.id });
                e.stopPropagation();
                navigate("/tasks");
              }}
            >
              決定
            </Button>
          </div>
        </Modal>
      </div>
      <Menu>
        <Menu.Target>
          <ActionIcon onClick={(e) => e.stopPropagation()}>
            <AiOutlineSetting size={size} />
          </ActionIcon>
          {/* <Button
            
            color="brown"
            size="xs"
            variant="light"
            radius="lg"
          >
            振り分け
          </Button> */}
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={(e) => {
              mutation.mutate({ ...task, box: "nextAction" });
              setModal({ open: true, id: task.id });
              e.stopPropagation();
              navigate("/tasks");
            }}
          >
            Next Action Listへ
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              setOpen(true);
              e.stopPropagation();
            }}
          >
            Calendarへ
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              mutation.mutate({ ...task, box: "someday" });
              setModal({ open: true, id: task.id });
              e.stopPropagation();
              navigate("/tasks");
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
