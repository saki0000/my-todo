import { Modal } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";

const CalendarModal = ({
  value,
  onChange,
  children,
}: {
  value: any;
  onChange: () => void;
  children?: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        size="xs"
      >
        <div>
          <Calendar value={value} onChange={onChange} className="mx-auto" />
        </div>
      </Modal>
      <div onClick={() => setOpen(true)}>{children && children}</div>
    </div>
  );
};

export default CalendarModal;
