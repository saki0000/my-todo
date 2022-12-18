import { Divider, Modal, Stack } from "@mantine/core";
import { useRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import AddSubTask from "../../add/components/AddSubTask";
import SubTasks from "../../task/components/SubTasks";
import useFetchTask from "../hooks/fetchTask";

const Separate = () => {
  const [modal, setOpen] = useRecoilState(separateAtom);
  const { data, isLoading, error, mutate } = useFetchTask();
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
        <Stack className="mx-8">
          <p className="text-xl ml-4">{data.name}</p>

          <Divider />
          <SubTasks taskId={modal.id} />
          <AddSubTask task={data} mutate={mutate} />
        </Stack>
      </Modal>
    </>
  );
};

export default Separate;
