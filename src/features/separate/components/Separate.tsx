import { Divider, Modal, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import SubTasks from "../../../components/layout/tasks/SubTasks";
import AddSubTask from "../../add/components/AddSubTask";
import { fetchTask } from "../../fetch/api/fetchApi";

const Separate = () => {
  const [modal, setOpen] = useRecoilState(separateAtom);
  const { data, isLoading } = useQuery(
    ["separate", modal.id],
    () => fetchTask(modal.id),
    {
      enabled: modal.id !== 0,
    }
  );
  if (isLoading) return <div></div>;
  // if (error) return <div>error</div>;
  console.log(data);
  return (
    <>
      <Modal
        onClose={() => {
          setOpen({ ...modal, open: false });
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
          <AddSubTask task={data} />
        </Stack>
      </Modal>
    </>
  );
};

export default Separate;
