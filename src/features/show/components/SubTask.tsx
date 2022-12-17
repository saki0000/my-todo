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

type props = {
  task: task & { id: number };
  mutate: any;
  id: number;
};
const SubTask = ({ task, mutate, id }: props) => {
  const modalValue = useRecoilValue(separateAtom);
  const [open, setOpen] = useState(false);
  const state = useRecoilValue(stateAtom);

  console.log();
  return (
    <>
      {task && !task.statement && (
        <>
          {open ? (
            <UpdateTask
              task={task}
              setOpen={setOpen}
              mutate={mutate}
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
                          mutate(deleteSubTask(modalValue.id, task.id));
                        }}
                      />
                      <Text>{task?.name}</Text>
                    </Group>
                    {state.first === task.box && (
                      <Group>
                        <EditButton
                          onClick={() => {
                            setOpen(true);
                          }}
                        />
                        <DeleteButton
                          onClick={() => {
                            mutate(deleteSubTask(modalValue.id, task.id));
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
