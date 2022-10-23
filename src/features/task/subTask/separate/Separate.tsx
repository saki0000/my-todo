import { Divider, Modal, ScrollArea, Stack } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React from "react";
import { useRecoilState } from "recoil";
import { getTask } from "../../../../api";
import { separateAtom } from "../../../../atoms/openAtom";
import { task } from "../../../../Types";
import AddSubTask from "../add/AddSubTask";
import SubTask from "../show/SubTask";

const Separate = React.memo(({ dataMutate }: { dataMutate?: any }) => {
  const { ref, height } = useElementSize();
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
      >
        <Stack>
          <p className="text-xl ml-4">{data.name}</p>

          <Divider />
          <div style={{ height: "100%" }} ref={ref}>
            <ScrollArea.Autosize maxHeight={height}></ScrollArea.Autosize>
          </div>
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
