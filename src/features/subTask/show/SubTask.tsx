import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEnter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { deleteSubTask, updateSubTask } from "../../../api";
import { separateAtom } from "../../../atoms/openAtom";
import { stateAtom } from "../../../atoms/stateAtom";
import { task } from "../../../Types";
import UpdateTask from "../../task/update/UpdateTask";

type props = {
  task: task & { id: number };
  mutate: any;
  id: number;
};
const SubTask = React.memo(({ task, mutate, id }: props) => {
  const modalValue = useRecoilValue(separateAtom);
  const [tasks, setTasks] = useSetState(task);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean | undefined>(false);
  const state = useRecoilValue(stateAtom);
  useEffect(() => {
    checked &&
      mutate(
        updateSubTask(id, tasks.id, {
          name: tasks.name,
          box: tasks.box,
          date: tasks.date,
          due_date: tasks.due_date,
          weight: tasks.weight,
          statement: true,
          memo: tasks.memo,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  return (
    <>
      {task && !task.statement && (
        <>
          {open ? (
            <UpdateTask
              task={tasks}
              setOpen={setOpen}
              setTasks={setTasks}
              mutate={mutate}
              sub={true}
              id={id}
            />
          ) : (
            <>
              {
                <Stack spacing={0} key={task.id}>
                  <Group
                    position="apart"
                    style={{
                      marginTop: 0,
                      marginBottom: 8,
                      marginRight: 30,
                      marginLeft: 40,
                    }}
                    key={tasks.id}
                  >
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
                      <Text>{tasks?.name}</Text>
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

                  <>
                    <Group style={{ marginLeft: 100 }}>
                      {tasks.weight !== 0 && (
                        <Badge color="indigo">{tasks?.weight}</Badge>
                      )}
                      {tasks.due_date && tasks.due_date !== "期日" && (
                        <Badge color="indigo">{tasks?.due_date}</Badge>
                      )}
                    </Group>
                  </>

                  {tasks.memo && (
                    <Text color="gray" style={{ marginLeft: 70 }}>
                      {tasks.memo}
                    </Text>
                  )}
                </Stack>
              }
            </>
          )}
        </>
      )}
    </>
  );
});

export default SubTask;