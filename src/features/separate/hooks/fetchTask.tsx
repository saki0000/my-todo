import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { fetcher, URL } from "../../../api";
import { separateAtom } from "../../../atoms/openAtom";

const useFetchTask = () => {
  const modal = useRecoilValue(separateAtom);
  const { data, error, mutate } = useSWR(
    modal.id !== 0 && `${URL}/tasks/${modal.id}`,
    fetcher
  );
  return { data, isLoading: !error && !data, error, mutate };
};

export default useFetchTask;
