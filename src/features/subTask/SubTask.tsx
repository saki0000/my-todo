import { ActionIcon, Badge, Checkbox, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEnter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { deleteSubTask, updateSubTask } from "../../api";
import { separateAtom } from "../../atoms/openAtom";
import { stateAtom } from "../../atoms/stateAtom";
import { task } from "../../Types";
import UpdateTask from "../task/update/UpdateTask";

type props = {
  task: task & { id: number };
  mutate: any;
  id: number;
};
const SubTask = React.memo(({ task, mutate, id }: props) => {
  const modalValue = useRecoilValue(separateAtom);

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean | undefined>(false);
  const state = useRecoilValue(stateAtom);
  useEffect(() => {
    checked &&
      mutate(
        updateSubTask(id, task.id, {
          name: task.name,
          box: task.box,
          date: task.date,
          due_date: task.due_date,
          weight: task.weight,
          statement: true,
          memo: task.memo,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  console.log(id);
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
                        checked={checked}
                        onChange={(e) => {
                          setChecked(e.currentTarget.checked);
                        }}
                      />
                      <Text>{task?.name}</Text>
                    </Group>
                    {state.first === task.box && (
                      <Group>
                        <ActionIcon
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          <AiOutlineEdit></AiOutlineEdit>
                        </ActionIcon>
                        <ActionIcon
                          onClick={() => {
                            mutate(deleteSubTask(modalValue.id, task.id));
                          }}
                        >
                          <AiOutlineDelete></AiOutlineDelete>
                        </ActionIcon>
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
});

export default SubTask;
