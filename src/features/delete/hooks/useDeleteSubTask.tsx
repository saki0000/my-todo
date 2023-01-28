import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { deleteSubTask } from "../api/DeleteApi";

const useDeleteSubTask = () => {
  const modalValue = useRecoilValue(separateAtom);

  const deleteTask = async (id: number) => {
    await deleteSubTask(modalValue.id, id);
  };
  return deleteTask;
};

export default useDeleteSubTask;
