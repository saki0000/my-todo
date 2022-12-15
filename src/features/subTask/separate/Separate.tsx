import { Divider, Modal, Stack } from "@mantine/core";
import React from "react";
import { useRecoilState } from "recoil";
import { getTask } from "../../../api";
import { separateAtom } from "../../../atoms/openAtom";
import { task } from "../../../Types";
import AddSubTask from "../add/AddSubTask";
import SubTask from "../show/SubTask";

const Separate = React.memo(({ dataMutate }: { dataMutate?: any }) => {
  const [modal, setOpen] = useRecoilState(separateAtom);
  const { data, isLoading, error, mutate } = getTask(modal.id);

  if (isLoading) return <div></div>;
  if (error) return <div>error</div>;
  return (
    <>
      <Modal
        onClose={() => {
          setOpen({ ...modal, open: false });
          mutate();
        }}
        opened={modal.open}
        size="lg"
        overlayOpacity={0.2}
        overlayBlur={1}
      >
        <Stack>
          <p className="text-xl ml-4">{data.name}</p>

          <Divider />
          {data.subtasks.length === 0 ||
            data.subtasks.map((task: task & { id: number }) => (
              <SubTask id={modal.id} task={task} mutate={dataMutate} />
            ))}
          <AddSubTask task={data} mutate={mutate} />
        </Stack>
      </Modal>
    </>
  );
});

export default Separate;