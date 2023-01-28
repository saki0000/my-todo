import { Badge, Checkbox, Group, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { separateAtom } from "../../atoms/openAtom";
import { stateAtom } from "../../atoms/stateAtom";
import { deleteSubTask } from "../../features/delete/api/DeleteApi";
import useFetchSubTask from "../../features/fetch/hooks/useFetchSubTask";
import EditButton from "../../features/update/components/EditButton";
import UpdateTask from "../../features/update/components/UpdateTask";
import { task } from "../../Types";

type props = {
  task: task & { id: number };
  index: number;
};
const SubTask = ({ task, index }: props) => {
  const modalValue = useRecoilValue(separateAtom);
  const [open, setOpen] = useState(false);
  const state = useRecoilValue(stateAtom);
  const { data, mutate } = useFetchSubTask(modalValue.id);
  return (
    <>
      {task && !task.statement && (
        <>
          {open ? (
            <UpdateTask
              task={task}
              setOpen={setOpen}
              type={"sub"}
              index={index}
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
                          newData.splice(index, 1);
                          deleteSubTask(modalValue.id, task.id);
                          mutate(newData, false);
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
                      </Group>
                    )}
                  </Group>

                  {!task.weight && !task.due_date ? (
                    <></>
                  ) : (
                    <div className="ml-16 mt-2 flex space-x-2">
                      {task.weight && (
                        <Badge color="brown">{task?.weight}</Badge>
                      )}
                      {task.due_date && (
                        <Badge color="brown">{task?.due_date}</Badge>
                      )}
                    </div>
                  )}

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
