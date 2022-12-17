import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../../atoms/openAtom";
import { stateAtom } from "../../../atoms/stateAtom";
import { task } from "../../../Types";
import { deleteSubTask } from "../../delete/api/DeleteApi";
import DeleteButton from "../../delete/components/DeleteButton";
import EditButton from "../../update/components/EditButton";
import UpdateTask from "../../update/components/UpdateTask";
import useFetchSubTask from "../hooks/useFetchSubTask";

type props = {
  task: task & { id: number };
  index: number;
};
const SubTask = ({ task, index }: props) => {
  const modalValue = useRecoilValue(separateAtom);
  const [open, setOpen] = useState(false);
  const state = useRecoilValue(stateAtom);
  const { data, mutate } = useFetchSubTask(modalValue.id);

  console.log();
  return (
    <>
      {task && !task.statement && (
        <>
          {open ? (
            <UpdateTask
              task={task}
              setOpen={setOpen}
              sub={true}
              id={modalValue.id}
            />
          ) : (
            <>
              {
                <div key={task.id}>
                  <Group position="apart" key={task.id}>
                    <Group>
                      <AiOutlineEnter
                        style={{ transform: "scale(-1,1)" }}
                      ></AiOutlineEnter>
                      <Checkbox
                        checked={false}
                        onChange={(e) => {
                          e.preventDefault();
                          const newData = [...data];
                          deleteSubTask(modalValue.id, task.id);
                          mutate(newData.splice(index, 1), false);
                          // mutate();
                        }}
                      />
                      <Text>{task?.name}</Text>
                    </Group>
                    {(state.first === task.box || task.box === "inbox") && (
                      <Group>
                        <EditButton
                          onClick={() => {
                            setOpen(true);
                          }}
                        />
                        <DeleteButton
                          onClick={() => {
                            const newData = [...data];
                            deleteSubTask(modalValue.id, task.id);
                            mutate(newData.splice(index, 1), false);
                          }}
                        />
                      </Group>
                    )}
                  </Group>

                  <Group className="ml-16 mt-2">
                    {task.weight && <Badge color="brown">{task?.weight}</Badge>}
                    {task.due_date && task.due_date !== "期日" && (
                      <Badge color="brown">{task?.due_date}</Badge>
                    )}
                  </Group>

                  {task.memo && (
                    <Text color="gray" className="ml-16 mt-1">
                      {task.memo}
                    </Text>
                  )}
                </div>
              }
            </>
          )}
        </>
      )}
    </>
  );
};

export default SubTask;
